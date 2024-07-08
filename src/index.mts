import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
  APIGatewayProxyEventHeaders,
} from "aws-lambda";
import { validateHeader } from "./auth.mjs";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return new Promise((resolve, reject) => {
    try {
      const headers: APIGatewayProxyEventHeaders = event.headers;
      validateHeader(headers);
      resolve({
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "OK",
        }),
      });
    } catch (error) {
      resolve({
        statusCode: error.statusCode,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: error.message,
        }),
      });
    }
  });
};
