import { useEffect, useState } from "react";
import { getAttendance } from "../services/api";
import "../css/Attendance.css";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [selectedClass, setSelectedClass] = useState("CSE");
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CLASS DATA
  // ==========================================

  const classes = [
    {
      name: "CSE",
      fullName: "Computer Science & Engineering",
      students: 45,
    },
    {
      name: "IT",
      fullName: "Information Technology",
      students: 45,
    },
    {
      name: "AI & DS",
      fullName: "Artificial Intelligence & Data Science",
      students: 45,
    },
    {
      name: "ENTC",
      fullName: "Electronics & Telecommunication",
      students: 45,
    },
  ];

  // ==========================================
  // LOAD ATTENDANCE
  // ==========================================

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const response = await getAttendance();

      if (response.success) {
        setAttendance(response.attendance);
      }
    } catch (error) {
      console.error("Attendance loading failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // TODAY DATE
  // ==========================================

  const getTodayDate = () => {
    const today = new Date();

    return (
      String(today.getDate()).padStart(2, "0") +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      today.getFullYear()
    );
  };

  // ==========================================
  // SELECTED CLASS
  // ==========================================

  const selectedClassData = classes.find(
    (item) => item.name === selectedClass
  );

  // ==========================================
  // TODAY'S SELECTED CLASS ATTENDANCE
  // ==========================================

  const todayAttendance = attendance.filter(
    (record) =>
      record.date === getTodayDate() &&
      record.className === selectedClass
  );

  // ==========================================
  // PRESENT
  // ==========================================

  const presentCount = todayAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  // ==========================================
  // ABSENT
  // ==========================================

  const absentCount = todayAttendance.filter(
    (record) => record.status === "Absent"
  ).length;

  // ==========================================
  // TOTAL MARKED
  // ==========================================

  const totalMarked = presentCount + absentCount;

  // ==========================================
  // ATTENDANCE %
  // ==========================================

  const attendancePercentage =
    selectedClassData && selectedClassData.students > 0
      ? ((presentCount / selectedClassData.students) * 100).toFixed(2)
      : "0.00";

  // ==========================================
  // MARKED %
  // ==========================================

  const markedPercentage =
    selectedClassData && selectedClassData.students > 0
      ? ((totalMarked / selectedClassData.students) * 100).toFixed(2)
      : "0.00";

  // ==========================================
  // NOT MARKED
  // ==========================================

  const notMarked =
    selectedClassData.students - totalMarked;

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    loadAttendance();
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="attendance-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="attendance-header">

        <div>
          <span className="attendance-label">
            ATTENDANCE / CLASS ANALYTICS
          </span>

          <h1>Attendance</h1>

          <p>
            Monitor today's attendance class-wise.
          </p>
        </div>

        <button
          className="attendance-refresh-btn"
          onClick={handleRefresh}
        >
          ↻ Refresh
        </button>

      </div>


      {/* ======================================
          CLASS SELECTOR
      ====================================== */}

      <div className="attendance-class-selector">

        <div className="selector-heading">

          <span>
            SELECT CLASS
          </span>

          <h2>
            Class Attendance
          </h2>

        </div>

        <div className="class-buttons">

          {classes.map((classItem) => (

            <button
              key={classItem.name}
              className={
                selectedClass === classItem.name
                  ? "class-select-btn active"
                  : "class-select-btn"
              }
              onClick={() =>
                setSelectedClass(classItem.name)
              }
            >

              <strong>
                {classItem.name}
              </strong>

              <small>
                {classItem.students} Students
              </small>

            </button>

          ))}

        </div>

      </div>


      {/* ======================================
          CLASS INFORMATION
      ====================================== */}

      <div className="selected-class-info">

        <div>

          <span>
            CURRENT CLASS
          </span>

          <h2>
            {selectedClass}
          </h2>

          <p>
            {selectedClassData?.fullName}
          </p>

        </div>

        <div className="today-badge">
          TODAY
          <strong>
            {getTodayDate()}
          </strong>
        </div>

      </div>


      {/* ======================================
          ATTENDANCE CARDS
      ====================================== */}

      {loading ? (

        <div className="attendance-loading">
          Loading attendance...
        </div>

      ) : (

        <div className="attendance-summary">

          {/* TOTAL */}

          <div className="attendance-card">

            <span>
              TOTAL STUDENTS
            </span>

            <strong>
              {selectedClassData.students}
            </strong>

            <small>
              Students in {selectedClass}
            </small>

          </div>


          {/* PRESENT */}

          <div className="attendance-card present-card">

            <span>
              PRESENT
            </span>

            <strong>
              {presentCount}
            </strong>

            <small>
              {attendancePercentage}% attendance
            </small>

          </div>


          {/* ABSENT */}

          <div className="attendance-card absent-card">

            <span>
              ABSENT
            </span>

            <strong>
              {absentCount}
            </strong>

            <small>
              Students absent today
            </small>

          </div>


          {/* NOT MARKED */}

          <div className="attendance-card pending-card">

            <span>
              NOT MARKED
            </span>

            <strong>
              {notMarked}
            </strong>

            <small>
              Attendance pending
            </small>

          </div>

        </div>

      )}


      {/* ======================================
          BIG ATTENDANCE %
      ====================================== */}

      <div className="attendance-percentage-container">

        <div className="percentage-content">

          <span>
            TODAY'S ATTENDANCE
          </span>

          <h2>
            {attendancePercentage}%
          </h2>

          <p>
            {selectedClass} class attendance
          </p>

        </div>


        {/* CIRCLE */}

        <div className="percentage-circle">

          <div
            className="percentage-progress"
            style={{
              background: `conic-gradient(
                #2563eb ${attendancePercentage * 3.6}deg,
                #edf2f7 ${attendancePercentage * 3.6}deg
              )`,
            }}
          >

            <div className="percentage-inner">

              <strong>
                {attendancePercentage}%
              </strong>

              <span>
                Present
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* ======================================
          STATUS BAR
      ====================================== */}

      <div className="attendance-status-container">

        <div className="status-header">

          <div>

            <span>
              ATTENDANCE STATUS
            </span>

            <h2>
              Today's Overview
            </h2>

          </div>

          <strong>
            {totalMarked} / {selectedClassData.students}
          </strong>

        </div>


        <div className="attendance-progress">

          <div
            className="attendance-progress-fill"
            style={{
              width: `${markedPercentage}%`,
            }}
          />

        </div>


        <div className="progress-info">

          <span>
            {markedPercentage}% Attendance Marked
          </span>

          <span>
            {notMarked} Remaining
          </span>

        </div>

      </div>


      {/* ======================================
          RECORDS
      ====================================== */}

      <div className="attendance-records">

        <div className="records-header">

          <div>

            <span>
              TODAY'S RECORDS
            </span>

            <h2>
              {selectedClass} Attendance
            </h2>

          </div>

          <div className="records-count">
            {todayAttendance.length} Records
          </div>

        </div>


        {todayAttendance.length === 0 ? (

          <div className="no-attendance">

            <div>
              📋
            </div>

            <h3>
              No Attendance Marked
            </h3>

            <p>
              Attendance for {selectedClass} has not
              been marked today.
            </p>

          </div>

        ) : (

          <div className="attendance-record-table">

            <table>

              <thead>

                <tr>
                  <th>ROLL NO.</th>
                  <th>STUDENT</th>
                  <th>GENDER</th>
                  <th>TIME</th>
                  <th>STATUS</th>
                </tr>

              </thead>

              <tbody>

                {todayAttendance.map(
                  (record, index) => (

                    <tr key={index}>

                      <td>
                        {record.rollNo}
                      </td>

                      <td>
                        <strong>
                          {record.studentName}
                        </strong>
                      </td>

                      <td>
                        {record.gender}
                      </td>

                      <td>
                        {record.time}
                      </td>

                      <td>

                        {record.status === "Present" ? (

                          <span className="status-present">
                            ✓ Present
                          </span>

                        ) : (

                          <span className="status-absent">
                            × Absent
                          </span>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Attendance;