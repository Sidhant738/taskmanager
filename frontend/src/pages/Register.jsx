import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userName, userEmail } from "../services/UserService";
import { register } from "../services/AuthService";
import "../styles/page/register.css";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userNameError, setUserNameError] = useState("");
    const [userEmailError, setUserEmailError] = useState("");
    const [loadError, setLoadError] = useState("");
    const [loading, setLoading] = useState(false);

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    const nameValidationError =
        cleanName && cleanName.length < 3
            ? "Username must be at least 3 characters."
            : "";

    useEffect(() => {
        if (!cleanName || cleanName.length < 3) {
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const exists = await userName(cleanName);

                setUserNameError(
                    exists
                        ? "Username already taken."
                        : ""
                );
            } catch {
                setUserNameError("");
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [cleanName]);

    useEffect(() => {
        if (!cleanEmail) {
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const exists = await userEmail(cleanEmail);

                setUserEmailError(
                    exists
                        ? "Email already taken."
                        : ""
                );
            } catch {
                setUserEmailError("");
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [cleanEmail]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (
            nameValidationError ||
            userNameError ||
            userEmailError
        ) {
            return;
        }

        setLoading(true);
        setLoadError("");

        try {
            const token = await register({
                name: cleanName,
                email: cleanEmail,
                password
            });

            localStorage.setItem("userToken", token);

            navigate("/dashboard", {
                replace: true
            });
        } catch (error) {
            setLoadError(
                error.message || "Failed to register."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            className="register-form"
            onSubmit={handleSubmit}
        >
            <h1>Create Account</h1>

            {loadError && (
                <p className="error">{loadError}</p>
            )}

            <label htmlFor="register-name">
                Name
            </label>

            <input
                id="register-name"
                type="text"
                name="name"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                    setUserNameError("");
                    setLoadError("");
                }}
                minLength={3}
                maxLength={50}
                required
                disabled={loading}
            />

            {(nameValidationError || userNameError) && (
                <p className="field-error">
                    {nameValidationError || userNameError}
                </p>
            )}

            <label htmlFor="register-email">
                Email
            </label>

            <input
                id="register-email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                    setUserEmailError("");
                    setLoadError("");
                }}
                required
                disabled={loading}
            />

            {userEmailError && (
                <p className="field-error">
                    {userEmailError}
                </p>
            )}

            <label htmlFor="register-password">
                Password
            </label>

            <input
                id="register-password"
                type="password"
                name="password"
                value={password}
                minLength={8}
                maxLength={20}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
                required
                disabled={loading}
            />

            <input
                className="register-submit"
                type="submit"
                value={
                    loading
                        ? "Creating Account..."
                        : "Register"
                }
                disabled={
                    loading ||
                    Boolean(nameValidationError) ||
                    Boolean(userNameError) ||
                    Boolean(userEmailError)
                }
            />

            <button
                className="login-link"
                type="button"
                onClick={() => navigate("/login")}
                disabled={loading}
            >
                Already have an account?
            </button>
        </form>
    );
}