import { getAuth } from "firebase-admin/auth";
import { createApp } from "./app.js";

export const validateHeader = (headers: { [name: string]: string }) => {
if (!headers.authorization) {
    throw new Error("Authorization header is missing");
  }
  const token = headers.authorization.split(" ")[1];
  return validateToken(token);
};

const validateToken = (token: string) => {
  const auth = getAuth(createApp());
  auth
    .verifyIdToken(token)
    .then((decodedToken) => {})
    .catch((error) => {
      throw new Error("Authentication failed");
    });
};
