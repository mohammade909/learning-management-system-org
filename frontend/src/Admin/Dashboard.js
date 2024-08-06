import { useState, useEffect } from 'react';
import { FaUserFriends, FaChartBar, FaCog, FaGraduationCap, FaLifeRing, FaBook, FaClipboardList } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Fetch the total users, courses, and enrollments from your backend or any other source
    // Example: 
    // fetch('/api/users/total').then(response => response.json()).then(data => setTotalUsers(data.totalUsers));
    // fetch('/api/courses/total').then(response => response.json()).then(data => setTotalCourses(data.totalCourses));
    // fetch('/api/enrollments/total').then(response => response.json()).then(data => setTotalEnrollments(data.totalEnrollments));
    
    // For demonstration, we'll set dummy counts
    setTotalUsers(123);
    setTotalCourses(45);
    setTotalEnrollments(678);

    // Set dummy chart data
    setChartData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Enrollments',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Courses',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Users',
          data: [12, 42, 33, 44, 55, 66, 77],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        }
      ],
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5">
        <div className="bg-orange-100/70 p-3 shadow flex items-center space-x-3">
          <FaGraduationCap className="h-6 w-6 text-orange-500" />
          <div>
            <h2 className="text-lg font-semibold">Dashboard Overview</h2>
            <p className="text-sm text-gray-600">Get insights into your platform's usage and performance.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-green-100/80 shadow p-3 flex items-center space-x-3">
            <FaUserFriends className="h-6 w-6 text-green-500" />
            <div>
              <h3 className="text-md font-semibold">Users</h3>
              <p className="text-sm text-gray-600">Manage all users.</p>
              <p className="text-lg font-bold text-gray-800">{totalUsers}</p>
            </div>
          </div>
          <div className="bg-blue-100/80 shadow p-3 flex items-center space-x-3">
            <FaBook className="h-6 w-6 text-blue-500" />
            <div>
              <h3 className="text-md font-semibold">Courses</h3>
              <p className="text-sm text-gray-600">Manage all courses.</p>
              <p className="text-lg font-bold text-gray-800">{totalCourses}</p>
            </div>
          </div>
          <div className="bg-teal-100/80 shadow p-3 flex items-center space-x-3">
            <FaClipboardList className="h-6 w-6 text-teal-500" />
            <div>
              <h3 className="text-md font-semibold">Enrollments</h3>
              <p className="text-sm text-gray-600">View all enrollments.</p>
              <p className="text-lg font-bold text-gray-800">{totalEnrollments}</p>
            </div>
          </div>
          <div className="bg-yellow-100/80 shadow p-3 flex items-center space-x-3">
            <FaLifeRing className="h-6 w-6 text-yellow-500" />
            <div>
              <h3 className="text-md font-semibold">Support</h3>
              <p className="text-sm text-gray-600">Get help and support.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5">
        <h2 className="text-lg font-semibold mb-3">Enrollment Trends</h2>
        {chartData && chartData.labels && chartData.datasets ? (
          <Line data={chartData} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
