import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUser } from "../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../BaseFiles/Spinner"
export default function Account() {
    const dispatch = useDispatch();
    const { auth, loading, token, error, message } = useSelector(
      (state) => state.auth
    );
  
    const formik = useFormik({
      initialValues: {
        first_name: auth.first_name || "",
        last_name: auth.last_name || "",
        email: auth.email || "",
        username: auth.username || "",
        timezone: "",
        password: "",
        user_type: auth.user_type,
      },
      onSubmit: (values) => {
        const filteredValues = Object.fromEntries(
          Object.entries(values).filter(
            ([_, value]) => value !== null && value !== ""
          )
        );
        dispatch(updateUser(filteredValues));
        toast.success(message);
      },
    });
  
    return (
      <div className="divide-y divide-teal/5">
        <ToastContainer />
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Use a permanent address where you can receive mail.
            </p>
          </div>
  
          <form className="md:col-span-2" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full flex items-center gap-x-8">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />
                <div>
                  <button
                    type="button"
                    className="rounded-md bg-cyan-200/10 px-3 py-2 text-sm font-semibold text-cyan-800 shadow-sm hover:bg-white/20"
                  >
                    Change avatar
                  </button>
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>
  
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-cyan-800"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                    className="block w-full rounded-md border-0 bg-cyan-200/10 p-1.5 text-cyan-800 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
                  />
                  {formik.touched.first_name && formik.errors.first_name ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.first_name}
                    </div>
                  ) : null}
                </div>
              </div>
  
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-cyan-800"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                    className="block w-full rounded-md border-0 bg-cyan-200/10 p-1.5 text-cyan-800 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
                  />
                  {formik.touched.last_name && formik.errors.last_name ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.last_name}
                    </div>
                  ) : null}
                </div>
              </div>
  
              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-cyan-800"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="block w-full rounded-md border-0 bg-cyan-200/10 p-1.5 text-cyan-800 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>
  
              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-cyan-800"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-cyan-200/10 ring-1 ring-inset text-cyan-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500">
                    <span className="flex select-none items-center pl-3 text-cyan-800 sm:text-sm">
                      example.com/
                    </span>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="janesmith"
                      autoComplete="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      className="flex-1 border-0 bg-transparent p-1.5 pl-1 text-cyan-800 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
              </div>
  
              <div className="col-span-full">
                <label
                  htmlFor="timezone"
                  className="block text-sm font-medium leading-6 text-cyan-800"
                >
                  Timezone
                </label>
                <div className="mt-2">
                  <select
                    id="timezone"
                    name="timezone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.timezone}
                    className="block w-full rounded-md border-0 bg-cyan-200/10 p-1.5 text-cyan-800 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option value="">Select Timezone</option>
                    <option value="PST">Pacific Standard Time</option>
                    <option value="EST">Eastern Standard Time</option>
                    <option value="GMT">Greenwich Mean Time</option>
                  </select>
                  {formik.touched.timezone && formik.errors.timezone ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.timezone}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
  
            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md w-full bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {loading ? <Spinner /> : "Save"}
              </button>
            </div>
          </form>
        </div>
  
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">
              Log out other sessions
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Please enter your password to confirm you would like to log out of
              your other sessions across all of your devices.
            </p>
          </div>
  
          <form className="md:col-span-2" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="logout-password"
                  className="block text-sm font-medium leading-6 text-cyan-800"
                >
                  Your password
                </label>
                <div className="mt-2">
                  <input
                    id="logout-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="block w-full rounded-md border-0 bg-cyan-200/10 p-1.5 text-cyan-800 px-3 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
  
            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Log out other sessions
              </button>
            </div>
          </form>
        </div>
  
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">
              Delete account
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              No longer want to use our service? You can delete your account here.
              This action is not reversible. All information related to this
              account will be deleted permanently.
            </p>
          </div>
  
          <form className="flex items-start md:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
            >
              Yes, delete my account
            </button>
          </form>
        </div>
      </div>
    );
  }
  