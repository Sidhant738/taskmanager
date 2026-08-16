const BASE_URL = "http://localhost:8080";

function buildHeaders(options = {}, token = null) {
    const headers = new Headers(options.headers || {});

    if (options.body !== undefined && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
}

async function refreshAccessToken() {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    const token = data?.token;

    if (!token) {
        return null;
    }

    localStorage.setItem("userToken", token);
    return token;
}

export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("userToken");

    let response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        credentials: "include",
        headers: buildHeaders(options, token)
    });

    if (response.status !== 401) {
        return response;
    }

    const newToken = await refreshAccessToken();

    if (!newToken) {
        localStorage.removeItem("userToken");
        window.location.replace("/login");
        return response;
    }

    response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        credentials: "include",
        headers: buildHeaders(options, newToken)
    });

    return response;
}
