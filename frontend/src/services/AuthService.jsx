import { checkResponse } from "./apiHelper";

async function register(userInfo) {
  const response = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  });

  await checkResponse(response, "Failed to register");

  return await response.text();
}

async function login(loginData) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  });

  await checkResponse(response, "Login failed");

  return await response.text();
}

export { register, login };
