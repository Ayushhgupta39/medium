import React from "react";

const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="flex items-center cursor-pointer p-4 m-3 border-b border-gray-200 animate-pulse">
      <div className="w-full">
        <div className="flex items-center mb-2">
          {/* Skeleton Avatar */}
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

          <div className="ml-2">
            {/* Skeleton Text for Author and Date */}
            <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
        </div>

        {/* Skeleton Title */}
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>

        {/* Skeleton Description */}
        <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-3"></div>

        {/* Skeleton Tags and Read Time */}
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-300 rounded w-12"></div>
          <div className="h-3 bg-gray-300 rounded w-8"></div>
        </div>
      </div>

      {/* Skeleton Image */}
      <div className="mt-4 ml-10 w-1/5 h-32 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default BlogCardSkeleton;
