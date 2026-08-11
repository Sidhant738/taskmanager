import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser, userUpdate, userDelete, userChangePassword } from "../services/UserService";
import { taskGetAll, taskDelete } from "../services/TaskService";
import Modal from "../components/modal/Modal";
import ConfirmCard from "../components/card/confirm";
import "../styles/page/settings.css";

export default function Settings() {
    const navigate = useNavigate();
    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [isDeleteTasksOpen, setIsDeleteTasksOpen] = useState(false);
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("taskmanagerTheme") || "light");
    const [emailNotifications, setEmailNotifications] = useState(JSON.parse(localStorage.getItem("taskmanagerEmailNotifications") || "true"));
    const [taskReminder, setTaskReminder] = useState(JSON.parse(localStorage.getItem("taskmanagerTaskReminder") || "true"));
    const [weeklySummary, setWeeklySummary] = useState(JSON.parse(localStorage.getItem("taskmanagerWeeklySummary") || "false"));
    const [defaultSort, setDefaultSort] = useState(localStorage.getItem("taskmanagerDefaultSort") || "Newest First");
    const [defaultView, setDefaultView] = useState(localStorage.getItem("taskmanagerDefaultView") || "Grid");

    useEffect(() => {
        async function loadUser() {
            try {
                const user = await currentUser();
                setCurrentUserInfo(user);
            } catch (err) {
                setStatusMessage(err.message || "Unable to load account settings.");
            }
        }

        loadUser();
    }, []);

    useEffect(() => {
        localStorage.setItem("taskmanagerTheme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("taskmanagerEmailNotifications", emailNotifications);
    }, [emailNotifications]);

    useEffect(() => {
        localStorage.setItem("taskmanagerTaskReminder", taskReminder);
    }, [taskReminder]);

    useEffect(() => {
        localStorage.setItem("taskmanagerWeeklySummary", weeklySummary);
    }, [weeklySummary]);

    useEffect(() => {
        localStorage.setItem("taskmanagerDefaultSort", defaultSort);
        window.dispatchEvent(new Event("settingsChanged"));
    }, [defaultSort]);

    useEffect(() => {
        localStorage.setItem("taskmanagerDefaultView", defaultView);
    }, [defaultView]);

    const handleChangeUsername = async () => {
        if (!currentUserInfo) return;
        const updatedUsername = window.prompt("Enter a new username:", currentUserInfo.userName);
        if (!updatedUsername || updatedUsername.trim() === "") {
            return;
        }

        try {
            const updatedUser = await userUpdate({
                userId: currentUserInfo.userId,
                userName: updatedUsername,
                userEmail: currentUserInfo.userEmail
            });
            setCurrentUserInfo(updatedUser);
            setStatusMessage("Username updated successfully.");
        } catch (err) {
            setStatusMessage(err.message || "Unable to update username.");
        }
    };

    const handleChangeEmail = async () => {
        if (!currentUserInfo) return;
        const updatedEmail = window.prompt("Enter a new email:", currentUserInfo.userEmail);
        if (!updatedEmail || updatedEmail.trim() === "") {
            return;
        }

        try {
            const updatedUser = await userUpdate({
                userId: currentUserInfo.userId,
                userName: currentUserInfo.userName,
                userEmail: updatedEmail
            });
            setCurrentUserInfo(updatedUser);
            setStatusMessage("Email updated successfully.");
        } catch (err) {
            setStatusMessage(err.message || "Unable to update email.");
        }
    };

    const handleChangePassword = async () => {
        if (!currentUserInfo) return;
        const newPassword = window.prompt("Enter a new password:", "");
        if (!newPassword || newPassword.trim() === "") {
            return;
        }

        try {
            await userChangePassword(currentUserInfo.userId, newPassword);
            setStatusMessage("Password changed successfully.");
        } catch (err) {
            setStatusMessage(err.message || "Unable to change password.");
        }
    };

    const handleDeleteAllTasks = async () => {
        try {
            const tasks = await taskGetAll();
            await Promise.all(tasks.map((task) => taskDelete(task.id)));
            setStatusMessage("All tasks deleted successfully.");
        } catch (err) {
            setStatusMessage(err.message || "Unable to delete all tasks.");
        } finally {
            setIsDeleteTasksOpen(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!currentUserInfo) return;

        try {
            await userDelete(currentUserInfo.userId);
            setStatusMessage("Account scheduled for deletion in 7 days.");
            localStorage.removeItem("userToken");
            navigate("/login", { replace: true });
        } catch (err) {
            setStatusMessage(err.message || "Unable to delete account.");
        } finally {
            setIsDeleteAccountOpen(false);
        }
    };

    return (
        <div className="settings-page">
            <header className="settings-header settings-header-row">
                <h1>Settings</h1>
                <button className="page-back" onClick={() => navigate(-1)}>
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
                    <button className="secondary" onClick={handleChangeUsername}>Change Username</button>
                    <button className="secondary" onClick={handleChangeEmail}>Change Email</button>
                    <button className="secondary" onClick={handleChangePassword}>Change Password</button>
                </div>
            </section>

            <section className="settings-section">
                <h2>Notifications</h2>
                <div className="settings-card notifications-card">
                    <label>
                        <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                        />
                        Email Notifications
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={taskReminder}
                            onChange={() => setTaskReminder(!taskReminder)}
                        />
                        Task Reminder
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={weeklySummary}
                            onChange={() => setWeeklySummary(!weeklySummary)}
                        />
                        Weekly Summary
                    </label>
                </div>
            </section>

            <section className="settings-section">
                <h2>Tasks</h2>
                <div className="settings-card tasks-card">
                    <label>
                        Default Sort
                        <select value={defaultSort} onChange={(e) => setDefaultSort(e.target.value)}>
                            <option>Newest First</option>
                            <option>Oldest First</option>
                            <option>Priority</option>
                        </select>
                    </label>
                    <label>
                        Default View
                        <select value={defaultView} onChange={(e) => setDefaultView(e.target.value)}>
                            <option>Grid</option>
                            <option>List</option>
                        </select>
                    </label>
                </div>
            </section>

            <section className="settings-section">
                <h2>Danger Zone</h2>
                <div className="settings-card danger-card">
                    <button className="danger" onClick={() => setIsDeleteTasksOpen(true)}>Delete All Tasks</button>
                    <button className="danger" onClick={() => setIsDeleteAccountOpen(true)}>Delete Account</button>
                </div>
            </section>
            {statusMessage && <div className="settings-status">{statusMessage}</div>}

            {isDeleteTasksOpen && (
                <Modal isOpen={true} onClose={() => setIsDeleteTasksOpen(false)}>
                    <ConfirmCard
                        taskTitle="all tasks"
                        onCancel={() => setIsDeleteTasksOpen(false)}
                        onConfirm={handleDeleteAllTasks}
                    />
                </Modal>
            )}

            {isDeleteAccountOpen && (
                <Modal isOpen={true} onClose={() => setIsDeleteAccountOpen(false)}>
                    <ConfirmCard
                        taskTitle="your account"
                        onCancel={() => setIsDeleteAccountOpen(false)}
                        onConfirm={handleDeleteAccount}
                    />
                </Modal>
            )}
        </div>
    );
}
