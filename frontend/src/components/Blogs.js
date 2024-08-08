import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../actions/blog';

export default function Blogs() {
  const dispatch = useDispatch();
  const {blogs} = useSelector((state) => state.blogs); 

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-12 py-3">
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
          <svg
            className="h-6 mr-3"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 455.005 455.005"
            style={{ enableBackground: "new 0 0 455.005 455.005" }}
            xmlSpace="preserve"
          >
            {/* SVG paths here */}
          </svg>
          <a href="#" className="font-semibold inline-block">
            Our Blog
          </a>
        </div>
        <a href="#">See All</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <div key={blog.blog_id} className="rounded overflow-hidden shadow-lg flex flex-col">
            <a href="#" />
            <div className="relative">
              <a href="#">
                <img
                  className="w-full"
                  src={`/blogs/${blog.blog_image}` || "https://defaultimage.com/default.jpg"} // Default image if none provided
                  alt={blog.title}
                />
                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
              </a>
              <a href="#!">
                <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                  {blog.category || "Category"}
                </div>
              </a>
            </div>
            <div className="px-6 py-4 mb-auto">
              <a
                href="#"
                className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
              >
                {blog.title || "Title"}
              </a>
              <p className="text-gray-500 text-sm">
                {blog.content.substring(0,200)}
              </p>
            </div>
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
              <span
                className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
              >
                <svg
                  height="13px"
                  width="13px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  {/* SVG path here */}
                </svg>
                <span className="ml-1">{blog.timestamp || "Date"}</span>
              </span>
              <span
                className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
              >
                <svg
                  className="h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  ></path>
                </svg>
                <span className="ml-1">{blog.comments_count || "0 Comments"}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
