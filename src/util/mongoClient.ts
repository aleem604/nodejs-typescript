import { MongoClient, Db } from "mongodb";

let db: Db;

const mongoConnect = async (callback: any): Promise<Db> => {
  if (db) return db; // Reuse connection if already established

  const client = new MongoClient(
    "mongodb://localhost:27017/mern-ts-db?retryWrites=true&loadBalanced=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000"
  ); // Default Mongo URI
  await client.connect();
  callback();
  db = client.db(); // replace with your db name
  console.log("✅ Connected to MongoDB");

  return db;
};

export const getDB = (): Db => {
  if (!db) {
    throw new Error("Database not initialized. Call mongoConnect first.");
  }
  return db;
};

export default mongoConnect;
