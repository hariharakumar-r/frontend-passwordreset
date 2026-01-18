import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.name || 'User'}! 🎉
            </h2>
            <p className="text-gray-600 mt-2">{user?.email}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
              <p className="text-4xl font-bold">12</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
              <p className="text-4xl font-bold">48</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Pending Items</h3>
              <p className="text-4xl font-bold">5</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Successfully logged in
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Profile updated
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                Password changed recently
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
