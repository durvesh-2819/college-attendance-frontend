import { useEffect, useState } from "react";
import "../css/Reports.css";

function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [reportType, setReportType] = useState("Daily");

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [reportGenerated, setReportGenerated] = useState(false);

  // =====================================================
  // BACKEND URL
  // =====================================================

  const API_URL =
    "https://college-attendance-backend-gkah.onrender.com";

  // =====================================================
  // GET ATTENDANCE DATA
  // =====================================================

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/attendance`
        );

        const data = await response.json();

        console.log("REPORT API DATA:", data);

        if (data.success) {
          setAttendance(data.attendance || []);
        } else {
          setAttendance([]);
        }
      } catch (error) {
        console.error("Reports Error:", error);
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  // =====================================================
  // CLASSES
  // =====================================================

  const classes = [
    "All",
    "CSE",
    "IT",
    "AI & DS",
    "ENTC",
  ];

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDateForExcel = (date) => {
    const day = String(date.getDate()).padStart(2, "0");

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // =====================================================
  // PARSE EXCEL DATE
  // DD-MM-YYYY
  // =====================================================

  const parseExcelDate = (dateString) => {
    if (!dateString) {
      return null;
    }

    const parts = String(dateString).split("-");

    if (parts.length !== 3) {
      return null;
    }

    const day = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const year = Number(parts[2]);

    return new Date(
      year,
      month,
      day
    );
  };

  // =====================================================
  // REPORT DATE FILTER
  // =====================================================

  const isDateInReport = (itemDate) => {
    if (!selectedDate) {
      return false;
    }

    const selected = new Date(
      `${selectedDate}T00:00:00`
    );

    // =================================================
    // DAILY
    // =================================================

    if (reportType === "Daily") {
      return (
        itemDate ===
        formatDateForExcel(selected)
      );
    }

    // =================================================
    // WEEKLY
    // =================================================

    if (reportType === "Weekly") {
      const startDate = new Date(selected);

      const day = startDate.getDay();

      const difference =
        day === 0
          ? -6
          : 1 - day;

      startDate.setDate(
        startDate.getDate() + difference
      );

      startDate.setHours(
        0,
        0,
        0,
        0
      );

      const endDate = new Date(
        startDate
      );

      endDate.setDate(
        endDate.getDate() + 6
      );

      endDate.setHours(
        23,
        59,
        59,
        999
      );

      const item = parseExcelDate(
        itemDate
      );

      if (!item) {
        return false;
      }

      return (
        item >= startDate &&
        item <= endDate
      );
    }

    // =================================================
    // MONTHLY
    // =================================================

    if (reportType === "Monthly") {
      const item = parseExcelDate(
        itemDate
      );

      if (!item) {
        return false;
      }

      return (
        item.getMonth() ===
          selected.getMonth() &&
        item.getFullYear() ===
          selected.getFullYear()
      );
    }

    return false;
  };

  // =====================================================
  // FILTER ATTENDANCE
  // =====================================================

  const filteredAttendance =
    attendance.filter((item) => {

      // -------------------------------------------------
      // SEARCH
      // -------------------------------------------------

      const studentName =
        String(
          item.studentName || ""
        ).toLowerCase();

      const rollNo =
        String(
          item.rollNo || ""
        );

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        studentName.includes(
          searchText
        ) ||
        rollNo.includes(
          searchText
        );

      // -------------------------------------------------
      // CLASS
      // -------------------------------------------------

      const itemClass =
        String(
          item.className || ""
        ).trim();

      const matchesClass =
        selectedClass === "All" ||
        itemClass === selectedClass;

      // -------------------------------------------------
      // DATE
      // -------------------------------------------------

      const matchesDate =
        !reportGenerated ||
        isDateInReport(
          item.date
        );

      return (
        matchesSearch &&
        matchesClass &&
        matchesDate
      );
    });

  // =====================================================
  // GENERATE REPORT
  // =====================================================

  const generateReport = () => {
    setReportGenerated(true);
  };

  // =====================================================
  // REPORT TITLE
  // =====================================================

  const getReportTitle = () => {
    if (reportType === "Daily") {
      return `Daily Report - ${selectedDate}`;
    }

    if (reportType === "Weekly") {
      return `Weekly Report - ${selectedDate}`;
    }

    return `Monthly Report - ${selectedDate}`;
  };

  // =====================================================
  // DOWNLOAD PDF
  // =====================================================

  const downloadPDF = async () => {
    if (
      filteredAttendance.length === 0
    ) {
      alert(
        "No attendance records available."
      );

      return;
    }

    try {
      const { jsPDF } =
        await import("jspdf");

      const autoTable =
        (
          await import(
            "jspdf-autotable"
          )
        ).default;

      const doc = new jsPDF();

      // =================================================
      // HEADER
      // =================================================

      doc.setFontSize(18);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "COLLEGE ATTENDANCE MANAGEMENT SYSTEM",
        14,
        18
      );

      doc.setFontSize(11);

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        getReportTitle(),
        14,
        27
      );

      doc.text(
        `Class: ${
          selectedClass === "All"
            ? "All Classes"
            : selectedClass
        }`,
        14,
        34
      );

      // =================================================
      // TABLE DATA
      // =================================================

      const tableRows =
        filteredAttendance.map(
          (item) => [
            item.date || "-",
            item.time || "-",
            item.className || "-",
            item.rollNo || "-",
            item.studentName || "-",
            item.gender || "-",
            item.status || "-",
          ]
        );

      autoTable(doc, {
        startY: 42,

        head: [[
          "Date",
          "Time",
          "Class",
          "Roll No.",
          "Student Name",
          "Gender",
          "Status",
        ]],

        body: tableRows,

        theme: "grid",

        styles: {
          fontSize: 8,
          cellPadding: 3,
        },

        headStyles: {
          fontSize: 8,
          fontStyle: "bold",
        },

        alternateRowStyles: {
          fillColor: [
            245,
            247,
            250,
          ],
        },

        margin: {
          left: 10,
          right: 10,
        },
      });

      // =================================================
      // FOOTER
      // =================================================

      const finalY =
        doc.lastAutoTable.finalY +
        10;

      doc.setFontSize(9);

      doc.text(
        `Total Records: ${filteredAttendance.length}`,
        14,
        finalY
      );

      // =================================================
      // FILE NAME
      // =================================================

      const className =
        selectedClass === "All"
          ? "All_Classes"
          : selectedClass.replace(
              /&/g,
              "and"
            );

      doc.save(
        `Attendance_Report_${reportType}_${className}.pdf`
      );

    } catch (error) {
      console.error(
        "PDF Error:",
        error
      );

      alert(
        "PDF download failed. Please check jspdf and jspdf-autotable packages."
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="reports-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="reports-header">

        <div>

          <span className="reports-label">
            ATTENDANCE / REPORTS
          </span>

          <h1>
            Attendance Reports
          </h1>

          <p>
            Generate daily, weekly and
            monthly attendance reports.
          </p>

        </div>

        <div className="reports-total">

          <span>
            Total Records
          </span>

          <strong>
            {attendance.length}
          </strong>

        </div>

      </div>


      {/* =================================================
          REPORT GENERATOR
      ================================================= */}

      <div className="report-generator">

        <div className="generator-title">

          <span>
            REPORT GENERATOR
          </span>

          <h2>
            Generate Attendance Report
          </h2>

        </div>


        <div className="generator-controls">

          {/* =================================================
              CLASS
          ================================================= */}

          <div className="control-group">

            <label>
              Select Class
            </label>

            <select
              value={selectedClass}
              onChange={(e) => {

                setSelectedClass(
                  e.target.value
                );

                setReportGenerated(
                  false
                );
              }}
            >

              {classes.map(
                (className) => (

                  <option
                    key={className}
                    value={className}
                  >
                    {className === "All"
                      ? "All Classes"
                      : className}
                  </option>

                )
              )}

            </select>

          </div>


          {/* =================================================
              REPORT TYPE
          ================================================= */}

          <div className="control-group">

            <label>
              Report Type
            </label>

            <select
              value={reportType}
              onChange={(e) => {

                setReportType(
                  e.target.value
                );

                setReportGenerated(
                  false
                );
              }}
            >

              <option value="Daily">
                Daily
              </option>

              <option value="Weekly">
                Weekly
              </option>

              <option value="Monthly">
                Monthly
              </option>

            </select>

          </div>


          {/* =================================================
              DATE
          ================================================= */}

          <div className="control-group">

            <label>
              Select Date
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {

                setSelectedDate(
                  e.target.value
                );

                setReportGenerated(
                  false
                );
              }}
            />

          </div>


          {/* =================================================
              GENERATE
          ================================================= */}

          <button
            className="generate-report-btn"
            onClick={
              generateReport
            }
          >
            Generate Report

            <span>
              →
            </span>

          </button>

        </div>

      </div>


      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="reports-controls">

        <div className="search-box">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search student or roll number..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>


      {/* =================================================
          REPORT TABLE
      ================================================= */}

      <div className="reports-container">

        <div className="reports-table-header">

          <div>

            <span>
              ATTENDANCE RECORDS
            </span>

            <h2>
              {reportGenerated
                ? getReportTitle()
                : "Student Attendance"}
            </h2>

          </div>


          <div className="report-actions">

            <div className="record-count">

              {filteredAttendance.length}

              {" "}

              Records

            </div>


            {reportGenerated &&
              filteredAttendance.length >
                0 && (

                <button
                  className="download-pdf-btn"
                  onClick={
                    downloadPDF
                  }
                >
                  ↓ Download PDF
                </button>

              )}

          </div>

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="reports-loading">

            Loading attendance...

          </div>

        ) : !reportGenerated ? (

          /* =================================================
             BEFORE REPORT GENERATION
          ================================================= */

          <div className="reports-empty">

            <div>
              📊
            </div>

            <h3>
              Generate a Report
            </h3>

            <p>
              Select class, report type
              and date, then click
              Generate Report.
            </p>

          </div>

        ) : filteredAttendance.length ===
          0 ? (

          /* =================================================
             NO DATA
          ================================================= */

          <div className="reports-empty">

            <div>
              📋
            </div>

            <h3>
              No Attendance Records
            </h3>

            <p>
              No attendance was found
              for the selected class
              and date.
            </p>

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="reports-table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    DATE
                  </th>

                  <th>
                    TIME
                  </th>

                  <th>
                    CLASS
                  </th>

                  <th>
                    ROLL NO.
                  </th>

                  <th>
                    STUDENT
                  </th>

                  <th>
                    GENDER
                  </th>

                  <th>
                    STATUS
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredAttendance.map(
                  (item, index) => (

                    <tr
                      key={`${item.date}-${item.rollNo}-${index}`}
                    >

                      {/* DATE */}

                      <td>
                        {item.date || "-"}
                      </td>


                      {/* TIME */}

                      <td>
                        {item.time || "-"}
                      </td>


                      {/* CLASS */}

                      <td>

                        <span className="class-badge">

                          {item.className ||
                            "-"}

                        </span>

                      </td>


                      {/* ROLL NO */}

                      <td>

                        <span className="report-roll">

                          {item.rollNo ||
                            "-"}

                        </span>

                      </td>


                      {/* STUDENT */}

                      <td>

                        <div className="report-student">

                          <div className="report-avatar">

                            {item.studentName
                              ?.charAt(
                                0
                              )
                              .toUpperCase()}

                          </div>

                          <strong>

                            {item.studentName ||
                              "-"}

                          </strong>

                        </div>

                      </td>


                      {/* GENDER */}

                      <td>
                        {item.gender ||
                          "-"}
                      </td>


                      {/* STATUS */}

                      <td>

                        {item.status ===
                        "Present" ? (

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

export default Reports;