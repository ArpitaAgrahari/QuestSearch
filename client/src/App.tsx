import { useState, useCallback } from 'react';
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QuestionService } from "../../gen/question_pb";
import { SearchBar } from './components/search/searchBar/SearchBar';
import type { Question } from "../../gen/question_pb";
import { QuestionTypes } from './components/search/questionTypeFilter/QuestionTypeFilter';
import { QuestionList } from './components/search/searchResults/SearchResults';
import Header from './components/layout/header';
import './App.css';

const transport = createConnectTransport({
  baseUrl: "http://localhost:4000",
});

const client = createClient(QuestionService, transport);

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("ALL");
  const [hasSearched, setHasSearched] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setHasSearched(false);
      setNoResults(false);
      setQuestions([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await client.search({
        query: searchQuery,
        page: 1,
        limit: 10,
        type: selectedType,
      });
      setQuestions(response.questions);
      setHasSearched(true);
      setNoResults(response.questions.length === 0);
    } catch (error) {
      console.error('Search failed:', error);
      setQuestions([]);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedType]);

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
  
    if (hasSearched && searchQuery.trim()) {
      setLoading(true);
      try {
        const response = await client.search({
          query: searchQuery,
          page: 1,
          limit: 10,
          type: mappedType,
        });
        setQuestions(response.questions);
        setNoResults(response.questions.length === 0);
      } catch (error) {
        console.error('Search failed:', error);
        setQuestions([]);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    }
  }, [hasSearched, searchQuery]);

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
          <QuestionList 
            questions={questions}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}

export default App;