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
      console.log("Test Failed");
    });
}

async function test() {
  const token = await requistTokenForTestAccount();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  AssessTestSuccessResult(hasAuthenticationHeader(headers), "hasAuthenticationHeader");
  AssessTestSuccessResult(verifyToken(token), "verifyToken");
}

function AssessTestSuccessResult(testFunction: Promise<void> | void, TestFunctionName: string) {
  if (testFunction instanceof Promise) {
    testFunction
      .then(() => {
        console.log(`${TestFunctionName}: Success!!`);
      })
      .catch((error) => {
        console.log(`${TestFunctionName}: Failed ${error}`);
      });
  } else {
    try {
      testFunction;
      console.log(`${TestFunctionName}: Success!!`);
    } catch (error) {
      console.log(`${TestFunctionName}: Failed ${error}`);
    }
  }
}

function AssessTestErrorResult(
  testFunction: Promise<void> | void,
  TestFunctionName: string,
  expectedError: string
) {
  if (testFunction instanceof Promise) {
    testFunction
      .then(() => {
        console.log(`${TestFunctionName} : False negative!!`);
      })
      .catch((error) => {
        if (error.message === expectedError) {
          console.log(`${TestFunctionName} : Error success!!`);
        } else {
          console.log(`${TestFunctionName} : Error code incorrected!!`);
        }
      });
  } else {
    try {
      testFunction;
      console.log(`${TestFunctionName}: False negative!!`);
    } catch (error) {
      if (error.message === expectedError) {
        console.log(`${TestFunctionName} : Error success!!`);
      } else {
        console.log(`${TestFunctionName} : Error code incorrected!!`);
      }
    }
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
