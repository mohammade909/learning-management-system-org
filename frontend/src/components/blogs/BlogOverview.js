import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../actions/blog";
import BlogEdit from "./BlogEdit";
import { StarIcon } from '@heroicons/react/20/solid';

const BlogOverview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blogs);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    dispatch(getBlogById(id));
  }, [dispatch, id]);

  if (!blog) return <div>Loading...</div>;

  const reviews = {
    average: 4,
    featured: [
      {
        id: 1,
        rating: 5,
        content: `
          <p>${blog.content}</p>
        `,
        date: new Date(blog.created_at).toLocaleDateString(),
        datetime: blog.created_at,
        author: 'Anonymous', // Update with actual author if available
        avatarSrc: 'https://example.com/avatar.jpg', // Use a relevant image URL
      },
      // Add more reviews if necessary
    ],
  };

  return (
    <div className="bg-white py-5 sm:py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blog Details
          </h2>
        </div>
        <div className="mt-4">
          <nav className="flex border-b border-gray-200">
            <button
              className={`mr-4 pb-2 text-sm font-medium ${
                activeTab === "overview"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`pb-2 text-sm font-medium ${
                activeTab === "edit"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("edit")}
            >
              Edit
            </button>
          </nav>

          {activeTab === "overview" && (
            <div className="mt-4">
              <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                {/* Blog image */}
                <div className="lg:col-span-4 lg:row-end-1">
                  <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      alt={blog.title}
                      src={`/blogs/${blog.blog_image}` || '/default_image.png'}
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                {/* Blog details */}
                <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                  <div className="flex flex-col-reverse">
                    <div className="mt-4">
                      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {blog.title}
                      </h1>
                      <p className="mt-2 text-sm text-gray-500">
                        Created at:{" "}
                        <time dateTime={blog.created_at}>
                          {new Date(blog.created_at).toLocaleDateString()}
                        </time>
                      </p>
                    </div>

                    <div>
                      <h3 className="sr-only">Reviews</h3>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={classNames(
                              reviews.average > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                          />
                        ))}
                      </div>
                      <p className="sr-only">{reviews.average} out of 5 stars</p>
                    </div>
                  </div>

                  <p className="mt-6 text-gray-500">{blog.content}</p>

                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                    <div className="prose prose-sm mt-4 text-gray-500">
                      <ul role="list">
                        {/* Add highlights if any */}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h3 className="text-sm font-medium text-gray-900">License</h3>
                    <p className="mt-4 text-sm text-gray-500">
                      {/* License information if any */}
                    </p>
                  </div>

                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h3 className="text-sm font-medium text-gray-900">Share</h3>
                    <ul role="list" className="mt-4 flex items-center space-x-6">
                      {/* Add social share links if necessary */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "edit" && <BlogEdit/>}
        </div>
      </div>
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default BlogOverview;
