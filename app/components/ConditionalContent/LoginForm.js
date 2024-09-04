import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import RegistrationForm from "./RegistrationForm";

export default function LoginForm({ setActiveContent, setView }) {
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("fwawToken");

      if (!token) {
        setTimeout(() => setLoading(false), 3000); // Ensure at least 3 seconds of loading
        return;
      }

      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.data) {
          setApplicationData(data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        // Ensure the loading spinner shows for at least 3 seconds
        setTimeout(() => setLoading(false), 3000);
      }
    };

    checkToken();
  }, []);

  const handleLogin = async (credentials) => {
    setLoading(true);
    const startTime = Date.now();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("fwawToken", data.token);
        setApplicationData(data.userData || {}); // Use empty object if userData is null or undefined
      } else {
        console.error("Login failed:", data.message);
        setApplicationData(null);
      }
    } catch (error) {
      console.error("Login error:", error);
      setApplicationData(null);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 3000 - elapsedTime;

      // Ensure the loading spinner shows for at least 3 seconds
      setTimeout(() => setLoading(false), Math.max(remainingTime, 0));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const credentials = {
      email: form.email.value,
      password: form.password.value,
    };
    await handleLogin(credentials);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader />
      </div>
    );
  }

  if (applicationData) {
    return <RegistrationForm applicationData={applicationData} />;
  }

  return (
    <div
      className="w-80 px-10 flex flex-col items-center glass-morphism"
      id="login-form"
    >
      <div className="flex items-center justify-between w-full mb-3 gap-2">
        <button
          className="bg-teal-200 text-xs p-1 rounded-md hover:bg-teal-500 hover:text-white"
          onClick={() => setActiveContent("welcome")}
        >
          Cancel
        </button>
        <p className="lg:text-base text-sm font-bold flex-1 text-center">
          Login to Your Application
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="email"
          name="email"
          placeholder="Username (Email)"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <div className="flex justify-end mb-4">
          <button type="button" className="text-blue-700 hover:text-black">
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
