import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, deleteBlog } from '../../actions/blog';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setSelectedBlogId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteBlog(selectedBlogId));
    setOpen(false);
    dispatch(getBlogs());
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white py-5 sm:py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {filteredBlogs?.map((blog) => (
            <article key={blog.blog_id} className="flex flex-col items-start justify-between relative">
              <div className="relative w-full">
                <img
                  alt=""
                  src={blog.image_url || '/default_image.png'}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="w-full px-3 pb-3">
                <div className="mt-8 flex items-center justify-between text-xs">
                  <time dateTime={blog.created_at} className="text-gray-500">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {blog.status}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold capitalize leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link to={`/admin/blogs/view/${blog.blog_id}`}>
                      <span className="absolute inset-0" />
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{blog.blog_excerpt}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(blog.blog_id)}
                    className="text-gray-400 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  
                  </button>
                  <Link to={`/admin/blogs/view/${blog.blog_id}`} className="text-gray-400 hover:text-blue-800">
                    <PencilIcon className="h-5 w-5 " aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Delete Blog
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this blog? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BlogList;
