import { initializeApp, cert } from "firebase-admin/app";
import dotenv from "dotenv";

export const createApp = () => {
  dotenv.config();
  return initializeApp({
    credential: cert({
      projectId: process.env.project_id,
      privateKey: process.env.private_key.replace("/\\n/g", "\n"),
      clientEmail: process.env.client_email,
    }),
  });
};
