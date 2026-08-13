import { useEffect, useState } from "react";
import { testBackend } from "../services/api";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  // ==========================================
  // DASHBOARD DATA
  // ==========================================
  const navigate = useNavigate();

  const [backendMessage, setBackendMessage] = useState("Connecting...");

  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    present: 0,
    absent: 0,
    attendancePercentage: 0,
  });

  const [loading, setLoading] = useState(true);


  // ==========================================
  // GET DASHBOARD DATA
  // ==========================================

  useEffect(() => {

    // Test backend
    testBackend()
      .then((data) => {
        setBackendMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
        setBackendMessage("Backend connection failed");
      });


    // Get dashboard statistics
    fetch("http://127.0.0.1:5000/api/dashboard")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Dashboard API failed");
        }

        return response.json();
      })

      .then((data) => {

        console.log("Dashboard Data:", data);

        if (data.success) {

          setDashboardData({
            totalStudents: data.totalStudents,
            present: data.present,
            absent: data.absent,
            attendancePercentage:
              data.attendancePercentage,
          });

        }

        setLoading(false);
      })

      .catch((error) => {

        console.error("Dashboard Error:", error);

        setLoading(false);
      });

  }, []);


  // ==========================================
  // TODAY DATE
  // ==========================================

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });


  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="dashboard-page">

      {/* Background decoration */}

      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>


      {/* Navbar */}

      <nav className="dashboard-navbar">

        <div className="brand">

          <div className="brand-icon">
            CA
          </div>

          <div>

            <h2 style={{ color: "#160101" }}>
              College Attendance
            </h2>

            <span>
              Management System
            </span>

          </div>

        </div>


        <div className="nav-status">

          <span className="status-dot"></span>

          System Online

        </div>

      </nav>


      {/* Main content */}

      <main className="dashboard-content">


        {/* Welcome */}

        <section className="welcome-section">

          <div>

            <span className="welcome-label">
              WELCOME BACK
            </span>


            <h1 style={{ color: "#160101" }}>

              Attendance

              <span>
                {" "}Dashboard
              </span>

            </h1>


            <p>

              Manage students, classes and daily attendance
              from one powerful dashboard.

            </p>

          </div>


          <div className="date-card">

            <span>
              Today
            </span>

            <strong>
              {today}
            </strong>

          </div>

        </section>


        {/* ==================================
            STATISTICS
        ================================== */}

        <section className="stats-grid">


          {/* TOTAL STUDENTS */}

          <div className="stat-card">

            <div className="stat-icon blue">
              ST
            </div>

            <div>

              <span>
                Total Students
              </span>

              <h2>

                {loading
                  ? "..."
                  : dashboardData.totalStudents}

              </h2>

            </div>

            <div className="card-arrow">
              →
            </div>

          </div>


          {/* PRESENT */}

          <div className="stat-card">

            <div className="stat-icon green">
              PR
            </div>

            <div>

              <span>
                Present Today
              </span>

              <h2>

                {loading
                  ? "..."
                  : dashboardData.present}

              </h2>

            </div>

            <div className="card-arrow">
              →
            </div>

          </div>


          {/* ABSENT */}

          <div className="stat-card">

            <div className="stat-icon red">
              AB
            </div>

            <div>

              <span>
                Absent Today
              </span>

              <h2>

                {loading
                  ? "..."
                  : dashboardData.absent}

              </h2>

            </div>

            <div className="card-arrow">
              →
            </div>

          </div>


          {/* TOTAL CLASSES */}

          <div className="stat-card">

            <div className="stat-icon purple">
              CL
            </div>

            <div>

              <span>
                Total Classes
              </span>

              <h2>
                4
              </h2>

            </div>

            <div className="card-arrow">
              →
            </div>

          </div>

        </section>


        {/* ==================================
            ATTENDANCE PERCENTAGE
        ================================== */}

        <section className="section-heading">

          <div>

            <span>
              TODAY'S OVERVIEW
            </span>

            <h2>
              Attendance Performance
            </h2>

          </div>

        </section>


        <section className="backend-card">

          <div className="backend-left">

            <div className="server-icon">
              %
            </div>

            <div>

              <span>
                TODAY'S ATTENDANCE
              </span>

              <h3>

                {loading
                  ? "Calculating..."
                  : `${dashboardData.attendancePercentage}% Attendance`}

              </h3>

            </div>

          </div>


          <div className="connected">

            <span></span>

            Updated from Excel

          </div>

        </section>


        {/* ==================================
            QUICK ACTIONS
        ================================== */}

        <section className="section-heading">

          <div>

            <span>
              QUICK ACTIONS
            </span>

            <h2>
              Manage Attendance
            </h2>

          </div>

        </section>


        <section className="action-grid">

<div
  className="action-card"
  onClick={() => navigate("/select-class")}
>

            <div className="action-icon">
              ＋
            </div>

            <div>

              <h3>
                Select Class
              </h3>

              <p>
                Choose a class to manage students
              </p>

            </div>

            <span className="action-arrow">
              ↗
            </span>

          </div>

<div
  className="action-card"
  onClick={() => navigate("/select-class")}
>

            <div className="action-icon">
              ✓
            </div>

            <div>

              <h3>
                Mark Attendance
              </h3>

              <p>
                Mark today's student attendance
              </p>

            </div>

            <span className="action-arrow">
              ↗
            </span>

          </div>


          <div
  className="action-card"
  onClick={() => navigate("/reports")}
>

            <div className="action-icon">
              ▣
            </div>

            <div>

              <h3>
                View Reports
              </h3>

              <p>
                Check attendance reports
              </p>

            </div>

            <span className="action-arrow">
              ↗
            </span>

          </div>


        </section>


        {/* ==================================
            BACKEND STATUS
        ================================== */}

        <section className="backend-card">

          <div className="backend-left">

            <div className="server-icon">
              ⌁
            </div>

            <div>

              <span>
                BACKEND STATUS
              </span>

              <h3>
                {backendMessage}
              </h3>

            </div>

          </div>


          <div className="connected">

            <span></span>

            Connected

          </div>

        </section>


      </main>

    </div>
  );
}


export default Dashboard;