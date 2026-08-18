import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDelete } from "../services/UserService";
import { deleteAllTask } from "../services/TaskService";

import Modal from "../components/modal/Modal";
import ConfirmCard from "../components/card/Confirm";
import ChangePasswordCard from "../components/card/ChangePasswordCard";

import "../styles/page/settings.css";

export default function Settings() {

    const navigate = useNavigate();

    const [statusMessage, setStatusMessage] = useState("");

    const [isChangePasswordOpen, setIsChangePasswordOpen] =
        useState(false);

    const [isDeleteTasksOpen, setIsDeleteTasksOpen] =
        useState(false);

    const [isDeleteAccountOpen, setIsDeleteAccountOpen] =
        useState(false);

    const [theme, setTheme] = useState(
        localStorage.getItem("taskmanagerTheme") || "light"
    );

    useEffect(() => {
        localStorage.setItem("taskmanagerTheme", theme);
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    function handlePasswordSuccess() {
        setIsChangePasswordOpen(false);
        setStatusMessage("Password changed successfully.");
    }

    async function handleDeleteAllTasks() {
        try {
            await deleteAllTask();
            setStatusMessage("All tasks deleted successfully.");
        } catch (err) {
            setStatusMessage(
                err.message || "Unable to delete all tasks."
            );
        } finally {
            setIsDeleteTasksOpen(false);
        }
    }

    async function handleDeleteAccount() {
        try {
            await userDelete();

            localStorage.removeItem("userToken");

            navigate("/login", {
                replace: true
            });

        } catch (err) {
            setStatusMessage(
                err.message || "Unable to delete account."
            );
        } finally {
            setIsDeleteAccountOpen(false);
        }
    }

    return (
        <div className="settings-page">

            <header className="settings-header settings-header-row">
                <h1>Settings</h1>

                <button
                    className="page-back"
                    onClick={() => navigate("/Dashboard")}
                >
                    ← Back
                </button>
            </header>

            <section className="settings-section">
                <h2>Appearance</h2>

                <div className="settings-card">

                    <span>Theme</span>

                    <div className="radio-group">

                        <label>
                            <input
                                type="radio"
                                name="theme"
                                value="light"
                                checked={theme === "light"}
                                onChange={() => setTheme("light")}
                            />
                            Light
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="theme"
                                value="dark"
                                checked={theme === "dark"}
                                onChange={() => setTheme("dark")}
                            />
                            Dark
                        </label>

                    </div>
                </div>
            </section>

            <section className="settings-section">
                <h2>Account</h2>

                <div className="settings-card account-card">

                    <div>
                        <strong>Change Password</strong>

                        
                    </div>

                    <button
                        className="secondary"
                        onClick={() => setIsChangePasswordOpen(true)}
                    >
                        Change Password
                    </button>

                </div>
            </section>

            <section className="settings-section">
                <h2>Danger Zone</h2>

                <div className="settings-card danger-card">

                    <button
                        className="danger"
                        onClick={() => setIsDeleteTasksOpen(true)}
                    >
                        Delete All Tasks
                    </button>

                    <button
                        className="danger"
                        onClick={() => setIsDeleteAccountOpen(true)}
                    >
                        Delete Account
                    </button>

                </div>
            </section>

            {statusMessage && (
                <div className="settings-status">
                    {statusMessage}
                </div>
            )}

            {isChangePasswordOpen && (
                <Modal
                    isOpen={true}
                    onClose={() => setIsChangePasswordOpen(false)}
                >
                    <ChangePasswordCard
                        onCancel={() => setIsChangePasswordOpen(false)}
                        onSuccess={handlePasswordSuccess}
                    />
                </Modal>
            )}

            {isDeleteTasksOpen && (
                <Modal
                    isOpen={true}
                    onClose={() => setIsDeleteTasksOpen(false)}
                >
                    <ConfirmCard
                        typeDelete={true}
                        taskTitle="all tasks"
                        onCancel={() => setIsDeleteTasksOpen(false)}
                        onConfirm={handleDeleteAllTasks}
                    />
                </Modal>
            )}

            {isDeleteAccountOpen && (
                <Modal
                    isOpen={true}
                    onClose={() => setIsDeleteAccountOpen(false)}
                >
                    <ConfirmCard
                        typeDelete={true}
                        taskTitle="your account"
                        onCancel={() => setIsDeleteAccountOpen(false)}
                        onConfirm={handleDeleteAccount}
                    />
                </Modal>
            )}

        </div>
    );
}