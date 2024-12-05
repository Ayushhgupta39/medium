import Appbar from "@/components/app/Appbar";
import BlogCardSkeleton from "@/components/ui/blog-skeleton";
import { useBlog } from "@/hooks/useBlog";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { id } = useParams();
  const { loading, blog }: { blog: any; loading: boolean } = useBlog({
    id: id || "",
  });
  console.log(blog);

  if (!blog) {
    return <div>Blog post not found.</div>;
  }

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="p-8 max-w-3xl mx-auto">
          <BlogCardSkeleton />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Appbar />
        <div className="p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="text-gray-600 mb-4">
            By {blog?.author?.name || "Anonymous"} • {blog.date}
          </div>
          <div className="prose prose-lg max-w-none">{blog.content}</div>
        </div>
      </div>
    );
  }
};

export default BlogPage;
