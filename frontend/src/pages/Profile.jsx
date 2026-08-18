import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../services/UserService";
import { taskGetAll } from "../services/TaskService";
import "../styles/page/profile.css";

export default function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0
    });
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadProfile() {
            try {
                const [userData, tasks] = await Promise.all([
                    currentUser(),
                    taskGetAll()
                ]);

                if (!active) return;

                const taskList = Array.isArray(tasks)
                    ? tasks
                    : [];

                const completed = taskList.filter(
                    (task) => task.completed
                ).length;

                setUser(userData);
                setStats({
                    total: taskList.length,
                    completed,
                    pending:
                        taskList.length - completed
                });
            } catch (err) {
                if (active) {
                    setError(
                        err.message ||
                        "Unable to load profile."
                    );
                }
            }
        }

        loadProfile();

        return () => {
            active = false;
        };
    }, []);

    function handleChangePassword() {
        navigate("/settings");
    }

    function handleLogout() {
        localStorage.removeItem("userToken");
        navigate("/login", {
            replace: true
        });
    }

    if (error) {
        return (
            <div className="profile-page">
                <p className="error">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-page">
                <p>Loading profile...</p>
            </div>
        );
    }

    const progress =
        stats.total === 0
            ? 0
            : Math.round(
                (stats.completed / stats.total) * 100
            );

    return (
        <div className="profile-page">
            <header className="profile-header profile-header-row">
                <h1>Profile</h1>

                <button
                    className="page-back"
                    onClick={() => navigate("/Dashboard")}
                >
                    ← Back
                </button>
            </header>

            <section className="profile-card">
                <div className="profile-avatar">
                    {(user.userName || "U")
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <div className="profile-details">
                    <div className="detail-row">
                        <span>Username</span>
                        <strong>
                            {user.userName}
                        </strong>
                    </div>

                    <div className="detail-row">
                        <span>Email</span>
                        <strong>
                            {user.userEmail}
                        </strong>
                    </div>

                    <div className="detail-row">
                        <span>Joined Date</span>
                        <strong>
                            {user.createdAt
                                ? new Date(
                                    user.createdAt
                                ).toLocaleDateString()
                                : "—"}
                        </strong>
                    </div>
                </div>
            </section>

            <section className="profile-stats">
                <h2>Task Statistics</h2>

                <div className="stat-row">
                    <span>Total</span>
                    <strong>{stats.total}</strong>
                </div>

                <div className="stat-row">
                    <span>Completed</span>
                    <strong>
                        {stats.completed}
                    </strong>
                </div>

                <div className="stat-row">
                    <span>Pending</span>
                    <strong>{stats.pending}</strong>
                </div>

                <div className="stat-row progress-row">
                    <span>Progress</span>
                    <strong>{progress}%</strong>
                </div>

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    />
                </div>
            </section>

            <section className="profile-security">
                <h2>Security</h2>

                <button
                    className="secondary"
                    onClick={handleChangePassword}
                >
                    Change Password
                </button>

                <button
                    className="secondary"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </section>
        </div>
    );
}
