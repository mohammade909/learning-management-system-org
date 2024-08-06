import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CertificateDrawers = ({action,isClose}) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Dialog open={open} onClose={isClose} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >

                {action == 'apply' ? (
                  <div className="flex h-full flex-col overflow-y-scroll bg-white pt-0 pb-6 shadow-xl">
                  <div className="px-4 sm:px-6 py-4 bg-black">
                    <div className="flex justify-between items-center">
                      <DialogTitle className="text-lg font-semibold  text-white">
                        Apply for Certificate
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={isClose}
                          className="relative rounded-md  text-white focus:outline-none  "
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-2 flex-1">
                    {/* Your content */}
                    <div className="flex min-h-full flex-1 flex-col justify-center py-0">
                      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-[480px]">
                        <div className="bg-white px-6 py-2  sm:rounded-lg sm:px-6">
                          <form action="#" method="POST" className="space-y-6">
                            <div>
                              <label
                                htmlFor="Name"
                                className="block text-sm font-medium  text-gray-900"
                              >
                                User Name
                              </label>
                              <div className="mt-2">
                                <input
                                  id="Name"
                                  name="Name"
                                  type="Name"
                                  required
                                  autoComplete="Name"
                                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium  text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  required
                                  autoComplete="email"
                                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="Number"
                                className="px-3 block text-sm font-medium  text-gray-900"
                              >
                                Phone Number
                              </label>
                              <div className="mt-2">
                                <input
                                  id="Number"
                                  name="Number"
                                  type="Number"
                                  required
                                  autoComplete="Number"
                                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:"
                                />
                              </div>
                            </div>
                            <div className="selector mt-4 mb-2">
                            <label
                                htmlFor="Number"
                                className=" block text-sm font-medium  text-gray-900"
                              >
                                Select Course
                              </label>
                              <p>
                                <span className="">
                                  <select
                                    className=" w p-2 border border-gray-300 rounded-md w-full text-sm  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    aria-required="true"
                                    aria-invalid="false"
                                    name="your-subject"
                                  >
                                    <option value="Full Stack Development">
                                      Full Stack Development
                                    </option>
                                    <option value="Digital Marketing">
                                      Digital Marketing
                                    </option>
                                    <option value="Web Designing">
                                      Web Designing
                                    </option>
                                    <option value="Graphic Designing">
                                      Graphic Designing
                                    </option>
                                    <option value="Figma & XD">
                                      Figma &amp; XD
                                    </option>
                                    <option value="UI/UX Designing">
                                      UI/UX Designing
                                    </option>
                                    <option value="Video Editing">
                                      Video Editing
                                    </option>
                                    <option value="CLO3D Fashion Designing">
                                      CLO3D Fashion Designing
                                    </option>
                                  </select>
                                </span>
                              </p>
                            </div>
                            <div>
                              <label
                                htmlFor="Number"
                                className="block text-sm font-medium  text-gray-900"
                              >
                               Start Date
                              </label>
                              <div className="mt-2">
                                <input
                                  id="Date"
                                  name="Date"
                                  type="Date"
                                  required
                                  autoComplete="Date"
                                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="Number"
                                className="block text-sm font-medium  text-gray-900"
                              >
                                End Date
                              </label>
                              <div className="mt-2">
                                <input
                                  id="Date"
                                  name="Date"
                                  type="Date"
                                  required
                                  autoComplete="Date"
                                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <input
                                  id="remember-me"
                                  name="remember-me"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                  htmlFor="remember-me"
                                  className="ml-3 block text-sm  text-gray-900"
                                >
                                  Remember me
                                </label>
                              </div>

                              <div className="text-sm ">
                                <a
                                  href="#"
                                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                  Reset?
                                </a>
                              </div>
                            </div>

                            <div>
                              <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold  text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                               Send Request
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ):(
                  action =="download" ?(
                    <div className="flex h-full flex-col overflow-y-scroll bg-white pt-0 pb-6 shadow-xl">
                    <div className="px-4 sm:px-6 py-4 bg-black">
                      <div className="flex justify-between items-center">
                        <DialogTitle className="text-lg font-semibold  text-white">
                        Download to Certificate
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            onClick={isClose}
                            className="relative rounded-md  text-white focus:outline-none  "
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-2 flex-1">
                      {/* Your content */}
                      <div className="flex min-h-full flex-1 flex-col justify-center py-0">
                        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-[480px]">
                          <div className="bg-white px-6 py-2  sm:rounded-lg sm:px-6">
                            <form action="#" method="POST" className="space-y-6">
                            <div>
                                <button
                                  type="submit"
                                  className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-lg font-semibold  text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Download Certificate
                                </button>
                              </div>
                              <div>
                                  {/* <label
                                    htmlFor="Name"
                                    className="block text-sm font-medium  text-gray-900"
                                  >
                                  Enter Cyber Solvings Id to Download Certificate
                                  </label> */}
                                <div className="mt-2">
                                  <input
                                    id="Name"
                                    name="Name"
                                    type="Name"
                                    required
                                    autoComplete="Name"
                                    placeholder=" Enter Cyber Solvings Id to Download Certificate"
                                    className="px-3 block w-full rounded-md border-0 py-2 text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:"
                                  />
                                </div>
                              </div>
  
                              <div>
                                <button
                                  type="submit"
                                  className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-lg font-semibold  text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                View Certificate
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  ):(
                    <div className="flex h-full flex-col overflow-y-scroll bg-white pt-0 pb-6 shadow-xl">
                    <div className="px-4 sm:px-6 py-4 bg-black">
                      <div className="flex justify-between items-center">
                        <DialogTitle className="text-lg font-semibold  text-white">
                        Verify Certificate
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            onClick={isClose}
                            className="relative rounded-md  text-white focus:outline-none  "
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-2 flex-1">
                      {/* Your content */}
                      <div className="flex min-h-full flex-1 flex-col justify-center py-0">
                        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-[480px]">
                          <div className="bg-white px-6 py-2  sm:rounded-lg sm:px-6">
                            <form action="#" method="POST" className="space-y-6">
                            <div>
                                <button
                                  type="submit"
                                  className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-lg font-semibold  text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                               Verify Certificate
                                </button>
                              </div>
                              <div>
                                  {/* <label
                                    htmlFor="Name"
                                    className="block text-sm font-medium  text-gray-900"
                                  >
                                  Enter Cyber Solvings Id to Download Certificate
                                  </label> */}
                                <div className="mt-2">
                                  <input
                                    id="Name"
                                    name="Name"
                                    type="Name"
                                    required
                                    autoComplete="Name"
                                    placeholder=" Enter Certificate Number to Verify Certificate"
                                    className="px-3 block w-full rounded-md border-0 py-2 text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:"
                                  />
                                </div>
                              </div>
  
                              <div>
                                <button
                                  type="submit"
                                  className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-lg font-semibold  text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                View Verify Certificate
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                )}


                
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CertificateDrawers;
