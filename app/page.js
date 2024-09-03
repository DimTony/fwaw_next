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

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setApplicationData((prevState) => ({
  //     ...prevState,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    switch (type) {
      case "checkbox":
        // Handle checkbox inputs
        setApplicationData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
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

  const handleNext = () => {
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
        return <LoginForm setActiveContent={setActiveContent} />;
      case "application":
        return (
          <RegistrationForm
            applicationData={applicationData}
            setApplicationData={setApplicationData}
            contactDetailsProgress={contactDetailsProgress}
            aboutYouProgress={aboutYouProgress}
            legalsAndMedicalProgress={legalsAndMedicalProgress}
            photosAndVideoProgress={photosAndVideoProgress}
            handleChange={handleChange}
            handleSave={handleSave}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
            isLastStep={isLastStep}
            isFormComplete={isFormComplete}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
      default:
        return <Welcome />;
    }
  };

  return (
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
              alt="Vercel Logo"
              className="dark:invert"
              width={200}
              height={100}
              priority
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

      <div className="w80view">{renderContent()}</div>

      {activeContent === "welcome" && <Footer />}
    </main>
  );
}
