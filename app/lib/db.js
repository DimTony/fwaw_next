import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB);
}

// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable to preserve the client across module reloads caused by HMR (Hot Module Replacement)
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, it's safe to create a new client instance
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// export async function connectToDatabase() {
//   try {
//     const client = await clientPromise;
//     return client.db(process.env.MONGODB_DB); // Return the database instance
//   } catch (error) {
//     console.error("Failed to connect to the database", error);
//     throw new Error("Database connection failed");
//   }
// }
