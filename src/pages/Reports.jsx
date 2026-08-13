import { useEffect, useState } from "react";
import "../css/Reports.css";

function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  const [reportType, setReportType] = useState("Daily");

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);

  const [reportGenerated, setReportGenerated] = useState(false);

  // =====================================================
  // GET ATTENDANCE DATA
  // =====================================================

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/attendance")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAttendance(data.attendance);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Reports Error:", error);
        setLoading(false);
      });
  }, []);

  // =====================================================
  // CLASSES
  // =====================================================

  const classes = [
    "All",
    ...new Set(
      attendance
        .map((item) => item.className)
        .filter(Boolean)
    ),
  ];

  // =====================================================
  // DATE HELPERS
  // =====================================================

  const formatDateForExcel = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // =====================================================
  // REPORT DATE FILTER
  // =====================================================

  const isDateInReport = (itemDate) => {
    if (!selectedDate) return false;

    const selected = new Date(`${selectedDate}T00:00:00`);

    // ---------------------------------------------
    // DAILY
    // ---------------------------------------------

    if (reportType === "Daily") {
      return itemDate === formatDateForExcel(selected);
    }

    // ---------------------------------------------
    // WEEKLY
    // ---------------------------------------------

    if (reportType === "Weekly") {
      const startDate = new Date(selected);

      const day = startDate.getDay();

      const difference = day === 0 ? -6 : 1 - day;

      startDate.setDate(
        startDate.getDate() + difference
      );

      const endDate = new Date(startDate);

      endDate.setDate(
        endDate.getDate() + 6
      );

      const [dayPart, monthPart, yearPart] =
        itemDate.split("-");

      const item = new Date(
        `${yearPart}-${monthPart}-${dayPart}T00:00:00`
      );

      return (
        item >= startDate &&
        item <= endDate
      );
    }

    // ---------------------------------------------
    // MONTHLY
    // ---------------------------------------------

    if (reportType === "Monthly") {
      const [dayPart, monthPart, yearPart] =
        itemDate.split("-");

      return (
        Number(monthPart) ===
          selected.getMonth() + 1 &&
        Number(yearPart) ===
          selected.getFullYear()
      );
    }

    return false;
  };

  // =====================================================
  // FILTER ATTENDANCE
  // =====================================================

  const filteredAttendance = attendance.filter((item) => {
    const matchesSearch =
      item.studentName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      String(item.rollNo).includes(search);

    const matchesClass =
      selectedClass === "All" ||
      item.className === selectedClass;

    const matchesDate =
      !reportGenerated ||
      isDateInReport(item.date);

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
    if (filteredAttendance.length === 0) {
      alert("No attendance records available.");
      return;
    }

    try {
      const { jsPDF } = await import("jspdf");
      const autoTable =
        (await import("jspdf-autotable")).default;

      const doc = new jsPDF();

      // ---------------------------------------------
      // HEADER
      // ---------------------------------------------

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");

      doc.text(
        "COLLEGE ATTENDANCE MANAGEMENT SYSTEM",
        14,
        18
      );

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");

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

      // ---------------------------------------------
      // TABLE
      // ---------------------------------------------

      const tableRows =
        filteredAttendance.map((item) => [
          item.date,
          item.time,
          item.className,
          item.rollNo,
          item.studentName,
          item.gender,
          item.status,
        ]);

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
          fillColor: [245, 247, 250],
        },

        margin: {
          left: 10,
          right: 10,
        },
      });

      // ---------------------------------------------
      // FOOTER
      // ---------------------------------------------

      const finalY =
        doc.lastAutoTable.finalY + 10;

      doc.setFontSize(9);

      doc.text(
        `Total Records: ${filteredAttendance.length}`,
        14,
        finalY
      );

      doc.save(
        `Attendance_Report_${reportType}_${selectedClass}.pdf`
      );

    } catch (error) {
      console.error("PDF Error:", error);

      alert(
        "PDF download failed. Please check PDF packages."
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="reports-page">

      {/* HEADER */}

      <div className="reports-header">

        <div>

          <span className="reports-label">
            ATTENDANCE / REPORTS
          </span>

          <h1>
            Attendance Reports
          </h1>

          <p>
            Generate daily, weekly and monthly
            attendance reports.
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


      {/* REPORT CONTROLS */}

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

          {/* CLASS */}

          <div className="control-group">

            <label>
              Select Class
            </label>

            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setReportGenerated(false);
              }}
            >

              {classes.map((className) => (

                <option
                  key={className}
                  value={className}
                >
                  {className === "All"
                    ? "All Classes"
                    : className}
                </option>

              ))}

            </select>

          </div>


          {/* REPORT TYPE */}

          <div className="control-group">

            <label>
              Report Type
            </label>

            <select
              value={reportType}
              onChange={(e) => {
                setReportType(e.target.value);
                setReportGenerated(false);
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


          {/* DATE */}

          <div className="control-group">

            <label>
              Select Date
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setReportGenerated(false);
              }}
            />

          </div>


          {/* GENERATE */}

          <button
            className="generate-report-btn"
            onClick={generateReport}
          >
            Generate Report
            <span>→</span>
          </button>

        </div>

      </div>


      {/* SEARCH */}

      <div className="reports-controls">

        <div className="search-box">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search student or roll number..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>


      {/* REPORT TABLE */}

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
              {" "}Records
            </div>

            {reportGenerated &&
              filteredAttendance.length > 0 && (

                <button
                  className="download-pdf-btn"
                  onClick={downloadPDF}
                >
                  ↓ Download PDF
                </button>

              )}

          </div>

        </div>


        {/* CONTENT */}

        {loading ? (

          <div className="reports-loading">
            Loading attendance...
          </div>

        ) : !reportGenerated ? (

          <div className="reports-empty">

            <div>📊</div>

            <h3>
              Generate a Report
            </h3>

            <p>
              Select class, report type and date,
              then click Generate Report.
            </p>

          </div>

        ) : filteredAttendance.length === 0 ? (

          <div className="reports-empty">

            <div>📋</div>

            <h3>
              No Attendance Records
            </h3>

            <p>
              No attendance was found for the
              selected class and date.
            </p>

          </div>

        ) : (

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

                    <tr key={index}>

                      <td>
                        {item.date}
                      </td>

                      <td>
                        {item.time}
                      </td>

                      <td>

                        <span className="class-badge">
                          {item.className}
                        </span>

                      </td>

                      <td>

                        <span className="report-roll">
                          {item.rollNo}
                        </span>

                      </td>

                      <td>

                        <div className="report-student">

                          <div className="report-avatar">

                            {item.studentName
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>

                          <strong>
                            {item.studentName}
                          </strong>

                        </div>

                      </td>

                      <td>
                        {item.gender}
                      </td>

                      <td>

                        {item.status === "Present" ? (

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