import { motion, AnimatePresence } from "framer-motion";
import { Question, Block } from "../../../../../gen/question_pb";
import { Skeleton } from "../../layout/skeleton";
import './SearchResults.css';

interface QuestionListProps {
  questions: Question[];
  loading: boolean;
}

export const QuestionList = ({ questions, loading }: QuestionListProps) => {
  if (loading) {
    return <Skeleton />;
  }


  const renderQuestionContent = (question: Question) => {
    switch (question.type) {
      case "ANAGRAM":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-sm text-gray-500 mt-1">
              Anagram Type: {question.anagramType}
            </div>
            {question.blocks && question.blocks.length > 0 && (
              <div className="mt-2">
                <div className="text-sm font-medium text-gray-700">Blocks:</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {question.blocks.map((block: Block, index: number) => (
                    <motion.span 
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`px-2 py-1 rounded ${
                        block.isAnswer 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {block.text}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
            {question.solution && (
              <motion.div 
                className="mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-sm font-medium text-gray-700">Solution:</div>
                <div className="text-gray-600">{question.solution}</div>
              </motion.div>
            )}
          </motion.div>
        );
      
      case "MCQ":
        return (
          <motion.div 
            className="mt-2 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {question.options?.map((option, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`p-2 rounded ${
                  option.isCorrectAnswer 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-gray-50'
                }`}
              >
                {option.text}
              </motion.div>
            ))}
          </motion.div>
        );

      default:
        return (
          <motion.div 
            className="mt-2 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {question.solution && (
              <div className="mt-1">
                <span className="font-medium">Solution:</span> {question.solution}
              </div>
            )}
          </motion.div>
        );
    }
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence>
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">{question.title}</h3>
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className={`px-2 py-1 text-sm rounded-full ${
                  question.type === "ANAGRAM" ? 'bg-purple-100 text-purple-800' :
                  question.type === "MCQ" ? 'bg-blue-100 text-blue-800' :
                  question.type === "READ_ALONG" ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                {question.type}
              </motion.span>
            </div>
            {renderQuestionContent(question)}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};