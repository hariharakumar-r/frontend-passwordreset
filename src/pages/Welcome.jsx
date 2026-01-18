import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
            <p className="text-gray-600">Secure Password Reset Flow Demo</p>
          </div>
          
          <div className="space-y-4">
            <Link
              to="/login"
              className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block w-full bg-white text-indigo-600 py-3 px-4 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
