import { initializeApp, cert } from "firebase-admin/app";
import dotenv from "dotenv";

export const createApp = () => {
  dotenv.config();
  if (
    process.env.project_id == null ||
    process.env.private_key == null ||
    process.env.client_email == null
  ) {
    throw Error("Environment variable is missing");
  }
  return initializeApp({
    credential: cert({
      projectId: process.env.project_id,
      privateKey: process.env.private_key.replaceAll("\\n", "\n"),
      clientEmail: process.env.client_email,
    }),
  });
};
