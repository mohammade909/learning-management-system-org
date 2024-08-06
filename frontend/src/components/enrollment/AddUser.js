import React, { useState, useEffect } from "react";
import Loader from "../../BaseFiles/Loader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useFormik } from "formik";
import { initialValues } from "../../formik/user/initialValues";
import { addUserValidationSchema } from "../../formik/user/userValidationSchema";
import { clearErrors, clearMessage } from "../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../actions/user";
import { useParams } from "react-router-dom";
import { getCourses } from "../../actions/course";
import TabMenus from "../../BaseFiles/TabMenus";
const tabs = [
  { name: "Add Instructor", href: "/add/instructor" },
  { name: "Add Student", href: "/add/child" },
  { name: "Add Parent", href: "/add/parent" },
];

const AddUser = () => {
  const { loading, error, message } = useSelector((state) => state.users);
  const { courses } = useSelector((state) => state.courses);
  const [seletedCourse, setSelectedCourse] = useState();
  const [rotate, setRotate] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { role } = useParams();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: addUserValidationSchema,
    onSubmit: async (values) => {
      values.user_type = role;
      console.log(role);
      if (role === "child") {
        values.course_amount = seletedCourse.course_price;
      }
      console.log(values);
      dispatch(createUser(values));
    },
  });

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
    if (message) {
      formik.resetForm();
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [error, message, formik, role]);
  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    formik.handleChange(event);
    const selectedCourseData = courses.find(
      (course) => Number(course.course_id) == courseId
    );
    setSelectedCourse(selectedCourseData);
  };
  return (
    <>
      <TabMenus tabs={tabs} />
      <section className=" w-full md:max-w-5xl m-auto shadow-lg px-5 border mt-3 ">
        {message && <SuccessAlert message={message} />}
        {error && <ErrorAlert error={error} />}
        <div
          className={`flex bg-white justify-center ${
            loading ? "h-[560px] items-center" : "h-full"
          }`}
        >
          {loading ? (
            <Loader />
          ) : (
            <div className="w-full mx-auto mt-10 bg-white">
              <div className="flex-auto px-4 py-10 pt-0">
                <form className="py-3" onSubmit={formik.handleSubmit}>
                  <h6 className="text-gray-600 text-sm px-2 mt-3 mb-6 font-bold uppercase">
                    {role} Information
                    <div className="h-1 bg-gray-700 w-16 my-3"></div>
                  </h6>
                  <div className="flex flex-wrap mb-5">
                    <div className="w-full lg:w-3/12 px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                          htmlFor="username"
                        >
                          User Name
                        </label>
                        <input
                          id="username"
                          type="text"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                            formik.touched.username && formik.errors.username
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {formik.touched.username && formik.errors.username && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.username}
                        </p>
                      )}
                    </div>
                    <div className="w-full lg:w-3/12 px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                          htmlFor="first_name"
                        >
                          First Name
                        </label>
                        <input
                          id="first_name"
                          type="text"
                          value={formik.values.first_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                            formik.touched.first_name &&
                            formik.errors.first_name
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {formik.touched.first_name &&
                        formik.errors.first_name && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.first_name}
                          </p>
                        )}
                    </div>
                    <div className="w-full lg:w-3/12 px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                          htmlFor="last_name"
                        >
                          Last Name
                        </label>
                        <input
                          id="last_name"
                          type="text"
                          value={formik.values.last_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                            formik.touched.last_name && formik.errors.last_name
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {formik.touched.last_name && formik.errors.last_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.last_name}
                        </p>
                      )}
                    </div>
                    <div className="w-full lg:w-3/12 px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="text"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                            formik.touched.email && formik.errors.email
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300 py-3" />
                  <div className="flex flex-wrap mb-16">
                    {role === "child" ? (
                      <>
                        <div className="w-full lg:w-3/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                              htmlFor="date_of_birth"
                            >
                              Date of Birth
                            </label>
                            <input
                              id="date_of_birth"
                              type="date"
                              value={formik.values.date_of_birth}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                                formik.touched.date_of_birth &&
                                formik.errors.date_of_birth
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.date_of_birth &&
                            formik.errors.date_of_birth && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.date_of_birth}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-3/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                              htmlFor="grade_level"
                            >
                              Grade Level
                            </label>
                            <input
                              id="grade_level"
                              type="text"
                              value={formik.values.grade_level}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                                formik.touched.grade_level &&
                                formik.errors.grade_level
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.grade_level &&
                            formik.errors.grade_level && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.grade_level}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-3/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                              htmlFor="parent_id"
                            >
                              Parent id
                            </label>
                            <input
                              id="parent_id"
                              type="text"
                              value={formik.values.parent_id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                                formik.touched.parent_id &&
                                formik.errors.parent_id
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.parent_id &&
                            formik.errors.parent_id && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.parent_id}
                              </p>
                            )}
                        </div>
                      </>
                    ) : role === "instructor" ? (
                      <>
                        <div className="w-full lg:w-3/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                              htmlFor="department"
                            >
                              Department
                            </label>
                            <input
                              id="department"
                              type="text"
                              value={formik.values.department}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                                formik.touched.department &&
                                formik.errors.department
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.department &&
                            formik.errors.department && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.department}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-3/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                              htmlFor="qualification"
                            >
                              Qualification
                            </label>
                            <input
                              id="qualification"
                              type="text"
                              value={formik.values.qualification}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                                formik.touched.qualification &&
                                formik.errors.qualification
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.qualification &&
                            formik.errors.qualification && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.qualification}
                              </p>
                            )}
                        </div>
                      </>
                    ) : role === "parent" ? (
                      <>
                        <div className="w-full lg:w-3/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                              htmlFor="phone_number"
                            >
                              Phone number
                            </label>
                            <input
                              id="phone_number"
                              type="tel"
                              value={formik.values.phone_number}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                                formik.touched.phone_number &&
                                formik.errors.phone_number
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.phone_number &&
                            formik.errors.phone_number && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.phone_number}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-3/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                              htmlFor="address"
                            >
                              Address
                            </label>
                            <input
                              id="address"
                              type="text"
                              value={formik.values.address}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                                formik.touched.address && formik.errors.address
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.address && formik.errors.address && (
                            <p className="text-red-500 text-xs mt-1">
                              {formik.errors.address}
                            </p>
                          )}
                        </div>
                      </>
                    ) : null}

                    <div className="w-full lg:w-3/12 px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={showPass ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                              formik.touched.password && formik.errors.password
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                          <span
                            onClick={() => setShowPass(!showPass)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
                          >
                            {!showPass ? (
                              <FaRegEye
                                className="h-4 w-4 text-gray-600"
                                aria-hidden="true"
                              />
                            ) : (
                              <FaRegEyeSlash
                                className="h-4 w-4 text-gray-600"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </div>
                      </div>
                      {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.password}
                        </p>
                      )}
                    </div>
                  </div>
                  {role === "child" && (
                    <div className="flex flex-wrap mb-5">
                      <div className="w-full lg:w-3/12 px-2">
                        <div className="relative w-full mb-3">
                          <label
                            className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                            htmlFor="course_id"
                          >
                            Select Course
                          </label>
                          <select
                            id="course_id"
                            type="text"
                            value={formik.values.course_id}
                            onChange={handleCourseChange}
                            onBlur={formik.handleBlur}
                            className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                              formik.touched.course_id &&
                              formik.errors.course_id
                                ? "border-red-500"
                                : ""
                            }`}
                          >
                            <option value="">Select Course</option>
                            {courses?.map((course) => (
                              <option
                                key={course.course_id}
                                value={course.course_id}
                              >
                                {course.course_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="w-full lg:w-3/12 px-2">
                        <div className="relative w-full mb-3">
                          <label
                            className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                            htmlFor="fee_deposit"
                          >
                            Fee deposit
                          </label>
                          <input
                            id="fee_deposit"
                            type="number"
                            value={formik.values.fee_deposit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                              formik.touched.fee_deposit &&
                              formik.errors.fee_deposit
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        </div>
                      </div>
                      {/* <div className="w-full lg:w-3/12 px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                          htmlFor="last_name"
                        >
                          Last Name
                        </label>
                        <input
                          id="last_name"
                          type="text"
                          value={formik.values.last_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                            formik.touched.last_name && formik.errors.last_name
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {formik.touched.last_name && formik.errors.last_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.last_name}
                        </p>
                      )}
                    </div>
                    <div className="w-full lg:w-3/12 px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="text"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`border-0 px-3 py-2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 ${
                            formik.touched.email && formik.errors.email
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>  */}
                    </div>
                  )}
                  <hr className="mt-6 border-b-1 border-blueGray-300 py-3" />

                  <div className="mx-3 flex justify-start">
                    <button
                      className="bg-amber-500 text-white active:bg-yellow-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={formik.resetForm}
                    >
                      Reset Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AddUser;
