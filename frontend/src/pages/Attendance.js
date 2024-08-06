import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaCheck,
  FaRegSquare,
  FaBan,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../BaseFiles/Loader";
import { getAllDatesOfMonth } from "../actions";
import { getUsers } from "../actions/user";
import { getAllAttendances, markAttendance } from "../actions/attendance";
import { ReasonPopUp } from "../BaseFiles/ReasonPopUp";
import TabMenus from "../BaseFiles/TabMenus";

const tabs = [
  { name: "Instructor", href: "/attendance/instructor" },
  { name: "Students", href: "/attendance/child" },
];

const Attendance = () => {
  const { role } = useParams();
  const [rotate, setRotate] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { attendances } = useSelector((state) => state.attendance);
  const [reload, setReload] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    dispatch(getUsers({ user_type: role, token }));
    dispatch(getAllAttendances());
  }, [dispatch, role, token, reload]);

  const { dates, monthName } = getAllDatesOfMonth(selectedMonth, 2024);

  const handleAttendanceAction = async (user_id, date, status, reason) => {
    await dispatch(markAttendance({ user_id, date, status, reason }));
    setReload(!reload);
  };

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleAbsent = (day, user_id, status) => {
    setData({ user_id, day, status });
  };

  const handleNextDate = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
  };

  const handlePreviousDate = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const formattedDate = currentDate.toISOString().split("T")[0];

  return (
    <>
      <TabMenus tabs={tabs} />
      <section className="py-1 w-full m-auto shadow-lg">
        <div className="flex justify-between items-center bg-white p-2 border-b-2">
          <button onClick={handlePreviousDate} className="text-gray-700">
            <FaAngleLeft />
          </button>
          <p className="font-semibold tracking-wider">{formattedDate}</p>
          <button onClick={handleNextDate} className="text-gray-700">
            <FaAngleRight />
          </button>
        </div>
        <div className="bg-white p-2 border-b-2 flex justify-between items-center">
          <p className="font-semibold tracking-wider">Username</p>
          <p className="font-semibold tracking-wider">Actions</p>
        </div>
        <div className="flex bg-white h-full w-full">
          {false ? (
            <Loader />
          ) : (
            <div className="p-2 border-b-2 w-full">
              {users?.length === 0 ? (
                <p className="text-center py-5">No data found</p>
              ) : (
                users?.map((user) => {
                  const attendanceRecord = attendances.find(
                    (record) =>
                      record.user_id === user.user_id &&
                      record.date === formattedDate &&
                      record.status === "present"
                  );
                  const isAbsent = attendances.find(
                    (record) =>
                      record.user_id === user.user_id &&
                      record.date === formattedDate &&
                      record.status === "absent"
                  );

                  return (
                    <div key={user.user_id} className="flex wrap sm:no-wrap py-2">
                      <div className="w-full sm:w-1/2 border-b-2">
                        <p className="capitalize">{user.username}</p>
                      </div>

                      <div className="w-full sm:w-1/2 flex justify-between px-5 items-center">
                        {isAbsent ? (
                          <p> Some reason</p>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleAttendanceAction(
                                  user.user_id,
                                  formattedDate,
                                  "present",
                                  null
                                )
                              }
                              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                            >
                              <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Present
                              </span>
                            </button>

                            <button
                              onClick={() =>
                                handleAbsent(
                                  formattedDate,
                                  user.user_id,
                                  "absent"
                                )
                              }
                              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                            >
                              <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Absent
                              </span>
                            </button>
                          </>
                        )}

                        <p className="">
                          {currentDate.getDay() === 0 ? (
                            <FaBan className="text-gray-400 " />
                          ) : attendanceRecord ? (
                            <FaCheck
                              className="text-green-700 cursor-pointer"
                              onClick={() =>
                                handleAttendanceAction(
                                  user.user_id,
                                  formattedDate,
                                  attendanceRecord.status,
                                  attendanceRecord.reason
                                )
                              }
                            />
                          ) : isAbsent ? (
                            <FaBan className="text-red-400 " />
                          ) : (
                            <FaRegSquare
                              className="text-gray-700 cursor-pointer"
                              onClick={() =>
                                handleAttendanceAction(
                                  user.user_id,
                                  formattedDate,
                                  "present",
                                  null
                                )
                              }
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {data && <ReasonPopUp userInfo={data} isClose={() => setData(null)} />}
      </section>
    </>
  );
};

export default Attendance;
