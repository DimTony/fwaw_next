import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const db = await connectToDatabase();
    const applicationsCollection = db.collection("Application");

    // Find the application
    const application = await applicationsCollection.findOne({ email });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
      password,
      application.password
    );

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Create a token
    const token = jwt.sign(
      { applicationId: application._id, email: application.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Fetch matching data for the authenticated application
    const applicationData = await applicationsCollection.findOne(
      { _id: application._id },
      { projection: { password: 0 } } // Exclude password from the returned data
    );

    return NextResponse.json({
      message: "Authentication successful",
      token,
      applicationData,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
