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
    <div className="flex gap-2 mb-8">
      {questionTypes.map((type) => (
        <button
          key={type}
          onClick={() => onTypeSelect(type)}
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            reverseTypeMapping[selectedType] === type
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};