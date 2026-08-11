import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/header/header.css";

function Header({ profile, setting, logout }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">

            <div className="logo">
                <h2>TaskFlow</h2>
            </div>

            <button
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <nav className={`navbar ${menuOpen ? "active" : ""}`}>

                <button
                    onClick={() => {
                        setMenuOpen(false);
                    }}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => {
                        navigate("/profile");
                        setMenuOpen(false);
                    }}
                >
                    Profile
                </button>

                <button
                    onClick={() => {
                        navigate("/settings");
                        setMenuOpen(false);
                    }}
                >
                    Settings
                </button>

                <button
                    className="logout-btn"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    Logout
                </button>

            </nav>

        </header>
    );
}

export default Header;