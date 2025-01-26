import { useState, useCallback } from 'react';
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QuestionService } from "../../gen/question_pb";
import { SearchBar } from './components/search/searchBar/SearchBar';
import type { Question } from "../../gen/question_pb";
import { QuestionTypes } from './components/search/questionTypeFilter/QuestionTypeFilter';
import { QuestionList } from './components/search/searchResults/SearchResults';
import { Pagination } from './components/search/pagination/Pagination';
import Header from './components/layout/header';
import './App.css';

const transport = createConnectTransport({
  baseUrl: "http://localhost:4000",
});

const client = createClient(QuestionService, transport);

const ITEMS_PER_PAGE = 10;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("ALL");
  const [hasSearched, setHasSearched] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const performSearch = async (page: number, type: string = selectedType) => {
    setLoading(true);
    try {
      const response = await client.search({
        query: searchQuery,
        page: page,
        limit: ITEMS_PER_PAGE,
        type: type,
      });
      setQuestions(response.questions);
      setTotalCount(response.totalCount);
      setHasSearched(true);
      setNoResults(response.questions.length === 0);
    } catch (error) {
      console.error('Search failed:', error);
      setQuestions([]);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setHasSearched(false);
      setNoResults(false);
      setQuestions([]);
      setCurrentPage(1);
      return;
    }
    
    setCurrentPage(1);
    await performSearch(1);
  }, [searchQuery]);

  const handleTypeChange = useCallback(async (type: string) => {
    const typeMapping: { [key: string]: string } = {
      "All Types": "ALL",
      "Multiple Choice": "MCQ",
      "Anagram": "ANAGRAM",
      "Read Along": "READ_ALONG",
      "Content Only": "CONTENT_ONLY"
    };
  
    const mappedType = typeMapping[type];
    setSelectedType(mappedType);
    setCurrentPage(1);
  
    if (hasSearched && searchQuery.trim()) {
      await performSearch(1, mappedType);
    }
  }, [hasSearched, searchQuery]);

  const handlePageChange = useCallback(async (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await performSearch(page);
  }, [searchQuery]);

  return (
    <div className='min-h-screen'>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 mt-40">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        <QuestionTypes
          selectedType={selectedType}
          onTypeSelect={handleTypeChange}
        />

        {!hasSearched ? (
          <div className="text-center mt-8">
            <span className="text-xl text-gray-600">Search for questions to get started</span>
          </div>
        ) : noResults ? (
          <div className="text-center mt-8">
            <span className="text-xl text-gray-600">
              No results found for "{searchQuery}"
            </span>
            <p className="text-gray-500 mt-2">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <>
            <QuestionList 
              questions={questions}
              loading={loading}
            />
            <Pagination 
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;