import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, updateUserStatus } from "../../actions/user";
import { ActionConfirm } from "../../BaseFiles/ActionConfirm";
import TabMenus from "../../BaseFiles/TabMenus";

const tabs = [
  { name: "Instructor", href: "/users/instructor" },
  { name: "Students", href: "/users/child" },
  { name: "Parents", href: "/users/parent" },
  { name: "Add User", href: "/add/child" },
];

const Users = () => {
  const { role } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const [reload, setReload] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updatedStatuses, setUpdatedStatuses] = useState({});

  useEffect(() => {
    dispatch(getUsers({ user_type: role, token }));
  }, [dispatch, role, token, reload]);

  const handleStatusChange = (userId, key, value) => {
    setUpdatedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [userId]: {
        ...prevStatuses[userId],
        [key]: value,
      },
    }));
  };

  const handleSave = (userId) => {
    const updatedUser = updatedStatuses[userId];
    
    if (updatedUser) {
      dispatch(updateUserStatus({ userId, updatedData: updatedUser }));
    }
  };

  const statusOptions = [
    { value: "approved", label: "Granted" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Suspended" },
  ];

  const getStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-300 text-blue-900";
      case "approved":
        return "bg-green-300 text-green-900";
      case "rejected":
        return "bg-red-300 text-red-900";
      default:
        return "";
    }
  };
  const getUserStatus = (user, updatedStatuses, statusKey) =>
    updatedStatuses[user.user_id]?.[statusKey] || user[statusKey];
  const renderTableHeader = () => {
    switch (role) {
      case "child":
        return (
          <>
            <th scope="col" className="px-6 py-3">
              Student Id
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Parent's Name
            </th>
            <th scope="col" className="px-6 py-3">
              Login Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </>
        );
      case "parent":
        return (
          <>
            <th scope="col" className="px-6 py-3">
              User Id
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Login Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </>
        );
      case "instructor":
      case "admin":
        return (
          <>
            <th scope="col" className="px-6 py-3">
              User Id
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Department
            </th>
            <th scope="col" className="px-6 py-3">
              Qualifications
            </th>
            <th scope="col" className="px-6 py-3">
              Login Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </>
        );
      default:
        return null;
    }
  };
  const renderTableRows = () => {
    return users?.map((user) => {
      switch (role) {
        case "child":
          return (
            <tr
              key={user.email}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user._id}
              </th>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.username}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.parent?.username || "N/A"}</td>
              <td className="px-6 py-4">
                <select
                  className={`rounded-md ${getStatusClasses(
                    getUserStatus(user, updatedStatuses, "login_status")
                  )} px-3 py-2`}
                  value={getUserStatus(user, updatedStatuses, "login_status")}
                  onChange={(e) =>
                    handleStatusChange(user.user_id, "login_status", e.target.value)
                  }
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 flex space-x-4">
                <Link
                  to={`/users/edit/${user.user_id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleSave(user.user_id)}
                >
                  Save
                </button>
                <button
                  className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                  onClick={() => setDeleteId(user.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        case "parent":
          return (
            <tr
              key={user.email}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.user_id}
              </th>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.username}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone_number}</td>
              <td className="px-6 py-4">{user.address}</td>
              <td className="px-6 py-4">
                <select
                  className={`rounded-md ${getStatusClasses(
                    getUserStatus(user, updatedStatuses, "login_status")
                  )} px-3 py-2`}
                  value={getUserStatus(user, updatedStatuses, "login_status")}
                  onChange={(e) =>
                    handleStatusChange(user.user_id, "login_status", e.target.value)
                  }
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 flex space-x-4">
                <Link
                  to={`/users/edit/${user.user_id}`}
                  className="text-xs text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  className="text-xs text-green-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleSave(user.user_id)}
                >
                  Save
                </button>
                <button
                  className="text-xs text-red-600 dark:text-blue-500 hover:underline"
                  onClick={() => setDeleteId(user.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        case "instructor":
        case "admin":
          return (
            <tr
              key={user.email}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.user_id}
              </th>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.username}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.department}</td>
              <td className="px-6 py-4">{user.qualifications}</td>
              <td className="px-6 py-4">
                <select
                  className={`rounded-md ${getStatusClasses(
                    getUserStatus(user, updatedStatuses, "login_status")
                  )} px-3 py-2`}
                  value={getUserStatus(user, updatedStatuses, "login_status")}
                  onChange={(e) =>
                    handleStatusChange(user.user_id, "login_status", e.target.value)
                  }
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 flex space-x-4">
                <Link
                  to={`/users/edit/${user.user_id}`}
                  className="text-xs text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  className="text-xs text-green-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleSave(user.user_id)}
                >
                  Save
                </button>
                <button
                  className="text-xs text-red-600 dark:text-blue-500 hover:underline"
                  onClick={() => setDeleteId(user.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        default:
          return null;
      }
    });
  };
  

  return (
    <>
      <TabMenus tabs={tabs} />
      <section className="py-1 w-full m-auto mt-2 px-5">
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                renderTableRows()
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    No user found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {deleteId && (
          <ActionConfirm
            id={deleteId}
            action="delete"
            ActionFunction={deleteUser}
            isClose={() => setDeleteId(null)}
          />
        )}
      </section>
    </>
  );
};

export default Users;
