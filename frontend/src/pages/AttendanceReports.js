import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaAngleDown,
  FaArrowsRotate,
  FaXmark,
  FaArrowRightLong,
  FaCheck,
  FaRegSquare,
  FaBan,
} from "react-icons/fa6";
import { TbUserCancel } from "react-icons/tb";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../BaseFiles/Loader";
import { getAllDatesOfMonth } from "../actions";
import { getUsers } from "../actions/user";
import { getAllAttendances } from "../actions/attendance";
import TabMenus from "../BaseFiles/TabMenus";
const tabs = [
  { name: 'Instructor', href: '/attendance/reports/instructor' },
  { name: 'Students', href: '/attendance/reports/child' },
  ];
const AttendanceReport = () => {
  const { role } = useParams();
  const [rotate, setRotate] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { attendances } = useSelector((state) => state.attendance);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getUsers({ user_type: role, token }));
    dispatch(getAllAttendances());
  }, [dispatch, role, token, reload]);

  const { dates, monthName } = getAllDatesOfMonth(selectedMonth, 2024);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const convertToMySQLDateFormat = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <>
    <TabMenus tabs={tabs}/>
    <section className="py-1 w-full m-auto px-5">
     <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/3">{role}</h6>
        <div className="w-2/3 flex gap-2 justify-end px-4 items-center">
          <div className=" text-xs w-1/2 font-sans tracking-wider">
            Month{" "}
            <select
              className={`border-0 px-2 py-2 w-1/2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none ease-linear transition-all duration-150`}
              value={selectedMonth}
              onChange={handleChange}
            >
              {[...Array(12).keys()].map((index) => (
                <option key={index} value={index}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "short",
                  })}
                </option>
              ))}
            </select>
            - Year: {new Date().getFullYear()}
          </div>
        </div>
      </div> 

      <div
        className={`flex bg-white justify-center ${
          false ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {false ? (
          <Loader />
        ) : (
          <div className="px-3">
            <div className="bg-white border-b-2 max-w-full"></div>
            <table className="max-w-full flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
              <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td scope="col" className="p-1 text-xs">
                    <div className="flex items-center"></div>
                  </td>

                  <td
                    scope="col"
                    className="p-1 text-xs flex items-center justify-between"
                  >
                    <div>Day</div> <FaArrowRightLong />
                  </td>
                  {dates.map((date, index) => (
                    <td key={index} scope="col" className="text-xs p-1  ">
                      <div className="flex items-center">
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td scope="col" className="p-1 text-xs">
                    <div className="flex items-center">Name</div>
                  </td>
                  <td
                    scope="col"
                    className="text-xs p-1 flex items-center gap-2 justify-between"
                  >
                    <div>Date </div>
                    <FaArrowRightLong />
                  </td>

                  {dates.map((date, index) => (
                    <td
                      key={index}
                      scope="col"
                      className="text-xs border-b-2 p-1"
                    >
                      <div className="flex items-center">
                        {new Date(date).getDate()}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendances?.length === 0 && users?.length === 0 ? (
                  <tr>
                    <td className="text-center py-5" colSpan={dates.length + 2}>
                      No data found
                    </td>
                  </tr>
                ) : (
                  users?.map((user) => (
                    <tr
                      key={user.email}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="p-2 whitespace-nowrap capitalize dark:text-white">
                        {user.username}
                      </td>
                      <td className="p-2 whitespace-nowrap capitalize dark:text-white">
                        --
                      </td>

                      {dates.map((date, index) => {
                        const currentDateString = convertToMySQLDateFormat(date);
                        const isSunday = new Date(date).getDay() === 0;
                        const attendanceRecord = attendances?.find(
                          (record) =>
                            record.user_id === user.user_id &&
                            record.date === currentDateString
                        );
                     
                        
                        const isPresent = attendanceRecord?.status === "present";
                        if(isPresent){
                            console.log(attendanceRecord.date)
                        }
                        const isAbsent = attendanceRecord?.status === "absent";
                        const reason = isAbsent ? attendanceRecord?.reason : "";

                        return (
                          <td
                            key={index}
                            className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {isSunday ? (
                              <FaBan className="text-gray-400 " />
                            ) : isPresent ? (
                              <FaCheck className="text-green-700 cursor-pointer" />
                            ) : isAbsent ? (
                              <div>
                                <TbUserCancel className="text-blue-700 cursor-pointer" />
                                <p>{reason}</p>
                              </div>
                            ) : (
                              <FaRegSquare className="text-gray-700 cursor-pointer" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default AttendanceReport;
