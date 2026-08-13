import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teacherLogin } from "../services/api";
import "../css/Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {

      setError(
        "Please enter email and password."
      );

      return;
    }

    try {

      setLoading(true);

    const data = await teacherLogin(email, password);

if (data.success) {
  localStorage.setItem("teacherLoggedIn", "true");
  localStorage.setItem("teacherEmail", data.teacher.email);

  navigate("/dashboard");
}

      if (data.success) {

        // =========================================
        // SAVE LOGIN
        // =========================================

        localStorage.setItem(
          "teacherLoggedIn",
          "true"
        );

        localStorage.setItem(
          "teacherEmail",
          data.teacher.email
        );

        localStorage.setItem(
          "teacherRole",
          data.teacher.role
        );

        // =========================================
        // GO TO DASHBOARD
        // =========================================

        navigate("/dashboard");

      }

    } catch (error) {

      setError(
        error.message ||
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="login-info">

        <div className="login-brand">

          <div className="brand-icon">
            A
          </div>

          <div>
            <strong>
              AttendX
            </strong>

            <span>
              College Attendance
            </span>
          </div>

        </div>


        <div className="login-info-content">

          <span className="login-label">
            TEACHER PORTAL
          </span>

          <h1>
            Manage attendance
            <br />
            <span>with confidence.</span>
          </h1>

          <p>
            Track students, manage daily attendance
            and generate professional reports from
            one place.
          </p>

          <div className="login-features">

            <div>
              <span>✓</span>
              Daily Attendance
            </div>

            <div>
              <span>✓</span>
              Student Management
            </div>

            <div>
              <span>✓</span>
              PDF Reports
            </div>

          </div>

        </div>


        <div className="login-footer">
          © 2026 AttendX. Teacher Portal.
        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="login-form-area">

        <div className="login-card">

          <div className="mobile-brand">

            <div className="brand-icon">
              A
            </div>

            <strong>
              AttendX
            </strong>

          </div>


          <div className="login-heading">

            <span>
              WELCOME BACK
            </span>

            <h2>
              Teacher Login
            </h2>

            <p>
              Sign in to access your attendance
              dashboard.
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="login-error">
              ⚠ {error}
            </div>

          )}


          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="login-input-group">

              <label>
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                placeholder="teacher@college.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>


            {/* PASSWORD */}

            <div className="login-input-group">

              <label>
                PASSWORD
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >

              {loading
                ? "Signing in..."
                : "Sign In"}

              {!loading && (
                <span>→</span>
              )}

            </button>

          </form>


          <div className="login-security">

            <span>🔒</span>

            <p>
              Secure teacher access
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Login;