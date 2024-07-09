import dotenv from "dotenv";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { testverifyToken, testHasAuthenticationHeader } from "./auth.mjs";

function main(): void {
  // テスト用のトークンを取得
  const token = requistIdToken();

  try {
    testHasAuthenticationHeader(token);
  } catch (error) {
    console.error("hasAuthenticationHeader Error:", error);
  }

  try {
    testverifyToken(token);
  } catch (error) {
    console.error("verifyToken Error:", error);
  }
}

function requistIdToken(): string {
  axios(setAxiosConfig())
    .then((response: AxiosResponse) => {
      return response.data.idToken as string;
    })
    .catch((error: AxiosError) => {
      console.error("Error:", error);
    });
  return "";
}

function setAxiosConfig(): AxiosRequestConfig {
  dotenv.config();
  const config = {
    url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
    params: {
      key: process.env.api_key,
    },
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: process.env.user_email,
      password: process.env.user_password,
      returnSecureToken: true,
    },
  };
  return config;
}

main();
