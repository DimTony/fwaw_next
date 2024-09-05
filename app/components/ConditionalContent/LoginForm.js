import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import RegistrationForm from "./RegistrationForm";
import { toast } from "react-toastify";

export default function LoginForm({
  setActiveContent,
  applicationData,
  setApplicationData,
  setView,
  errors,
  contactDetailsProgress,
  aboutYouProgress,
  legalsAndMedicalProgress,
  photosAndVideoProgress,
  handleChange,
  handleSave,
  handleSaveClick,
  handleNext,
  handleSubmit,
  isLastStep,
  isFormComplete,
  validateFormSave,
  currentStep,
  setCurrentStep,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("fwawToken");

      if (!token) {
        setTimeout(() => setLoading(false), 3000); // Ensure at least 3 seconds of loading
        return;
      }

      try {
        const response = await axios.post(
          "/api/getUserData",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.applicationData) {
          localStorage.setItem("fwawToken", response.data.token);
          setApplicationData(data.applicationData);
          console.log("data here", data.applicationData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (err.response && err.response.data && err.response.data.error) {
          toast.error(err.response.data.error);
          // setError(err.response.data.error);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
          // setError("An unexpected error occurred. Please try again.");
        }
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
      // const response = await fetch("/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(credentials),
      // });

      const response = await axios.post(
        "/api/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.applicationData) {
        localStorage.setItem("fwawToken", data.token);
        setApplicationData(data.applicationData);
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

  const handleLoginClick = async (e) => {
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

  if (
    applicationData?.email &&
    applicationData?.confirmEmail &&
    applicationData?.password &&
    applicationData?.confirmPassword
  ) {
    return (
      <RegistrationForm
        applicationData={applicationData}
        errors={errors}
        setApplicationData={setApplicationData}
        contactDetailsProgress={contactDetailsProgress}
        aboutYouProgress={aboutYouProgress}
        legalsAndMedicalProgress={legalsAndMedicalProgress}
        photosAndVideoProgress={photosAndVideoProgress}
        handleChange={handleChange}
        handleSave={handleSave}
        handleSaveClick={handleSaveClick}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        isLastStep={isLastStep}
        isFormComplete={isFormComplete}
        validateFormSave={validateFormSave}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    );
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
      <form onSubmit={handleLoginClick} className="w-full max-w-md">
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
