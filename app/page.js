"use client";

import Image from "next/image";
import { useState } from "react";
import Welcome from "./components/ConditionalContent/Welcome";
import LoginForm from "./components/ConditionalContent/LoginForm";
import RegistrationForm from "./components/ConditionalContent/RegistrationForm";
import Footer from "./components/Footer";
import {
  calculateAboutYouProgress,
  calculateContactDetailsProgress,
  calculateLegalsAndMedicalProgress,
  calculatePhotosAndVideoProgress,
} from "./utils/progressCalculation";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeContent, setActiveContent] = useState("welcome");
  const [applicationData, setApplicationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    mobileNumber: "",
    workNumber: "",
    gender: "",
    age: "",
    day: "",
    month: "",
    year: "",
    isAustralianCitizen: "",
    whereYouHeardSelect: "",
    whereYouHeardOther: "",
    occupation: "",
    readTandC: false,
    readPrivacyPolicy: false,
    whereisYourFarm: "",
    kindOfFarm: "",
    selfDescription: "",
    whyApplying: "",
    beenMarried: "",
    haveKids: "",
    wantKids: "",
    facebookHandle: "",
    instagramHandle: "",
    tiktokHandle: "",
    isBeingInvestigated: "",
    anyAllergies: "",
    anyMedicalConditions: "",
    anyHereditaryConditions: "",
    isDrugOrAlcoholDep: "",
    frontHeadshotPhoto: "",
    sideHeadshotPhoto: "",
    fullFrontPhoto: "",
    fullSidePhoto: "",
    video: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const contactDetailsProgress = calculateContactDetailsProgress({
    applicationData,
  });

  const aboutYouProgress = calculateAboutYouProgress({
    applicationData,
  });

  const legalsAndMedicalProgress = calculateLegalsAndMedicalProgress({
    applicationData,
  });

  const photosAndVideoProgress = calculatePhotosAndVideoProgress({
    applicationData,
  });

  const validateFormSave = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    };

    // Check if email fields are empty
    if (!applicationData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!applicationData.confirmEmail) {
      newErrors.confirmEmail = "Matching Email is required";
      isValid = false;
    }

    // Check if passwords are empty
    if (!applicationData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!applicationData.confirmPassword) {
      newErrors.confirmPassword = "Matching Password is required";
      isValid = false;
    }

    // Check if email fields match
    if (
      applicationData.email &&
      applicationData.confirmEmail &&
      applicationData.email !== applicationData.confirmEmail
    ) {
      newErrors.email = "Emails do not match";
      newErrors.confirmEmail = "Emails do not match";
      isValid = false;
    }

    // Check if password fields match
    if (
      applicationData.password &&
      applicationData.confirmPassword &&
      applicationData.password !== applicationData.confirmPassword
    ) {
      newErrors.password = "Passwords do not match";
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    switch (type) {
      case "checkbox":
        // Handle checkbox inputs
        if (name === "gender") {
          // Handle gender checkboxes
          if (checked) {
            setApplicationData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          } else {
            setApplicationData((prevData) => ({
              ...prevData,
              [name]: "", // Clear the gender field if unchecked
            }));
          }
        } else {
          // Handle other checkboxes if needed
          setApplicationData((prevData) => ({
            ...prevData,
            [name]: checked,
          }));
        }
        break;

      case "select-one":
        // Handle select dropdown inputs
        setApplicationData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        break;

      case "date":
        // Handle date inputs
        setApplicationData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        break;

      default:
        // Handle text and other input types
        setApplicationData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        break;
    }
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log("Saving data...", applicationData);
    // You might want to save the data to a database or local storage
  };

  // Handle Save button click
  const handleSaveClick = () => {
    if (!validateFormSave()) {
      const firstErrorField = Object.keys(errors).find(
        (key) => errors[key] !== ""
      );
      if (firstErrorField) {
        document
          .getElementsByName(firstErrorField)[0]
          .scrollIntoView({ behavior: "smooth", block: "center" });
      }
      toast.error("Please complete the required fields before saving.");
      return;
    }

    handleSave();
  };

  const handleNext = () => {
    if (!validateFormSave()) {
      const firstErrorField = Object.keys(errors).find(
        (key) => errors[key] !== ""
      );
      if (firstErrorField) {
        document
          .getElementsByName(firstErrorField)[0]
          .scrollIntoView({ behavior: "smooth", block: "center" });
      }
      toast.error("Please complete the required fields before saving.");
      return;
    }
    handleSave(); // Save data before moving to the next step
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log("Submitting data...", applicationData);
  };

  const isLastStep = currentStep === 3;
  const isFormComplete = () => {
    // Implement your logic to check if the form is complete
    return Object.values(applicationData).every(
      (value) => value !== "" && value !== false
    );
  };

  const renderContent = () => {
    switch (activeContent) {
      case "welcome":
        return <Welcome />;
      case "login":
        return (
          <LoginForm
            setActiveContent={setActiveContent}
            applicationData={applicationData}
            setApplicationData={setApplicationData}
            errors={errors}
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
      case "application":
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
      default:
        return <Welcome />;
    }
  };

  return (
    <>
      <main className="flex max-h-screen w-full flex-col items-center p-2 lg:overflow-hidden">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col lg:flex-row  mb-2">
          <div className="flex w-full items-end justify-center dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="/"
              rel="noopener noreferrer"
            >
              <Image
                src="/FWAWTextLogo.png"
                alt="FWAW Text Logo"
                width={200} // Provide the actual width you need
                height={200} // Provide the actual height you need
              />
            </a>
          </div>
          {activeContent === "welcome" && (
            <div className="flex flex-col gap-3 ">
              <button
                // onClick={handleApplyClick}
                onClick={() => setActiveContent("application")}
                className="flex justify-center text-black bg-home-button-gradient rounded-xl p-2 hover:text-black hover:font-bold hover:bg-gradient-to-r hover:from-blue-400 hover:to-white"
              >
                Apply
              </button>

              <button
                // onClick={handleCompleteApplicationClick}
                onClick={() => setActiveContent("login")}
                className="flex justify-center text-black border border-gray-200 bg-gradient-to-r from-blue-400 to-white rounded-xl p-2 hover:text-black hover:font-bold hover:bg-home-button-gradient"
              >
                Complete Saved Application
              </button>
            </div>
          )}
          {activeContent === "application" && (
            <button
              // onClick={handleApplyClick}
              onClick={() => setActiveContent("welcome")}
              className="flex justify-center text-black bg-cancel-button-gradient rounded-xl p-2 hover:text-black hover:font-bold hover:bg-gradient-to-r hover:from-blue-400 hover:to-white"
            >
              Cancel
            </button>
          )}
        </div>

        <div className="flex justify-center w80view">{renderContent()}</div>

        {activeContent === "welcome" && <Footer />}
      </main>
      <ToastContainer />
    </>
  );
}
