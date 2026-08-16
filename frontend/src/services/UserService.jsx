import { apiFetch } from "../security/apifetch";
import { checkResponse } from "./apiHelper";

const BASE_URL = "http://localhost:8080";

async function currentUser() {
    const response = await apiFetch("/user/me", {
        method: "GET"
    });

    await checkResponse(response, "Failed to load current user");
    return response.json();
}

async function userName(username) {
    const response = await fetch(
        `${BASE_URL}/user/username/${encodeURIComponent(username)}`
    );

    await checkResponse(response, "Failed to check username");
    return response.json();
}

async function userEmail(email) {
    const response = await fetch(
        `${BASE_URL}/user/useremail/${encodeURIComponent(email)}`
    );

    await checkResponse(response, "Failed to check email");
    return response.json();
}

async function userGetAll() {
    const response = await apiFetch("/user/getall", {
        method: "GET"
    });

    await checkResponse(response, "Failed to get users");
    return response.json();
}

async function userDelete() {
    const response = await apiFetch("/user/delete", {
        method: "DELETE"
    });

    await checkResponse(response, "Failed to schedule account deletion");
    return response.text();
}

async function userUpdate(userData) {
    const response = await apiFetch("/user/update", {
        method: "PUT",
        body: JSON.stringify(userData)
    });

    await checkResponse(response, "Failed to update user");
    return response.json();
}

async function userChangePassword(passwordData) {
    const response = await apiFetch("/user/change-password", {
        method: "PUT",
        body: JSON.stringify(passwordData)
    });

    await checkResponse(response, "Failed to change password");
    return response.text();
}

export {
    currentUser,
    userName,
    userEmail,
    userGetAll,
    userDelete,
    userUpdate,
    userChangePassword
};
