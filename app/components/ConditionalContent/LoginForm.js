export default function LoginForm({ setActiveContent, setView }) {
  const handleLoginSuccess = () => {
    setView("savedApplication");
  };
  return (
    <div className="w-full px-10 flex flex-col items-center" id="login-form">
      <div className="flex items-center justify-between w-full mb-3">
        <button
          className="bg-teal-200 p-2 rounded-md hover:bg-teal-500 hover:text-white"
          onClick={() => setActiveContent("welcome")}
        >
          Cancel
        </button>
        <p className="text-2xl font-bold flex-1 text-center">
          Login to Your Application
        </p>
      </div>
      {/* Replace this with your actual login form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginSuccess(); // Simulate login success
        }}
        className="w-full max-w-md"
      >
        <input
          type="email"
          placeholder="Username (Email)"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2  border border-gray-300 rounded"
          required
        />
        <div className="flex justify-end mb-4">
          <button className="text-blue-700 hover:text-black">
            Forgot password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
