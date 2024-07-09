import { getAuth, DecodedIdToken } from "firebase-admin/auth";
import { createApp } from "./app.mjs";

export const hasAuthenticationHeader = (headers: { [name: string]: string }) => {
  if ("Authorization" in headers === false) {
    throw new Error("Authorization header is missing");
  }
};

export const checkAuthenticationHeaderFormat = (header: string): string => {
  if (!header.startsWith("Bearer ")) {
    throw new Error("Authorization header format is invalid");
  }
  return header.split(" ")[1];
};

export const verifyToken = (token: string) => {
  const auth = getAuth(createApp());
  auth
    .verifyIdToken(token)
    .then((decodedToken) => {
      console.log("decodedToken:", decodedToken as DecodedIdToken);
    })
    .catch((error) => {
      return new Error("Authentication failed");
    });
};

export const testHasAuthenticationHeader = (token: string) => {
  try {
    hasAuthenticationHeader({
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    console.error("hasAuthenticationHeader Error:", error);
  }
  console.log("hasAuthenticationHeader OK");
};

export const testverifyToken = (token: string) => {
  try {
    verifyToken(token);
  } catch (error) {
    console.error("verifyToken Error:", error);
  }
  console.log("verifyToken OK");
};
