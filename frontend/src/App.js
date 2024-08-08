import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./Admin/Dashboard";
import PrivateRoute from "./BaseFiles/PrivateRoutes";
import Attendance from "./pages/Attendance";
import AttendanceReport from "./pages/AttendanceReports";
import Coureses from "./pages/Coureses";
import Enrollments from "./pages/Enrollments";
import AddForm from "./components/course/AddForm";
import CoursePreview from "./components/course/CourePreview";
import EditForm from "./components/course/EditForm";
import Theme from "./components/theme/index";
import AddUser from "./components/enrollment/AddUser";
import Users from "./components/enrollment/Users";
import DashboardLayout from "./BaseFiles/DashboardLayout";
import EditUser from "./components/enrollment/EditUser";
import AccessControl from "./AccessControl/Components/AccessControl";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Aboutus from "./pages/About/Aboutus";
import Service from "./pages/Services/Service";
import WebDesgin from "./pages/Course/WebDesgin";
import Faq from "./pages/Course/Faq";
import Register from "./pages/Register";
import ItCourse from "./pages/Course/ItCourse";
import Contact from "./pages/Contact/Contact";
import Certificate from "./Child/Certificate";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./BaseFiles/StudentDashboard";
import Enrollment from "./components/enrollment/Enrollment";
import Reports from "./Child/Reports";
import ScrollToTop from "./BaseFiles/ScollToTop";
import ParentDashboard from "./Parent/ParentDashboard";
import InstructorDashboard from "./instructor/InstructorDashboard";
import CourseList from "./instructor/CourseList";
import Account from "./instructor/Account";
import Notifications from "./Admin/notifications/Notifications";
import CourseView from "./instructor/CourseView";
import TearmsAndConditions from "./components/TearmsAndConditions";
import PrivacyAndPolicy from "./components/PrivacyAndPolicy";
import CreateBlog from "./components/blogs/CreateBlog";
import Blogs from "./components/blogs/Blogs";
import BlogOverview from "./components/blogs/BlogOverview";
function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard/admin" element={<Dashboard />} />
              <Route path="/add/:role" element={<AddUser />} />
              <Route path="/users/:role" element={<Users />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
              <Route path="/attendance/:role" element={<Attendance />} />
              <Route path="/access/permissions" element={<AccessControl />} />
              <Route path="/enrollment/manager" element={<Enrollment />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route
                path="/attendance/reports/:role"
                element={<AttendanceReport />}
              />

              {/* Course Routes */}
              <Route path="/admin/courses" element={<Coureses />} />

              <Route path="/courses/create" element={<AddForm />} />
              <Route
                path="/admin/courses/view/:id"
                element={<CoursePreview />}
              />
              <Route path="/courses/edit/:id" element={<EditForm />} />

              <Route path="/admin/blogs" element={<Blogs />} />

              <Route path="/blogs/create" element={<CreateBlog />} />
              <Route
                path="/admin/blogs/view/:id"
                element={<BlogOverview />}
              />
              {/* course Routes */}
            </Route>

            <Route element={<StudentDashboard />}>
              <Route path="/dashboard/child" element={<Enrollment />} />
              <Route path="/reports" element={<Reports />} />
            </Route>

            <Route element={<ParentDashboard />}>
              <Route path="/dashboard/parent" element={<Enrollment />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
            
            <Route path="/certificate" element={<Certificate />} />

            <Route element={<InstructorDashboard />}>
              <Route path="/dashboard/instructor" element={<Account />} />
              <Route path="/instructor/course-lits" element={<CourseList />} />
              <Route path="/instructor/create" element={<AddForm />} />
              <Route path="/instructor/course/:id" element={<CourseView/>} />
            </Route>
          </Route>

          <Route
            path="/courses"
            element={
              <Theme>
                <Coureses />
              </Theme>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<Layout />}>
            <Route path="/courses/view/:id" element={<CoursePreview />} />
            <Route index element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/WebDesgin" element={<WebDesgin />} />
            <Route path="/Service" element={<Service />} />
            <Route path="/Faq" element={<Faq />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/ItCourse/:name" element={<ItCourse />} />
            <Route path="/privacy-policy" element={<PrivacyAndPolicy />} />
            <Route path="/tearms-conditions" element={<TearmsAndConditions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
