import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { hasAuthorizationHeader, verifyToken, checkAuthorizationHeaderFormat } from "./auth.mjs";
import { Firebase } from "./app.mjs";

const firebase = new Firebase();

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  return verifyAuthorizationHeader(event);
};

export const verifyAuthorizationHeader = async (event: APIGatewayProxyEvent) => {
  const headers = event.headers;
  try {
    hasAuthorizationHeader(headers);
    checkAuthorizationHeaderFormat(headers.Authorization);
    await verifyToken(
      headers.Authorization.split(" ")[1],
      firebase.getAuth(),
      firebase.getProjectId()
    );
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Success!",
      }),
    } as APIGatewayProxyResult;
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
};
