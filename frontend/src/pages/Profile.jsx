import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../services/UserService";
import { taskGetAll } from "../services/TaskService";
import "../styles/page/profile.css";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    navigate("/login", { replace: true });
                    return;
                }

                const tasks = await taskGetAll();
                const total = tasks.length;
                const completed = tasks.filter((task) => task.completed).length;
                const pending = total - completed;
                setStats({ total, completed, pending });

                const userData = await currentUser();
                setUser(userData);
            } catch (err) {
                setError(err.message || "Unable to load profile.");
            }
        }

        loadData();
    }, [navigate]);

    if (error) {
        return <div className="profile-page"><p className="error">{error}</p></div>;
    }

    if (!user) {
        return <div className="profile-page"><p>Loading profile...</p></div>;
    }

    const progress = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

    const handleEditProfile = () => {
        navigate("/settings");
    };

    const handleChangePassword = () => {
        navigate("/settings");
    };

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        navigate("/login", { replace: true });
    };

    return (
        <div className="profile-page">
            <header className="profile-header profile-header-row">
                <h1>Profile</h1>
                <button className="page-back" onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </header>

            <section className="profile-card">
                <div className="profile-avatar">A</div>
                <div className="profile-details">
                    <div className="detail-row">
                        <span>Username</span>
                        <strong>{user.userName}</strong>
                    </div>
                    <div className="detail-row">
                        <span>Email</span>
                        <strong>{user.userEmail}</strong>
                    </div>
                    <div className="detail-row">
                        <span>Joined Date</span>
                        <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
                    </div>
                    <button className="edit-profile" onClick={handleEditProfile}>Edit Profile</button>
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
                    <strong>{stats.completed}</strong>
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
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </section>

            <section className="profile-security">
                <h2>Security</h2>
                <button className="secondary" onClick={handleChangePassword}>Change Password</button>
                <button className="secondary" onClick={handleLogout}>Logout</button>
            </section>
        </div>
    );
}
