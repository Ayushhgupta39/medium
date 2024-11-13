import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setBlogs(response.data);
    });
    } catch (error) {
      console.log("Error while fetching blogs: ", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    blogs,
  };
};
