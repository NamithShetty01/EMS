
const UnauthorizedPage = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full">
          <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
          <p className="text-lg text-gray-700 mb-6">
            You don’t have permission to view this page.
          </p>
          <a
            href="/"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  };
  
  export default UnauthorizedPage;
  