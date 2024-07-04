import { initializeApp, cert } from "firebase-admin/app";

export const createApp = () => {
  return initializeApp({
    credential: cert({
      projectId: process.env.project_id,
      privateKey: process.env.private_key,
      clientEmail: process.env.client_email,
    }),
  });
};
