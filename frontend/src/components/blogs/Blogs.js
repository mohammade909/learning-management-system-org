import React, { useState } from "react";
import BlogList from "./BlogList";
import CreateBlogForm from "./CreateBlog";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("blogs");

  return (
    <div className="bg-white py-5 sm:py-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "blogs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("blogs")}
            >
              Blogs
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "create"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("create")}
            >
              Create Blog
            </button>
          </nav>
        </div>
        {activeTab === "blogs" ? <BlogList /> : <CreateBlogForm />}
      </div>
    </div>
  );
};

export default Tabs;
