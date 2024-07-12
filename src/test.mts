import dotenv from "dotenv";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { verifyToken, hasAuthenticationHeader } from "./auth.mjs";

function main(): void {
  // テスト用のトークンを取得
  new Promise((resolve, reject) => {
    console.log("Test Start!!");
    test();
  })
    .then(() => {
      console.log("Test End");
    })
    .catch(() => {
      console.error("Test Failed");
    });
}

async function test() {
  await unitTest();
  hasAuthenticationHeaderErrorTest();
}

async function unitTest() {
  const token = await requistTokenForTestAccount();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  AssessFunctionTest(() => {
    hasAuthenticationHeader(headers);
  }, "hasAuthenticationHeader");
  AssessFunctionTest(() => {
    verifyToken(token);
  }, "verifyToken");
}

function hasAuthenticationHeaderErrorTest() {
  console.log("hasAuthenticationHeaderErrorTest Start!!");
  [
    {
      headers: undefined,
      expectedError: "Authorization header is missing",
    },
    {
      headers: {},
      expectedError: "Authorization header is missing",
    },
  ].forEach((invalidRequest) => {
    try {
      hasAuthenticationHeader(invalidRequest.headers);
    } catch (error) {
      if (error.message === invalidRequest.expectedError) {
        console.log(`hasAuthenticationHeader : Error success!!`);
      } else {
        console.log(`hasAuthenticationHeader : Error code incorrected!!`);
        console.log(error.message);
      }
    }
  });
}

function AssessFunctionTest(testFunction: () => void, TestFunctionName: string) {
  try {
    testFunction;
    console.log(`${TestFunctionName}: Success!!`);
  } catch (error) {
    console.log(`${TestFunctionName}: Failed ${error}`);
  }
}

async function requistTokenForTestAccount(): Promise<string> {
  const config = setAxiosConfig();
  const response: AxiosResponse = await axios(config);
  return response.data.idToken;
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
