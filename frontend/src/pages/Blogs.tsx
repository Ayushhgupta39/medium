import Appbar from "@/components/app/Appbar";
import BlogCard from "@/components/app/BlogCard";
import { useBlogs } from "@/hooks/useBlogs";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="flex flex-col justify-center">
        <Appbar />
        <div className="p-4 flex flex-col items-center ">
          <BlogCard
            author="Peter V."
            date="Dec 3, 2023"
            memberOnly={true}
            title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"
            description="No need to create a fancy and modern website with hundreds of pages to make money online"
            tags={["Side Hustle"]}
            readTime="3 min"
            imageUrl="https://via.placeholder.com/150"
          />
          <BlogCard
            author="Peter V."
            date="Dec 3, 2023"
            memberOnly={true}
            title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"
            description="No need to create a fancy and modern website with hundreds of pages to make money online"
            tags={["Side Hustle"]}
            readTime="3 min"
            imageUrl="https://via.placeholder.com/150"
          />
          <BlogCard
            author="Peter V."
            date="Dec 3, 2023"
            memberOnly={true}
            title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"
            description="No need to create a fancy and modern website with hundreds of pages to make money online"
            tags={["Side Hustle"]}
            readTime="3 min"
            imageUrl="https://via.placeholder.com/150"
          />
        </div>
      </div>
    );
  }
};

export default Blogs;
