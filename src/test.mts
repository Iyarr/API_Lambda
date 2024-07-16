import dotenv from "dotenv";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { verifyToken, hasAuthorizationHeader } from "./auth.mjs";
import { Firebase } from "./app.mjs";
import { Auth } from "firebase-admin/auth";

function main(): void {
  // テスト用のトークンを取得
  new Promise((resolve, reject) => {
    console.log("Test Start!!");
    test()
      .then(() => {
        console.log("Test End");
      })
      .catch(() => {
        console.error("Test Failed");
      });
  });
}

async function test() {
  const firebase = new Firebase();
  const auth = firebase.getAuth();
  const projectId = firebase.getProjectId();
  await unitTest(auth, projectId);
  hasAuthorizationHeaderErrorTest();
  await verifyTokenErrorTest(auth, projectId);
}

async function unitTest(auth: Auth, projectId: string) {
  const token = await requistTokenToLoginTestAccount();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  AssessFunctionTest(() => {
    hasAuthorizationHeader(headers);
  }, "hasAuthenticationHeader");
  await AssessAsyncFunctionTest(async () => {
    await verifyToken(token, auth, projectId);
  }, "verifyToken");
}

function hasAuthorizationHeaderErrorTest() {
  console.log("hasAuthorizationHeaderErrorTest Start!!");
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
      hasAuthorizationHeader(invalidRequest.headers);
    } catch (error) {
      if (error.message === invalidRequest.expectedError) {
        console.log(`hasAuthorizationHeader : Error success!!`);
      } else {
        console.log(`hasAuthorizationHeader : Error code incorrected!!`);
        console.log(error.message);
      }
    }
  });
}

async function verifyTokenErrorTest(auth: Auth, projectId: string) {
  console.log("verifyTokenErrorTest Start!!");
  const invalidTokens = ["", "Invalid Token"];
  const verifyInvalidToken = async (invalidToken: string) => {
    const decodedIdToken = await verifyToken(invalidToken, auth, projectId);
    console.log(decodedIdToken);
  };
  const Promises = invalidTokens.map(async (invalidToken) => {
    return await verifyInvalidToken(invalidToken);
  });
  await Promise.all(Promises)
    .then(() => console.log(`verifyTokenErrorTest : False negative!!`))
    .catch((error) => {
      console.log(`verifyTokenErrorTest : Error success!!`);
    });
}

function AssessFunctionTest(testFunction: () => void, TestFunctionName: string) {
  try {
    testFunction();
    console.log(`${TestFunctionName}: Success!!`);
  } catch (error) {
    console.log(`${TestFunctionName}: Failed ${error}`);
  }
}

async function AssessAsyncFunctionTest(
  TestAsyncFunction: () => Promise<void>,
  TestFunctionName: string
) {
  try {
    await TestAsyncFunction();
    console.log(`${TestFunctionName}: Success!!`);
  } catch (error) {
    console.log(`${TestFunctionName}: Failed ${error}`);
  }
}

async function requistTokenToLoginTestAccount(): Promise<string> {
  const config = setAxiosConfig();
  const response: AxiosResponse = await axios(config);
  return response.data.idToken;
}

function setAxiosConfig(): AxiosRequestConfig {
  dotenv.config();
  const config = {
    url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
    params: {
      key: process.env.API_KEY,
    },
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
      returnSecureToken: true,
    },
  };
  return config;
}

main();
