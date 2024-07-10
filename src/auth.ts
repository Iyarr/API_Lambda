import { getAuth } from "firebase-admin/auth";
import { createApp } from "./app.js";

export const hasAuthenticationHeader = (headers: { [name: string]: string }) => {
  if ("Authorization" in headers === false) {
    throw new Error("Authorization header is missing");
  }
};

export const checkAuthenticationHeaderFormat = (header: string) => {
  if (!header.startsWith("Bearer ")) {
    throw new Error("Authorization header format is invalid");
  }
};

export const verifyToken = (token: string) => {
  const auth = getAuth(createApp());
  auth
    .verifyIdToken(token)
    .then((decodedToken) => {})
    .catch((error) => {
      return new Error("Authentication failed");
    });
};
