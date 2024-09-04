// /app/api/getUserData/route.js

import connectDB from "@/app/lib/connectDB";
import Application from "@/app/models/Application";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const token = req.headers.get("Authorization")?.split(" ")[1]; // Use .get for headers in Next.js 13

  if (!token) {
    return NextResponse.json(
      { error: "Auth token not found" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const applicationData = await Application.findOne({ email: decoded.email });

    if (!applicationData) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const newToken = jwt.sign(
      { applicationId: applicationData._id, email: applicationData.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Authentication successful",
      token: newToken, // Include if you regenerated the token
      applicationData,
    });
  } catch (error) {
    console.error("Error fetching application using token", error);

    let status = 500;
    let errorMessage = "Internal server error";

    if (error.name === "TokenExpiredError") {
      status = 401;
      errorMessage = "Token expired";
    } else if (error.name === "JsonWebTokenError") {
      status = 401;
      errorMessage = "Invalid token";
    }

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
