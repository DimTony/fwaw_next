import { useEffect, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import ContactDetailsForm from "../FormComponents/ContactDetails";
import AboutYouForm from "../FormComponents/AboutYou";
import LegalsAndMedicalForm from "../FormComponents/LegalAndMedical";
import PhotosAndVideoForm from "../FormComponents/PhotosAndVideo";
import HashLoader from "react-spinners/HashLoader";

export default function RegistrationForm({
  applicationData,
  errors,
  setApplicationData,
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
    const fetchData = async () => {
      // Simulate checking for token and fetching data
      const token = localStorage.getItem("fwawToken");
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
        {/* <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div> */}
        <HashLoader />
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:px-1 flex flex-col items-center">
        <p className="lg:text-2xl font-bold mb-1">Complete Your Application</p>

        {/* <ProgressBar progress={contactDetailsProgress} />
        <ProgressBar progress={aboutYouProgress} />
        <ProgressBar progress={legalsAndMedicalProgress} />
        <ProgressBar progress={photosAndVideoProgress} /> */}

        <div className="w-full flex flex-col justify-evenly md:flex-row lg:gap-4 gap-2 mb-1 ">
          <div className=" w-full flex flex-col items-start">
            <p
              className={`${
                currentStep === 0 ? "font-bold text-blue-700" : ""
              }`}
            >
              Contact Details
            </p>
            <ProgressBar
              progress={contactDetailsProgress}
              className="md:w-1/4"
            />
          </div>
          <div className=" w-full flex flex-col items-start">
            <p
              className={`${
                currentStep === 1 ? "font-bold text-blue-700" : ""
              }`}
            >
              About You
            </p>
            <ProgressBar progress={aboutYouProgress} className="md:w-1/4" />
          </div>
          <div className="w-full flex flex-col items-start">
            <p
              className={`${
                currentStep === 2 ? "font-bold text-blue-700" : ""
              }`}
            >
              Legals & Medical
            </p>
            <ProgressBar
              progress={legalsAndMedicalProgress}
              className="md:w-1/4"
            />
          </div>
          <div className=" w-full flex flex-col items-start">
            <p
              className={`${
                currentStep === 3 ? "font-bold text-blue-700" : ""
              }`}
            >
              Photos & Video
            </p>
            <ProgressBar
              progress={photosAndVideoProgress}
              className="md:w-1/4"
            />
          </div>
        </div>

        <div className="red p-3 rounded-2xl glass-morphism">
          {/* Replace this with your actual form with pre-filled data */}
          {currentStep === 0 && (
            <ContactDetailsForm
              applicationData={applicationData}
              errors={errors}
              setApplicationData={setApplicationData}
              handleChange={handleChange}
              handleSave={handleSave}
              handleSaveClick={handleSaveClick}
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
      </div>
    </>
  );
}
