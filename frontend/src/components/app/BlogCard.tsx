import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogCardProps {
  author: string;
  date: string;
  memberOnly?: boolean;
  title: string;
  description: string;
  tags: string[];
  readTime: string;
  imageUrl: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  author,
  date,
  memberOnly = false,
  title,
  description,  
  tags,
  readTime,
  imageUrl,
}) => {
  return (
    <div className="flex items-center cursor-pointer p-4 m-3 border-b border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="w-full">
        <div className="flex items-center mb-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{author}</AvatarFallback>
          </Avatar>

          <div className="ml-2 text-sm text-gray-600">
            <span className="font-semibold">{author}</span> • {date}
            {memberOnly && (
              <span className="ml-2 text-yellow-500">★ Member-only</span>
            )}
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-1">{title}</h2>
        <p className="text-sm text-gray-700 mb-3">
          {description.slice(0, 100)}...
        </p>

        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs font-medium bg-gray-200 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">{readTime} read</span>
        </div>
      </div>

      <div className="mt-4">
        <img
          className="w-full rounded-md object-cover"
          src={imageUrl}
          alt="Blog preview"
        />
      </div>
    </div>
  );
};

export default BlogCard;
