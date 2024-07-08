import { validateHeader } from "./auth.mjs";
import axios, { AxiosRequestConfig } from "axios";

const main = (): void => {
  const user_email = process.env.user_email;
  const user_password = process.env.user_password;
  const api_key = process.env.api_key;
  const config: AxiosRequestConfig = {
    url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
    params: {
      key: api_key,
    },
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: user_email,
      password: user_password,
      returnSecureToken: true,
    },
  };
  axios(config)
    .then((response) => {
      testValidateHeader(response.data.token);
    })
    .catch((error) => {
      console.error("エラー:", error.response.data.error.message);
    });
};

const testValidateHeader = (token: string): void => {
  validateHeader({
    Authorization: `Bearer ${token}`,
  });
};

main();
