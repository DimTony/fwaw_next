import { useEffect, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import ContactDetailsForm from "../FormComponents/ContactDetails";
import AboutYouForm from "../FormComponents/AboutYou";
import LegalsAndMedicalForm from "../FormComponents/LegalAndMedical";
import PhotosAndVideoForm from "../FormComponents/PhotosAndVideo";

export default function RegistrationForm({
  applicationData,
  contactDetailsProgress,
  aboutYouProgress,
  legalsAndMedicalProgress,
  photosAndVideoProgress,
  handleChange,
  handleSave,
  handleNext,
  handleSubmit,
  isLastStep,
  isFormComplete,
  currentStep,
  setCurrentStep,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate checking for token and fetching data
      const token = localStorage.getItem("token");
      if (token) {
        // Fetch data from the database
        try {
          const response = await fetch("/api/getUserData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setApplicationData(data); // Set retrieved data
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full px-10 flex flex-col items-center">
        <p className="text-2xl font-bold mb-4">Complete Your Application</p>

        {/* <ProgressBar progress={contactDetailsProgress} />
        <ProgressBar progress={aboutYouProgress} />
        <ProgressBar progress={legalsAndMedicalProgress} />
        <ProgressBar progress={photosAndVideoProgress} /> */}

        <div className="w-full flex flex-col md:flex-row gap-4 mb-6">
          <ProgressBar progress={contactDetailsProgress} className="md:w-1/4" />
          <ProgressBar progress={aboutYouProgress} className="md:w-1/4" />
          <ProgressBar
            progress={legalsAndMedicalProgress}
            className="md:w-1/4"
          />
          <ProgressBar progress={photosAndVideoProgress} className="md:w-1/4" />
        </div>

        {/* Replace this with your actual form with pre-filled data */}
        {currentStep === 0 && (
          <ContactDetailsForm
            applicationData={applicationData}
            handleChange={handleChange}
            handleSave={handleSave}
            handleNext={handleNext}
          />
        )}
        {currentStep === 1 && (
          <AboutYouForm
            applicationData={applicationData}
            handleChange={handleChange}
            handleSave={handleSave}
            handleNext={handleNext}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 2 && (
          <LegalsAndMedicalForm
            applicationData={applicationData}
            handleChange={handleChange}
            handleSave={handleSave}
            handleNext={handleNext}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 3 && (
          <PhotosAndVideoForm
            applicationData={applicationData}
            handleChange={handleChange}
            handleSave={handleSave}
            handleNext={handleNext}
            setCurrentStep={setCurrentStep}
            isFormComplete={isFormComplete}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
}
