import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import "../styles/page/login.css";

export default function LoginForm() {
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setLoadError("");

        try {
            const token = await login({
                identifier: identifier.trim(),
                password
            });

            localStorage.setItem("userToken", token);
            navigate("/dashboard", {
                replace: true
            });
        } catch (error) {
            setLoadError(
                error.message || "Login failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
        >
            <h1>Login</h1>

            {loadError && (
                <p className="error">{loadError}</p>
            )}

            <label htmlFor="identifier">
                Username/Email
            </label>

            <input
                id="identifier"
                type="text"
                name="identifier"
                value={identifier}
                onChange={(event) => {
                    setIdentifier(event.target.value);
                    setLoadError("");
                }}
                required
                disabled={loading}
            />

            <label htmlFor="login-password">
                Password
            </label>

            <input
                id="login-password"
                type="password"
                name="password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                    setLoadError("");
                }}
                required
                disabled={loading}
            />

            <input
                className="login-btn"
                type="submit"
                value={
                    loading
                        ? "Logging in..."
                        : "Login"
                }
                disabled={loading}
            />

            <button
                className="register-btn"
                type="button"
                onClick={() => navigate("/register")}
                disabled={loading}
            >
                Don't have an account?
            </button>
        </form>
    );
}
