import { APIGatewayProxyEventHeaders } from "aws-lambda";
import { Auth } from "firebase-admin/auth";

export const hasAuthorizationHeader = (headers: APIGatewayProxyEventHeaders) => {
  if (headers == null || "Authorization" in headers === false) {
    throw Error("Authorization header is missing");
  }
};

export const checkAuthorizationHeaderFormat = (header: string) => {
  if (!header.startsWith("Bearer ")) {
    throw Error("Authorization header format is invalid");
  }
};

export const verifyToken = async (token: string, auth: Auth, projectId: string) => {
  const decodedIdToken = await auth.verifyIdToken(token);
  /*
  if (decodedIdToken.aud !== projectId) {
    throw Error("Token is invalid");
  }*/
  return await auth.verifyIdToken(token);
};
