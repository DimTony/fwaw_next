export const calculateContactDetailsProgress = ({ applicationData }) => {
  // Define the fields that count for 4% each
  const basicFields = [
    applicationData.firstName,
    applicationData.lastName,
    applicationData.email,
    applicationData.confirmEmail,
    applicationData.password,
    applicationData.confirmPassword,
    applicationData.addressLine1,
    applicationData.city,
    applicationData.state,
    applicationData.zipcode,
    applicationData.mobileNumber,
    applicationData.workNumber,
    applicationData.gender,
    applicationData.age,
    applicationData.day,
    applicationData.month,
    applicationData.year,
    applicationData.isAustralianCitizen,
    applicationData.whereYouHeardSelect,
    applicationData.occupation,
  ];

  // Define the fields that count for 12% each
  //   const booleanFields = [
  //     applicationData.readTandC,
  //     applicationData.readPrivacyPolicy,
  //   ];

  // Calculate progress
  const totalBasicFields = basicFields.length;
  //   const totalBooleanFields = booleanFields.length;

  const filledBasicFields = basicFields.filter(
    (field) => field !== "" && field !== false
  ).length;
  //   const filledBooleanFields = booleanFields.filter(
  //     (field) => field === true
  //   ).length;

  const basicFieldProgress = (filledBasicFields / totalBasicFields) * 100;
  //   const booleanFieldProgress = (filledBooleanFields / totalBooleanFields) * 12;

  // Total progress
  //   return basicFieldProgress + booleanFieldProgress;
  return basicFieldProgress;
};

export const calculateAboutYouProgress = ({ applicationData }) => {
  // Define the fields that count for 4% each
  const basicFields = [
    applicationData.whereisYourFarm,
    applicationData.kindOfFarm,
    applicationData.selfDescription,
    applicationData.whyApplying,
    applicationData.beenMarried,
    applicationData.haveKids,
    applicationData.wantKids,
    applicationData.facebookHandle,
    applicationData.instagramHandle,
    applicationData.tiktokHandle,
  ];

  // Calculate progress
  const totalBasicFields = basicFields.length;

  const filledBasicFields = basicFields.filter(
    (field) => field !== "" && field !== false
  ).length;

  const basicFieldProgress = (filledBasicFields / totalBasicFields) * 10;

  // Total progress
  return basicFieldProgress;
};

export const calculateLegalsAndMedicalProgress = ({ applicationData }) => {
  // Define the fields that count for 4% each
  const basicFields = [
    applicationData.isBeingInvestigated,
    applicationData.anyAllergies,
    applicationData.anyMedicalConditions,
    applicationData.anyHereditaryConditions,
    applicationData.isDrugOrAlcoholDep,
  ];

  // Calculate progress
  const totalBasicFields = basicFields.length;

  const filledBasicFields = basicFields.filter(
    (field) => field !== "" && field !== false
  ).length;

  const basicFieldProgress = (filledBasicFields / totalBasicFields) * 20;

  // Total progress
  return basicFieldProgress;
};

export const calculatePhotosAndVideoProgress = ({ applicationData }) => {
  // Define the fields that count for 4% each
  const basicFields = [
    applicationData.frontHeadshotPhoto,
    applicationData.sideHeadshotPhoto,
    applicationData.fullFrontPhoto,
    applicationData.fullSidePhoto,
    applicationData.video,
  ];

  // Calculate progress
  const totalBasicFields = basicFields.length;

  const filledBasicFields = basicFields.filter(
    (field) => field !== "" && field !== false
  ).length;

  const basicFieldProgress = (filledBasicFields / totalBasicFields) * 20;

  // Total progress
  return basicFieldProgress;
};
