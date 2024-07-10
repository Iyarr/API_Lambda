import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { hasAuthenticationHeader, verifyToken, checkAuthenticationHeaderFormat } from "./auth.mjs";

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  return verifyAuthenticationHeader(event);
};

export const verifyAuthenticationHeader = async (event: APIGatewayProxyEvent) => {
  const headers = event.headers;
  try {
    hasAuthenticationHeader(headers);
    checkAuthenticationHeaderFormat(headers.Authorization);
    await verifyToken(headers.Authorization.split(" ")[1]);
  } catch (error) {
    return {
      statusCode: 401,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: error.message,
      }),
    } as APIGatewayProxyResult;
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "OK",
    }),
  } as APIGatewayProxyResult;
};
