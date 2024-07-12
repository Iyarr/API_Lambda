import { initializeApp, cert } from "firebase-admin/app";
import dotenv from "dotenv";

export const createApp = () => {
  dotenv.config();
  if (
    process.env.FIREBASE_PROJECT_ID == null ||
    process.env.FIREBASE_PRIVATE_KEY == null ||
    process.env.FIREBASE_CLIENT_EMAIL == null
  ) {
    throw Error("Environment variable is missing");
  }
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replaceAll("\\n", "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
};
