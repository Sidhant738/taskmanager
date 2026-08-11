import { useNavigate } from "react-router-dom";
import "../styles/page/home.css";
import homeImage from "../assets/home-page-image.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <nav className="navbar">

        <div className="logo">
          TaskFlow
        </div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Features</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <div className="nav-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

      </nav>

      <section className="hero">

        <div className="hero-left">

          <h1>
            Organize Your Tasks <br />
            Manage Your Life
          </h1>

          <p>
            Plan your day, track your progress and stay productive with our
            modern task management application.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

          <div className="features">

            <div className="feature">
              <h3>Easy</h3>
              <p>Create and manage tasks quickly.</p>
            </div>

            <div className="feature">
              <h3>Secure</h3>
              <p>Your data is protected.</p>
            </div>

            <div className="feature">
              <h3>Fast</h3>
              <p>Simple and responsive interface.</p>
            </div>

          </div>

        </div>

        <div className="hero-right">
          <img
            src={homeImage}
            alt="Task Manager"
          />
        </div>

      </section>

      <footer>
        © 2026 TaskFlow
      </footer>

    </div>
  );
}

export default Home;