import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { getUserById, updateUser } from "../../actions/user";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Enrollments from "../../pages/Enrollments";
import ManageCourse from "../course/ManageCourse";
const UpdateUserForm = () => {
  const [activeTab, setActiveTab] = useState("form");
  const [isOpen , setIsOpen] = useState(false)
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { user, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(updateUser({ userId: id, updatedData: values }));
      // Add your update logic here
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  if (loading || !user) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <>
      <div className="max-w-full mx-auto mt-10">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4">
            <button
              onClick={() => handleTabClick("form")}
              className={`py-2 px-4 font-semibold ${
                activeTab === "form"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Update User
            </button>
            <button
              onClick={() => handleTabClick("manage")}
              className={`py-2 px-4 font-semibold ${
                activeTab === "manage"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Manage
            </button>
            <button
              onClick={() => handleTabClick("enrollments")}
              className={`py-2 px-4 font-semibold ${
                activeTab === "enrollments"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Enrollments
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === "form" && (
            <Formik
              initialValues={{
                username: user.username || "",
                email: user.email || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                user_type: user.user_type || "",
                password: "",
                parent_id: user.parent_id || "",
                date_of_birth: user.date_of_birth || "",
                grade_level: user.grade_level || "",
                phone_number: user.phone_number || "",
                address: user.address || "",
                department: user.department || "",
                qualifications: user.qualifications || "",
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form className="bg-white p-6 rounded-lg shadow-md">
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">
                      Username
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="first_name" className="block text-gray-700">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="first_name"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="last_name" className="block text-gray-700">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="last_name"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_type" className="block text-gray-700">
                      User Type
                    </label>
                    <Field
                      as="select"
                      name="user_type"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="">Select user type</option>
                      <option value="parent">Parent</option>
                      <option value="child">Child</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </Field>
                  </div>
                  {values.user_type === "child" && (
                    <>
                      <div className="mb-4">
                        <label
                          htmlFor="parent_id"
                          className="block text-gray-700"
                        >
                          Parent ID
                        </label>
                        <Field
                          type="number"
                          name="parent_id"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="date_of_birth"
                          className="block text-gray-700"
                        >
                          Date of Birth
                        </label>
                        <Field
                          type="date"
                          name="date_of_birth"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="grade_level"
                          className="block text-gray-700"
                        >
                          Grade Level
                        </label>
                        <Field
                          type="text"
                          name="grade_level"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                      </div>
                    </>
                  )}
                  {values.user_type === "parent" && (
                    <>
                      <div className="mb-4">
                        <label
                          htmlFor="phone_number"
                          className="block text-gray-700"
                        >
                          Phone Number
                        </label>
                        <Field
                          type="text"
                          name="phone_number"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="address"
                          className="block text-gray-700"
                        >
                          Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                      </div>
                    </>
                  )}
                  {(values.user_type === "instructor" ||
                    values.user_type === "admin") && (
                    <>
                      <div className="mb-4">
                        <label
                          htmlFor="department"
                          className="block text-gray-700"
                        >
                          Department
                        </label>
                        <Field
                          type="text"
                          name="department"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="qualifications"
                          className="block text-gray-700"
                        >
                          Qualifications
                        </label>
                        <Field
                          type="text"
                          name="qualifications"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                      </div>
                    </>
                  )}
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                      Password (leave blank to keep current password)
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
                    >
                      Update User
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          {activeTab === "enrollments" && <Enrollments id={id} />}
          {activeTab === "manage" && <ManageCourse isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
      </div>
    </>
  );
};

export default UpdateUserForm;
