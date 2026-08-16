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

    useEffect(() => {
        const cleanName = name.trim();

        if (!cleanName) {
            setUserNameError("");
            return;
        }

        if (cleanName.length < 3) {
            setUserNameError(
                "Username must be at least 3 characters."
            );
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
    }, [name]);

    useEffect(() => {
        const cleanEmail = email.trim();

        if (!cleanEmail) {
            setUserEmailError("");
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
    }, [email]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (userNameError || userEmailError) {
            return;
        }

        setLoading(true);
        setLoadError("");

        try {
            const token = await register({
                name: name.trim(),
                email: email.trim(),
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

            {userNameError && (
                <p className="field-error">
                    {userNameError}
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
