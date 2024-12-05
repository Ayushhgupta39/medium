import Appbar from "@/components/app/Appbar";
import BlogCard from "@/components/app/BlogCard";
import BlogCardSkeleton from "@/components/ui/blog-skeleton";
import { useBlogs } from "@/hooks/useBlogs";

interface Author {
  name: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: Author;
}

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  console.log("BLOGSS :", blogs)

  if (loading) {
    return <div className="flex flex-col w-full justify-center items-center">
      <Appbar />
      <div className="w-3/4">
        {Array.from({ length: 3 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </div>;
  } else {
    return (
      <div className="flex flex-col justify-center">
        <Appbar />
        <div className="p-4 w-full flex flex-col items-center justify-center">
          <div className="w-3/4">
          {blogs.map((blog: Blog, index) => (
            <BlogCard
            key={index}
            id={blog.id}
            author={blog.author.name}
            date="Dec 3, 2023"
            memberOnly={true}
            title={blog.title}
            description={blog.content}
            tags={["Side Hustle"]}
            readTime="3 min"
            imageUrl="https://via.placeholder.com/150"
          />
          ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Blogs;
