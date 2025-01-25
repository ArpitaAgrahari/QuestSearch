import { motion } from "framer-motion";

export const Skeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 bg-white rounded-lg shadow-md"
        >
          <div className="flex justify-between items-start">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};