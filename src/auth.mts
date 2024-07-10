import { APIGatewayProxyEventHeaders } from "aws-lambda";
import { getAuth } from "firebase-admin/auth";
import { createApp } from "./app.mjs";

export const hasAuthenticationHeader = (headers: APIGatewayProxyEventHeaders) => {
  if (typeof headers === "undefined" || "Authorization" in headers === false) {
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
