import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Reports from "../Child/Reports";
import Enrollment from "../components/enrollment/Enrollment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUser } from "../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./Spinner";
import Certificate from "../Child/Certificate";
import { getUserPermissions } from "../AccessControl/actions/accessControl";
import { getNotificationsByUser } from "../redux/notificationSlice";
const navigation = [
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Deployments", href: "#", icon: ServerIcon, current: false },
  { name: "Activity", href: "#", icon: SignalIcon, current: false },
  { name: "Domains", href: "#", icon: GlobeAltIcon, current: false },
  { name: "Usage", href: "#", icon: ChartBarSquareIcon, current: false },
  { name: "Settings", href: "#", icon: Cog6ToothIcon, current: true },
];

const teams = [
  { id: 1, name: "Planetaria", href: "#", initial: "P", current: false },
  { id: 2, name: "Protocol", href: "#", initial: "P", current: false },
  { id: 3, name: "Tailwind Labs", href: "#", initial: "T", current: false },
];
const tabNavigation = [
  { name: "Account", href: "account", current: true },
  { name: "Notifications", href: "notification", current: false },
  { name: "Billing", href: "billings", current: false },
  { name: "Enrolled Course", href: "enrollment", current: false },
  { name: "Certificate", href: "certificate", current: false },
  { name: "Reports", href: "reports", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const { auth, token } = useSelector((state) => state.auth);
  const { userPermissions } = useSelector((state) => state.permissions);
  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  useEffect(() => {
    dispatch(getUserPermissions({ userId: auth?.user_id, token }));
    dispatch(getNotificationsByUser(auth?.user_id));
  }, []);

  const secondaryNavigation = tabNavigation.filter((navItem) => {
    const permissionKey = navItem.name.toLowerCase().replace(" ", "");

    const permissionsString = userPermissions[permissionKey];
    if (permissionsString) {
      try {
        const permissions = JSON.parse(permissionsString);
        return Array.isArray(permissions) && permissions.includes("read");
      } catch (e) {
        console.error(`Error parsing permissions for ${permissionKey}:`, e);
        return false;
      }
    }
    return false;
  });

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 xl:hidden"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear" />

          <div className="fixed inset-0 flex">
            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out">
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-cyan-800  text-white"
                                  : "text-cyan-900  hover:bg-cyan-800  hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className="h-6 w-6 shrink-0"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                        <li>
                          <button
                            onClick={handleLogout}
                            className={classNames(
                              false
                                ? "bg-cyan-800  text-white"
                                : "text-cyan-900  hover:bg-cyan-800  hover:text-white",
                              "group flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                              />
                            </svg>
                            Log Out
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <a
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? "bg-cyan-800  text-white"
                                  : "text-cyan-900  hover:bg-cyan-800  hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-cyan-800  text-[0.625rem] font-medium text-cyan-900  group-hover:text-white">
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li className="-mx-6 mt-auto">
                      <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                      >
                        <img
                          alt=""
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          className="h-8 w-8 rounded-full bg-gray-800"
                        />
                        <span className="sr-only">Your profile</span>
                        <span aria-hidden="true">Tom Cook</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cyan-300  px-6 ring-1 ring-white/5">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-cyan-800  text-white"
                              : "text-cyan-900  hover:bg-cyan-800  hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          false
                            ? "bg-cyan-800  text-white"
                            : "text-cyan-900  hover:bg-cyan-800  hover:text-white",
                          "group flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                          />
                        </svg>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </li>

                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-800"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-slate-200  px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-cyan-700  xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            <div
              className="h-6 w-px bg-cyan-900/10 xl:hidden"
              aria-hidden="true"
            />

            <div className="relative flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-cyan-700 "
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 bg-slate-200  pl-8 pr-0 text-cyan-900  placeholder:text-cyan-700  focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:hidden">
                <label htmlFor="current-tab" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="current-tab"
                  name="current-tab"
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  defaultValue={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  {secondaryNavigation.map((tab) => (
                    <option key={tab.name} value={tab.href}>
                      {tab.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav
                  className="isolate flex divide-x divide-cyan-200  rounded-lg shadow"
                  aria-label="Tabs"
                >
                  {secondaryNavigation.map((tab) => (
                    <button
                      key={tab.name}
                      className={classNames(
                        tab.href === activeTab
                          ? "text-gray-900"
                          : "text-cyan-700  hover:text-gray-700",
                        tab.href === activeTab
                          ? "bg-cyan-100 "
                          : "hover:bg-gray-50",
                        "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center focus:z-10"
                      )}
                      aria-current={tab.href === activeTab ? "page" : undefined}
                      onClick={() => setActiveTab(tab.href)}
                    >
                      <span>{tab.name}</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          tab.href === activeTab
                            ? "bg-cyan-500 "
                            : "bg-transparent",
                          "absolute inset-x-0 bottom-0 h-0.5"
                        )}
                      />
                    </button>
                  ))}
                </nav>
              </div>

              {notifications.map((item, index) => (
                <div
                  key={index}
                  class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                  role="alert"
                >
                  <p class="font-bold">{item.title}</p>
                  <p>{item.message}</p>
                </div>
              ))}
              <div>
                {activeTab === "account" && <Account />}
                {activeTab === "enrollment" && <Enrollment />}
                {activeTab === "reports" && <Reports />}
                {activeTab === "certificate" && <Certificate />}
                {activeTab === "childrens" && <Certificate />}
                {/* Add other tab contents here */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function Account() {
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
