import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateBlog } from '../../actions/blog';
import SuccessAlert from '../../BaseFiles/SuccessAlert';
import ErrorAlert from '../../BaseFiles/ErrorAlert';

const BlogEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, loading, error, message } = useSelector((state) => state.blogs);
  const initialValues = {
    title: blog.title || '',
    content: blog.content || '',
    tags: blog.tags ||"",
    status: blog.status ||"",
    blog_image: null,
    blog_excerpt: blog.blog_excerpt|| '',
    blog_image: null,
  };




  const handleSubmit = (values) => {
    const updatedBlog = new FormData();
    
    const formData = {
      title: values.title,
      content: values.content,
      tags: values.tags,
      status: values.status,
      blog_excerpt: values.blog_excerpt,
      blog_image: values.image,
    };

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== '' && formData[key] !== undefined) {
        if (key === 'blog_image') {
          updatedBlog.append(key, formData[key]);
        } else {
          updatedBlog.append(key, formData[key]);
        }
      }
    });
  
    // Dispatch the action and navigate
    dispatch(updateBlog(id, updatedBlog));
    navigate(`/admin/blogs/view/${id}`);
  };
  

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="pb-20">
      <div className="max-w-full mx-auto bg-white p-8 shadow-lg rounded">
        <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

        {message && <SuccessAlert message={message} />}
        {error && <ErrorAlert error={error} />}

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Title</label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700">Content</label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                  rows="4"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="blog_excerpt" className="block text-gray-700">Excerpt</label>
                <Field
                  as="textarea"
                  id="blog_excerpt"
                  name="blog_excerpt"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                  rows="4"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tags" className="block text-gray-700">Tags</label>
                <Field
                  id="tags"
                  name="tags"
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                />
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700">Status</label>
                <Field
                  as="select"
                  id="status"
                  name="status"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                >
                  <option value="" label="Select status" />
                  <option value="draft" label="Draft" />
                  <option value="published" label="Published" />
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="blog_image" className="block text-gray-700">Image</label>
                <input
                  id="blog_image"
                  name="blog_image"
                  type="file"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                  onChange={(event) => {
                    setFieldValue("blog_image", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="blog_image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BlogEdit;
