import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
  createNotification,
  getAllNotifications,
  getNotificationsByUser,
  deleteNotification,
} from "../../redux/notificationSlice"; // Adjust import path as needed
import { getUsers } from "../../actions/user"; // Adjust import path as needed
import * as Yup from "yup";
import "tailwindcss/tailwind.css";
import ConfrimPopUp from "./ConfrimPopUp";

// Validation schema for Formik
const validationSchema = Yup.object().shape({
  message: Yup.string().required("Message is required"),
  userId: Yup.number().nullable(),
  forAllUsers: Yup.boolean(),
});

const Notifications = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { notifications, loading } = useSelector(
    (state) => state.notifications
  );
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("create");
  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedId] = useState();

  useEffect(() => {
    dispatch(getUsers({ user_type: "child", token: "" }));
    if (activeTab === "manage") {
      dispatch(getAllNotifications());
    }
  }, [dispatch, activeTab]);

  const handleUserSearch = (searchTerm) => {
    if (searchTerm) {
      const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
    }
  };

  const handleDelete = (userId) => {
    setDeletedId(userId);
    setOpen(true);
  };

  const renderCreateForm = () => (
    <Formik
      initialValues={{
        message: "",
        title: "",
        userId: null,
        forAllUsers: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(createNotification(values));
        resetForm();
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <Field
              name="title"
              as="input"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.title && touched.title && (
              <div className="text-red-600">{errors.title}</div>
            )}
            <label className="block text-gray-700">Message</label>
            <Field
              name="message"
              as="textarea"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.message && touched.message && (
              <div className="text-red-600">{errors.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">For All Users</label>
            <Field
              type="checkbox"
              name="forAllUsers"
              className="mt-1"
              onChange={(e) => {
                setFieldValue("forAllUsers", e.target.checked);
                if (e.target.checked) {
                  setFieldValue("userId", null);
                  setSelectedUserId(null);
                }
              }}
            />
          </div>

          {!errors.forAllUsers && !errors.userId && (
            <div className="mb-4">
              <label className="block text-gray-700">Search User</label>
              <input
                type="text"
                placeholder="Search user"
                onChange={(e) => handleUserSearch(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              {searchResults.length > 0 && (
                <div className="mt-2">
                  {searchResults.map((user) => (
                    <div key={user.user_id} className="flex items-center mb-2">
                      <Field
                        type="checkbox"
                        name="userId"
                        value={user.user_id}
                        checked={selectedUserId === user.user_id}
                        onChange={(e) => {
                          setFieldValue(
                            "userId",
                            e.target.checked ? user.user_id : null
                          );
                          setSelectedUserId(
                            e.target.checked ? user.user_id : null
                          );
                        }}
                        disabled={
                          selectedUserId && selectedUserId !== user.user_id
                        }
                        className="mr-2"
                      />
                      <label>{user.username}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Create Notification
          </button>
        </Form>
      )}
    </Formik>
  );

  const renderManageNotifications = () => (
    <div className="space-y-4">
      {loading && <p>Loading...</p>}
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.notification_id}
            className="p-4 border border-gray-300 rounded mb-4 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{notification.message}</p>
              <p>User ID: {notification.userId}</p>
              <p>For All Users: {notification.forAllUsers ? "Yes" : "No"}</p>
            </div>
            <div>
              <button
                onClick={() => handleDelete(notification.notification_id)}
              >
                delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "create"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "manage"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("manage");
            dispatch(getAllNotifications()); // Fetch notifications when 'manage' tab is active
          }}
        >
          Manage
        </button>
      </div>
      {activeTab === "create" && renderCreateForm()}
      {activeTab === "manage" && renderManageNotifications()}
      <ConfrimPopUp open={open} setOpen={setOpen} id={deletedId} />
    </div>
  );
};

export default Notifications;
