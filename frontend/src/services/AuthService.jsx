import { checkResponse } from "./apiHelper";

const BASE_URL = import.meta.env.VITE_API_URL;

async function register(registerData) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
    });

    await checkResponse(response, "Failed to register");
    return response.text();
}

async function login(loginData) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    });

    await checkResponse(response, "Login failed");
    return response.text();
}

export { register, login };
