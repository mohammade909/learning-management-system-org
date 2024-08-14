import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { blogValidationSchema } from "../../formik/blog/validations";
import { createBlog } from "../../actions/blog";
import { useDispatch, useSelector } from "react-redux";
import SuccessAlert from '../../BaseFiles/SuccessAlert';
import ErrorAlert from '../../BaseFiles/ErrorAlert';
import { clearErrors, clearMessage } from '../../redux/blogSlice';
import Spinner from '../../BaseFiles/Spinner'
const CreateBlog = () => {
  const { loading, error, message } = useSelector((state) => state.blogs);
  const { auth } = useSelector((state) => state.auth);
  const initialValues = {
    title: "",
    content: "",
    blog_excerpt: "",
    category: "",
    tags: "",
    author_id:auth.user_id ,
    status: "",
    blog_image: null,
    video: null,
  };

  const dispatch = useDispatch();

  const handleSubmit = (values) => {  
    dispatch(createBlog(values));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [error, message, loading]);

  return (
    <div className="pb-20">
      <div className="max-w-full mx-auto bg-white p-8 shadow-lg rounded">
        <h1 className="text-2xl font-bold mb-6">Add New Blog Post</h1>
        
        {message ? <SuccessAlert message={message} /> : error ? <ErrorAlert error={error.error} /> :
        <Formik
          initialValues={initialValues}
          validationSchema={blogValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <Field
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
                <label className="block text-gray-700">Content</label>
                <Field
                  as="textarea"
                  name="content"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Exerpt</label>
                <Field
                  as="textarea"
                  name="blog_excerpt"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                />
                <ErrorMessage
                  name="blog_excerpt"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <Field
                  name="category"
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tags</label>
                <Field
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
                <label className="block text-gray-700">Status</label>
                <Field
                  as="select"
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
                <label className="block text-gray-700">Image</label>
                <input
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
              <div className="mb-4">
                <label className="block text-gray-700">Video</label>
                <input
                  name="video"
                  type="file"
                  className="w-full mt-2 p-2 border border-gray-300 rounded bg-gray-100"
                  onChange={(event) => {
                    setFieldValue("video", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="video"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded"
              >
          {loading ? <Spinner/> : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>}
      </div>
    </div>
  );
};

export default CreateBlog;
