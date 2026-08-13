import { useEffect, useState } from "react";
import {
  testBackend,
  getDashboard,
} from "../services/api";

import "../css/Dashboard.css";

import { useNavigate } from "react-router-dom";


function Dashboard() {

  const navigate = useNavigate();


  // ==========================================
  // BACKEND STATUS
  // ==========================================

  const [backendMessage, setBackendMessage] =
    useState("Connecting...");


  // ==========================================
  // DASHBOARD DATA
  // ==========================================

  const [dashboardData, setDashboardData] =
    useState({

      totalStudents: 0,

      present: 0,

      absent: 0,

      attendancePercentage: 0,

    });


  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        // --------------------------------------
        // TEST BACKEND
        // --------------------------------------

        const backend =
          await testBackend();

        setBackendMessage(
          backend.message ||
          "Backend connected"
        );


        // --------------------------------------
        // GET DASHBOARD DATA
        // --------------------------------------

        const data =
          await getDashboard();


        console.log(
          "Dashboard Data:",
          data
        );


        if (data.success) {

          setDashboardData({

            totalStudents:
              data.totalStudents || 0,

            present:
              data.present || 0,

            absent:
              data.absent || 0,

            attendancePercentage:
              data.attendancePercentage || 0,

          });

        }


      } catch (error) {

        console.error(
          "Dashboard Error:",
          error
        );

        setBackendMessage(
          "Backend connection failed"
        );


      } finally {

        setLoading(false);

      }

    };


    loadDashboard();

  }, []);


  // ==========================================
  // TODAY DATE
  // ==========================================

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="dashboard-page">


      {/* ==================================
          BACKGROUND
      ================================== */}

      <div className="glow glow-one"></div>

      <div className="glow glow-two"></div>


      {/* ==================================
          NAVBAR
      ================================== */}

      <nav className="dashboard-navbar">

        <div className="brand">

          <div className="brand-icon">
            CA
          </div>


          <div>

            <h2
              style={{
                color: "#160101",
              }}
            >
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


      {/* ==================================
          MAIN CONTENT
      ================================== */}

      <main className="dashboard-content">


        {/* ==================================
            WELCOME
        ================================== */}

        <section className="welcome-section">

          <div>

            <span className="welcome-label">
              WELCOME BACK
            </span>


            <h1
              style={{
                color: "#160101",
              }}
            >

              Attendance

              <span>
                {" "}Dashboard
              </span>

            </h1>


            <p>

              Manage students, classes and daily
              attendance from one powerful dashboard.

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
            ATTENDANCE PERFORMANCE
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


          {/* SELECT CLASS */}

          <div
            className="action-card"
            onClick={() =>
              navigate("/select-class")
            }
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


          {/* MARK ATTENDANCE */}

          <div
            className="action-card"
            onClick={() =>
              navigate("/select-class")
            }
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


          {/* REPORTS */}

          <div
            className="action-card"
            onClick={() =>
              navigate("/reports")
            }
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