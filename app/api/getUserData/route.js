import connectDB from "@/app/lib/connectDB";
import Application from "@/app/models/Application";

export default async function handler(req, res) {
  await connectDB(); // Ensure the database connection is established

  // Your route logic here
  if (req.method === "GET") {
    // For example, fetching application data
    const applications = await Application.find({});
    res.status(200).json({ success: true, data: applications });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
