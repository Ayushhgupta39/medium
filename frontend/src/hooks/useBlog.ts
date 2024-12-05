import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setBlog(response.data.data);
    });
    } catch (error) {
      console.log("Error while fetching blogs: ", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    blog,
  };
};
