import { useState } from 'react'
import './App.css'
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QuestionService } from "../../gen/question_pb";
import type { Question } from "../../gen/question_pb";
import { SearchBar } from './components/search/searchBar/SearchBar';
import { QuestionTypes } from './components/search/questionTypeFilter/QuestionTypeFilter';
import { QuestionList } from './components/search/searchResults/SearchResults';
import Header from './components/layout/header';

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (error) {
      console.error('Search failed:', error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = async (type: string) => {
    const typeMapping: { [key: string]: string } = {
      "All Types": "ALL",
      "Multiple Choice": "MCQ",
      "Anagram": "ANAGRAM",
      "Read Along": "READ_ALONG",
      "Content Only": "CONTENT_ONLY"
    };
  
    const mappedType = typeMapping[type];
    setSelectedType(mappedType); // This will now store the backend value
  
    if (hasSearched) {
      setLoading(true);
      try {
        const response = await client.search({
          query: searchQuery,
          page: 1,
          limit: 10,
          type: mappedType,
        });
        setQuestions(response.questions);
      } catch (error) {
        console.error('Search failed:', error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div>
        <Header />
      </div>
      <main className="max-w-4xl mx-auto px-4 py-8">
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
          <div className="text-center text-gray-500">
            Search for questions to get started
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