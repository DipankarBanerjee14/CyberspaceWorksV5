"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  image?: string;
  metaDescription?: string;
  permalink: string;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");

        const data = await res.json();

        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Latest Blogs
      </h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              href={`/blog/${blog.permalink}`}
            >
              <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition cursor-pointer">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-5">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 line-clamp-3">
                    {blog.metaDescription}
                  </p>

                  <div className="mt-4 text-sm text-gray-500">
                    {new Date(
                      blog.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}