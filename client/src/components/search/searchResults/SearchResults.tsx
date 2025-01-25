import { Question } from "../../../../../gen/question_pb";

interface QuestionListProps {
  questions: Question[];
  loading: boolean;
}

export const QuestionList = ({ questions, loading }: QuestionListProps) => {
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const renderQuestionContent = (question: Question) => {
    switch (question.type) {
      case "ANAGRAM":
        return (
          <>
            <div className="text-sm text-gray-500 mt-1">
              Anagram Type: {question.anagramType}
            </div>
            {question.blocks && (
              <div className="mt-2">
                <div className="text-sm font-medium text-gray-700">Blocks:</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {question.blocks.map((block, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded">
                      {block.text}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {question.solution && (
              <div className="mt-2">
                <div className="text-sm font-medium text-gray-700">Solution:</div>
                <div className="text-gray-600">{question.solution}</div>
              </div>
            )}
          </>
        );
      
      case "MCQ":
        return (
          <div className="mt-2 space-y-2">
            {question.options?.map((option, index) => (
              <div 
                key={index} 
                className={`p-2 rounded ${
                  option.isCorrectAnswer 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-gray-50'
                }`}
              >
                {option.text}
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="mt-2 text-gray-600">
            {question.solution && (
              <div className="mt-1">
                <span className="font-medium">Solution:</span> {question.solution}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">{question.title}</h3>
            <span className={`px-2 py-1 text-sm rounded-full ${
              question.type === "ANAGRAM" ? 'bg-purple-100 text-purple-800' :
              question.type === "MCQ" ? 'bg-blue-100 text-blue-800' :
              question.type === "READ_ALONG" ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {question.type}
            </span>
          </div>
          {renderQuestionContent(question)}
        </div>
      ))}
    </div>
  );
};