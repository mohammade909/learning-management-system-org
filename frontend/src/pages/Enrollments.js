import { fetchEnrollmentByChildId } from "../redux/enrollmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import FeeDrawer from "../components/course/FeeDrawer";
const statuses = {
  Paid: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Enrollments({ id }) {
  const [open, setOpen] = useState(false);
  const [feeData, setFeesData] = useState([]);
  const [showHistory, setShowHistory] = useState({});
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.enrollments.data);
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEnrollmentByChildId(id));
  }, [dispatch]);

  const handleFee = (data) => {
    setOpen(!open);
    setFeesData(data);
  };

  const toggleHistory = (courseId) => {
    setShowHistory((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };
  return (
    <div className="bg-gray-50">
      <ToastContainer />
      <div className="mx-auto max-w-2xl pt-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Enrolled Courses
            </h1>
            <a
              href="#"
              className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block"
            >
              View invoice
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
          <p className="text-sm text-gray-600">
            Order placed{" "}
            <time dateTime="2021-03-22" className="font-medium text-gray-900">
              March 22, 2021
            </time>
          </p>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden"
          >
            View invoice
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        {/* Products */}
        <div className="mt-6">
          <h2 className="sr-only">Products purchased</h2>

          <div className="space-y-8">
            {courses?.map((item) => (
              <div
                key={item.enrollment_id}
                className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
              >
                <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                  <div className="sm:flex lg:col-span-7">
                    <div className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                      <img
                        alt={item.course.course_name}
                        src={
                          item.course.course_image
                            ? `/courses/${item.course.course_image}`
                            : "default-image.png"
                        }
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                      />
                    </div>

                    <div className="mt-6 sm:ml-6 sm:mt-0">
                      <h3 className="text-base font-medium text-gray-900">
                        {item.course.course_name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        Code: {item.course.course_code}
                      </p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        Price: ₹{item.course.course_price}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Duration: {item.course.course_duration}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        Category: {item.course.course_category}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 lg:col-span-5 lg:mt-0">
                    <dl className="grid grid-cols-2 gap-x-6 text-sm">
                      <div>
                        <dt className="font-medium text-gray-900">Address</dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">{item.address}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">
                          Contact Info
                        </dt>
                        <dd className="mt-3 space-y-3 text-gray-500">
                          <p>Phone: {item.phone_number}</p>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Edit
                          </button>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">
                          Payment Details
                        </dt>

                        <hr />
                        <button
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => toggleHistory(item.course.course_id)}
                        >
                          {showHistory[item.course.course_id]
                            ? "Hide History"
                            : "Show History"}
                        </button>
                        <button
                          className="rounded bg-blue-200 text-blue-900 p-2 mt-4"
                          onClick={() => handleFee(item.fees)}
                        >
                          {auth.user_type === "child" ? "Pay Fee" : "Take Fee"}
                        </button>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="px-4 py-4 sm:px-6 lg:px-8">
                  {showHistory[item.course.course_id] && (
                    <div className="mt-4 overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Fee ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Due Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Paid
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Due Amount
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Payment Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Payment Method
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {
                            item.fees.reduce(
                              (acc, fee) => {
                                acc.totalPaid += parseFloat(fee.paid);
                                const dueAmount =
                                  parseFloat(fee.fee_amount) - acc.totalPaid;
                                return {
                                  totalPaid: acc.totalPaid,
                                  rows: [
                                    ...acc.rows,
                                    <tr key={fee.fee_id}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {fee.fee_id}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ₹{fee.fee_amount}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(fee.due).toLocaleDateString()}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <span className="bg-green-600/10  px-2 text-green-500 rounded-full ">
                                        ₹{fee.paid}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <span className="bg-red-600/10  px-2 text-red-500 rounded-full ">

                                        ₹{dueAmount.toFixed(2)}
                                      </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {fee.status}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(
                                          fee.payment_date
                                        ).toLocaleDateString()}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {fee.payment_method}
                                      </td>
                                    </tr>,
                                  ],
                                };
                              },
                              { totalPaid: 0, rows: [] }
                            ).rows
                          }
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing */}
        <div className="mt-16">
          <h2 className="sr-only">Billing Summary</h2>

          <div className="bg-gray-100 px-4 py-6 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
            <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">Floyd Miles</span>
                  <span className="block">7363 Cynthia Pass</span>
                  <span className="block">Toronto, ON N3Y 4H8</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">
                  Payment information
                </dt>
                <dd className="-ml-4 -mt-1 flex flex-wrap">
                  <div className="ml-4 mt-4 flex-shrink-0">
                    <svg
                      width={36}
                      height={24}
                      viewBox="0 0 36 24"
                      aria-hidden="true"
                      className="h-6 w-auto"
                    >
                      <rect rx={4} fill="#224DBA" width={36} height={24} />
                      <path
                        d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                        fill="#fff"
                      />
                    </svg>
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="ml-4 mt-4">
                    <p className="text-gray-900">Ending with 4242</p>
                    <p className="text-gray-600">Expires 02 / 24</p>
                  </div>
                </dd>
              </div>
            </dl>

            <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
              <div className="flex items-center justify-between pb-4">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">$72</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="font-medium text-gray-900">$5</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium text-gray-900">$6.16</dd>
              </div>
              <div className="flex items-center justify-between pt-4">
                <dt className="font-medium text-gray-900">Order total</dt>
                <dd className="font-medium text-indigo-600">$83.16</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <FeeDrawer open={open} setOpen={setOpen} feeData={feeData} />
    </div>
  );
}
