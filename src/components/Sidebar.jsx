import { NavLink } from "react-router-dom";
import "../css/Sidebar.css";
import { useNavigate } from "react-router-dom";


function Sidebar() {

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("teacherLoggedIn");
  localStorage.removeItem("teacherEmail");

  navigate("/login", { replace: true });
};

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">CA</div>

        <div>
          <h2>College</h2>
          <span>Attendance System</span>
        </div>
      </div>

      <div className="sidebar-menu">

        <p className="menu-title">MAIN MENU</p>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="menu-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/select-class"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="menu-icon">▦</span>
          <span>College Data</span>
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="menu-icon">♙</span>
          <span>Students</span>
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="menu-icon">✓</span>
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="menu-icon">▤</span>
          <span>Reports</span>
        </NavLink>

      </div>

      <div className="sidebar-bottom">

        <div className="system-status">
          <span className="online-dot"></span>

          <div>
            <strong>System Online</strong>
            <small>Backend connected</small>
          </div>
        </div>

       <button
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>

      </div>

    </aside>
  );
}

export default Sidebar;