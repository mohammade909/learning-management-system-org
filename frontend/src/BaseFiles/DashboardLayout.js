"use client";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Link, Outlet } from "react-router-dom";

const adminNavigation = [
  { name: "Dashboard", href: "/dashboard/admin", icon: HomeIcon },
  { name: "Users", href: "/users/instructor", icon: UsersIcon },
  { name: "Courses", href: "/admin/courses", icon: DocumentDuplicateIcon },
  { name: "Blogs", href: "/admin/blogs", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "/attendance/reports/child", icon: ChartPieIcon },
  { name: "Take Attendance", href: "/attendance/child", icon: ChartPieIcon },
  { name: "Grant Access", href: "/access/permissions", icon: CalendarIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
];

const childNavigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Enrolled Courses", href: "/inrolled/courses", icon: UsersIcon },
  { name: "Attendance Reports", href: "/attendance/reports", icon: DocumentDuplicateIcon },
  { name: "Certificates", href: "/certificates", icon: ChartPieIcon },
  { name: "Notes", href: "/notes", icon: ChartPieIcon },
];

const parentNavigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Enrolled Courses", href: "/inrolled/courses", icon: UsersIcon },
  { name: "Attendance Reports", href: "/attendance/reports", icon: DocumentDuplicateIcon },
  { name: "Certificates", href: "/certificates", icon: ChartPieIcon },
 
  { name: "Notes", href: "/notes", icon: ChartPieIcon },
];

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

const userNavigation = [
  { name: "Your profile", href: "#", type: "nav" },
  { name: "Sign out", href: "#", type: "button" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { auth } = useSelector((state) => state.auth);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const navigation = adminNavigation
    // auth.user_type === "admin"
    //   ? adminNavigation
    //   : auth.user_type === "child"
    //   ? childNavigation
    //   : auth.user_type === "parent"
    //   ? parentNavigation
    //   : [];

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-teal-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />
          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-teal-600 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={classNames(
                                location.pathname === item.href
                                  ? "bg-teal-700 text-white"
                                  : "text-teal-200 hover:bg-teal-700 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  location.pathname === item.href
                                    ? "text-white"
                                    : "text-teal-200 group-hover:text-white",
                                  "h-6 w-6 shrink-0"
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-teal-200">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <Link
                              to={team.href}
                              className={classNames(
                                team.current
                                  ? "bg-teal-700 text-white"
                                  : "text-teal-200 hover:bg-teal-700 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-teal-400 bg-teal-500 text-[0.625rem] font-medium text-white">
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-teal-200 hover:bg-teal-700 hover:text-white"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-teal-200 group-hover:text-white"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-teal-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-teal-700 text-white"
                              : "text-teal-200 hover:bg-teal-700 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              location.pathname === item.href
                                ? "text-white"
                                : "text-teal-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-teal-200">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <Link
                          to={team.href}
                          className={classNames(
                            team.current
                              ? "bg-teal-700 text-white"
                              : "text-teal-200 hover:bg-teal-700 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-teal-400 bg-teal-500 text-[0.625rem] font-medium text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-teal-200 hover:bg-teal-700 hover:text-white"
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-teal-200 group-hover:text-white"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                />
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src={auth?.user?.avatar_url}
                      alt=""
                    />
                    <span className="sr-only">Open user menu</span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block w-full text-left px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={item.name === "Sign out" ? handleLogout : undefined}
                          >
                            {item.name}
                          </button>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
