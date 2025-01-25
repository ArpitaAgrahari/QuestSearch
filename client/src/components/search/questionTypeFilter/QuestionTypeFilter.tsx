import { motion } from "framer-motion";

interface QuestionTypesProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

export const QuestionTypes = ({ selectedType, onTypeSelect }: QuestionTypesProps) => {
  const reverseTypeMapping: { [key: string]: string } = {
    'ALL': 'All Types',
    'MCQ': 'Multiple Choice',
    'ANAGRAM': 'Anagram',
    'READ_ALONG': 'Read Along',
    'CONTENT_ONLY': 'Content Only'
  };

  const questionTypes = ['All Types', 'Multiple Choice', 'Anagram', 'Read Along', 'Content Only'];

  return (
    <motion.div 
      className="flex gap-2 mb-8 flex-wrap justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {questionTypes.map((type, index) => (
        <motion.button
          key={type}
          onClick={() => onTypeSelect(type)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            reverseTypeMapping[selectedType] === type
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          {type}
        </motion.button>
      ))}
    </motion.div>
  );
};