import { useState } from "react";
import CardContainer from "./CardContainer";
import { userChangePassword } from "../../services/UserService";
import "../../styles/cards/changePassword.css";

export default function ChangePasswordCard({ onCancel, onSuccess }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        if (!oldPassword.trim()) {
            setError("Please enter your current password.");
            return;
        }

        if (!newPassword.trim()) {
            setError("Please enter a new password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (oldPassword === newPassword) {
            setError(
                "New password must be different from your current password."
            );
            return;
        }

        try {
            setLoading(true);

            await userChangePassword({oldPassword:oldPassword, newPassword:newPassword});

            onSuccess();
        } catch (err) {
            setError(err.message || "Unable to change password.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <CardContainer className="ChangePassword">

            <h2>Change Password</h2>

            <p>
                Enter your current password and choose a new password.
            </p>

            <form onSubmit={handleSubmit}>

                <label>
                    Current Password

                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) =>
                            setOldPassword(e.target.value)
                        }
                        placeholder="Enter current password"
                        autoComplete="current-password"
                    />
                </label>

                <label>
                    New Password

                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                        placeholder="Enter new password"
                        autoComplete="new-password"
                    />
                </label>

                <label>
                    Confirm New Password

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                    />
                </label>

                {error && (
                    <p className="password-error">
                        {error}
                    </p>
                )}

                <nav>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="confirm-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Changing..."
                            : "Change Password"}
                    </button>
                </nav>

            </form>

        </CardContainer>
    );
}