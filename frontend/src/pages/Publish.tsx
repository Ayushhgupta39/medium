import React, { useState } from "react";
import Appbar from "@/components/app/Appbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  title: string;
  content: string;
}

const Publish: React.FC = () => {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    content: "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({ ...blogPost, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogPost({ ...blogPost, content: e.target.value });
  };

  const handlePublish = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        blogPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Publishing blog post:", response.data);
      toast({
        title: "Success",
        description: "Blog post published!",
      });
      navigate("/blogs")
    } catch (error) {
      console.error("Error publishing blog post:", error);
      alert("Failed to publish blog post.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Appbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Publish New Post</h1>
        <div>
          <Label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </Label>
          <Input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={blogPost.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mt-4">
          <Label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2"
          >
            Content
          </Label>
          <textarea
            id="content"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={10}
            value={blogPost.content}
            onChange={handleContentChange}
          />
        </div>

        <div className="mt-6">
          <Button
            onClick={handlePublish}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
