import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    confirmEmail: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    workNumber: { type: String },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    day: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    isAustralianCitizen: { type: String, required: true },
    whereYouHeardSelect: { type: String },
    whereYouHeardOther: { type: String },
    occupation: { type: String, required: true },
    readTandC: { type: Boolean, required: true },
    readPrivacyPolicy: { type: Boolean, required: true },
    whereisYourFarm: { type: String },
    kindOfFarm: { type: String },
    selfDescription: { type: String },
    whyApplying: { type: String },
    beenMarried: { type: String },
    haveKids: { type: String },
    wantKids: { type: String },
    facebookHandle: { type: String },
    instagramHandle: { type: String },
    tiktokHandle: { type: String },
    isBeingInvestigated: { type: String },
    anyAllergies: { type: String },
    anyMedicalConditions: { type: String },
    anyHereditaryConditions: { type: String },
    isDrugOrAlcoholDep: { type: String },
    frontHeadshotPhoto: { type: String },
    sideHeadshotPhoto: { type: String },
    fullFrontPhoto: { type: String },
    fullSidePhoto: { type: String },
    video: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

export default Application;
