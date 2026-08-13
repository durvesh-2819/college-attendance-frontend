import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SelectClass.css";

function SelectClass() {
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState(null);

  const classes = [
    {
      id: 1,
      name: "CSE",
      fullName: "",
      students: 45,
      icon: "CS",
    },
    {
      id: 2,
      name: "IT",
      fullName: "",
      students: 45,
      icon: "IT",
    },
    {
      id: 3,
      name: "AI & DS",
      fullName: "",
      students: 45,
      icon: "AI",
    },
    {
      id: 4,
      name: "ENTC",
      fullName: "",
      students: 45,
      icon: "EC",
    },
  ];

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
  };

  const openStudents = () => {
    if (!selectedClass) return;

    navigate("/students", {
      state: {
        classData: selectedClass,
      },
    });
  };

  return (
    <div className="select-class-page">

      {/* Background Effects */}
      <div className="select-glow select-glow-one"></div>
      <div className="select-glow select-glow-two"></div>

      {/* Header */}
      <div className="select-class-header">

        <div className="select-heading">

          <span className="page-label">
            COLLEGE DATA / CLASS MANAGEMENT
          </span>

          <h1>
            Select Your <span>Class</span>
          </h1>

          <p>
            Choose a class to view students and manage daily attendance.
          </p>

        </div>

        <div className="class-count">

          <span>Total Classes</span>

          <strong>{classes.length}</strong>

          <small>Available Classes</small>

        </div>

      </div>

      {/* Class Cards */}
      <div className="class-grid">

        {classes.map((classItem) => (

          <div
            key={classItem.id}
            className={`class-card ${
              selectedClass?.id === classItem.id
                ? "selected"
                : ""
            }`}
            onClick={() => handleClassSelect(classItem)}
          >

            {/* Top */}
            <div className="class-card-top">

              <div className="class-icon">
                {classItem.icon}
              </div>

              <div className="class-number">
                0{classItem.id}
              </div>

              <span className="class-arrow">
                ↗
              </span>

            </div>

            {/* Information */}
            <div className="class-info">

              <span className="class-tag">
                ENGINEERING
              </span>

              <h2>
                {classItem.name}
              </h2>

              <p>
                {classItem.fullName}
              </p>

            </div>

            {/* Footer */}
            <div className="class-footer">

              <div className="student-total">

                <strong>
                  {classItem.students}
                </strong>

                <span>
                  Students
                </span>

              </div>

              <span className="view-text">
                {selectedClass?.id === classItem.id
                  ? "Selected ✓"
                  : "Select Class →"}
              </span>

            </div>

          </div>

        ))}

      </div>

      {/* Selected Class */}
      {selectedClass && (

        <div className="selected-class-bar">

          <div className="selected-class-info">

            <span>
              SELECTED CLASS
            </span>

            <h3>
              {selectedClass.name}

              <small>
                {selectedClass.fullName}
              </small>
            </h3>

          </div>

          <div className="selected-class-action">

            <div className="selected-students">
              <strong>
                {selectedClass.students}
              </strong>

              <span>
                Students
              </span>
            </div>

            <button onClick={openStudents}>

              View Students

              <span>
                →
              </span>

            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default SelectClass;