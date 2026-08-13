import { useLocation, useNavigate } from "react-router-dom";
import "../css/Students.css";
import { useState, useEffect } from "react";
import {
  markAttendance,
  getAttendance
} from "../services/api";


function Students() {
  const location = useLocation();
  const navigate = useNavigate();

  const classData = location.state?.classData;
  const [attendance, setAttendance] = useState({});

 useEffect(() => {

  const loadTodayAttendance = async () => {

    try {

      const response = await getAttendance();

      if (!response.success) {
        return;
      }


      // =====================================
      // TODAY DATE
      // =====================================

      const today = new Date();

      const todayDate =
        String(today.getDate()).padStart(2, "0") +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        today.getFullYear();


      // =====================================
      // TODAY ATTENDANCE
      // =====================================

      const todayAttendance = {};


      response.attendance.forEach((record) => {

        if (
          record.date === todayDate &&
          record.className === classData?.name
        ) {

          todayAttendance[
            String(record.rollNo)
          ] = record.status;

        }

      });


      setAttendance(todayAttendance);


    } catch (error) {

      console.error(
        "Attendance loading failed:",
        error
      );

    }

  };


  if (classData) {

    loadTodayAttendance();

  }

}, [classData]);

  // =========================
  // CSE - 45 STUDENTS
  // 25 GIRLS + 20 BOYS
  // =========================
  const cseStudents = [
    // Girls
    { id: 1, rollNo: "01", name: "Ananya Patil", gender: "Female" },
    { id: 2, rollNo: "02", name: "Sakshi Jadhav", gender: "Female" },
    { id: 3, rollNo: "03", name: "Aditi Chavan", gender: "Female" },
    { id: 4, rollNo: "04", name: "Shruti More", gender: "Female" },
    { id: 5, rollNo: "05", name: "Isha Kulkarni", gender: "Female" },
    { id: 6, rollNo: "06", name: "Riya Patil", gender: "Female" },
    { id: 7, rollNo: "07", name: "Snehal Pawar", gender: "Female" },
    { id: 8, rollNo: "08", name: "Mrunal Deshmukh", gender: "Female" },
    { id: 9, rollNo: "09", name: "Pooja Shinde", gender: "Female" },
    { id: 10, rollNo: "10", name: "Neha More", gender: "Female" },
    { id: 11, rollNo: "11", name: "Tanvi Joshi", gender: "Female" },
    { id: 12, rollNo: "12", name: "Vaishnavi Patil", gender: "Female" },
    { id: 13, rollNo: "13", name: "Prachi Kadam", gender: "Female" },
    { id: 14, rollNo: "14", name: "Komal Jadhav", gender: "Female" },
    { id: 15, rollNo: "15", name: "Manasi Bhosale", gender: "Female" },
    { id: 16, rollNo: "16", name: "Gauri Sawant", gender: "Female" },
    { id: 17, rollNo: "17", name: "Rutuja Patil", gender: "Female" },
    { id: 18, rollNo: "18", name: "Kavya More", gender: "Female" },
    { id: 19, rollNo: "19", name: "Pallavi Shinde", gender: "Female" },
    { id: 20, rollNo: "20", name: "Sonal Chavan", gender: "Female" },
    { id: 21, rollNo: "21", name: "Mitali Pawar", gender: "Female" },
    { id: 22, rollNo: "22", name: "Radhika Jadhav", gender: "Female" },
    { id: 23, rollNo: "23", name: "Kiran Patil", gender: "Female" },
    { id: 24, rollNo: "24", name: "Shreya Kulkarni", gender: "Female" },
    { id: 25, rollNo: "25", name: "Akanksha More", gender: "Female" },

    // Boys
    { id: 26, rollNo: "26", name: "Aditya Patil", gender: "Male" },
    { id: 27, rollNo: "27", name: "Atharva Jadhav", gender: "Male" },
    { id: 28, rollNo: "28", name: "Soham Chavan", gender: "Male" },
    { id: 29, rollNo: "29", name: "Omkar More", gender: "Male" },
    { id: 30, rollNo: "30", name: "Aarav Patil", gender: "Male" },
    { id: 31, rollNo: "31", name: "Rohit Pawar", gender: "Male" },
    { id: 32, rollNo: "32", name: "Prathamesh Shinde", gender: "Male" },
    { id: 33, rollNo: "33", name: "Yash Jadhav", gender: "Male" },
    { id: 34, rollNo: "34", name: "Shubham Patil", gender: "Male" },
    { id: 35, rollNo: "35", name: "Abhishek More", gender: "Male" },
    { id: 36, rollNo: "36", name: "Akash Chavan", gender: "Male" },
    { id: 37, rollNo: "37", name: "Sanket Pawar", gender: "Male" },
    { id: 38, rollNo: "38", name: "Vaibhav Patil", gender: "Male" },
    { id: 39, rollNo: "39", name: "Harshad Jadhav", gender: "Male" },
    { id: 40, rollNo: "40", name: "Kunal More", gender: "Male" },
    { id: 41, rollNo: "41", name: "Nikhil Shinde", gender: "Male" },
    { id: 42, rollNo: "42", name: "Tejas Patil", gender: "Male" },
    { id: 43, rollNo: "43", name: "Ruturaj Chavan", gender: "Male" },
    { id: 44, rollNo: "44", name: "Siddhant Pawar", gender: "Male" },
    { id: 45, rollNo: "45", name: "Vedant Jadhav", gender: "Male" },
  ];

  // =========================
  // IT - 45 STUDENTS
  // 25 GIRLS + 20 BOYS
  // =========================
  const itStudents = [
    // Girls
    { id: 101, rollNo: "01", name: "Aarohi Desai", gender: "Female" },
    { id: 102, rollNo: "02", name: "Shivani Patil", gender: "Female" },
    { id: 103, rollNo: "03", name: "Madhura Jadhav", gender: "Female" },
    { id: 104, rollNo: "04", name: "Pallavi More", gender: "Female" },
    { id: 105, rollNo: "05", name: "Sneha Kulkarni", gender: "Female" },
    { id: 106, rollNo: "06", name: "Nandini Pawar", gender: "Female" },
    { id: 107, rollNo: "07", name: "Sai Deshmukh", gender: "Female" },
    { id: 108, rollNo: "08", name: "Anushka Shinde", gender: "Female" },
    { id: 109, rollNo: "09", name: "Mansi Patil", gender: "Female" },
    { id: 110, rollNo: "10", name: "Suhani Jadhav", gender: "Female" },
    { id: 111, rollNo: "11", name: "Rutuja More", gender: "Female" },
    { id: 112, rollNo: "12", name: "Poonam Patil", gender: "Female" },
    { id: 113, rollNo: "13", name: "Tejal Pawar", gender: "Female" },
    { id: 114, rollNo: "14", name: "Amruta Shinde", gender: "Female" },
    { id: 115, rollNo: "15", name: "Sakshi Bhosale", gender: "Female" },
    { id: 116, rollNo: "16", name: "Roshni More", gender: "Female" },
    { id: 117, rollNo: "17", name: "Kajal Patil", gender: "Female" },
    { id: 118, rollNo: "18", name: "Divya Jadhav", gender: "Female" },
    { id: 119, rollNo: "19", name: "Sonali Pawar", gender: "Female" },
    { id: 120, rollNo: "20", name: "Rupali Deshmukh", gender: "Female" },
    { id: 121, rollNo: "21", name: "Aishwarya More", gender: "Female" },
    { id: 122, rollNo: "22", name: "Bhagyashree Patil", gender: "Female" },
    { id: 123, rollNo: "23", name: "Harshada Shinde", gender: "Female" },
    { id: 124, rollNo: "24", name: "Sayali Jadhav", gender: "Female" },
    { id: 125, rollNo: "25", name: "Mrunali Pawar", gender: "Female" },

    // Boys
    { id: 126, rollNo: "26", name: "Akshay Patil", gender: "Male" },
    { id: 127, rollNo: "27", name: "Rohan Jadhav", gender: "Male" },
    { id: 128, rollNo: "28", name: "Saurabh More", gender: "Male" },
    { id: 129, rollNo: "29", name: "Vishal Pawar", gender: "Male" },
    { id: 130, rollNo: "30", name: "Niranjan Patil", gender: "Male" },
    { id: 131, rollNo: "31", name: "Abhinav Shinde", gender: "Male" },
    { id: 132, rollNo: "32", name: "Rishabh Jadhav", gender: "Male" },
    { id: 133, rollNo: "33", name: "Swaraj More", gender: "Male" },
    { id: 134, rollNo: "34", name: "Amey Patil", gender: "Male" },
    { id: 135, rollNo: "35", name: "Akash Pawar", gender: "Male" },
    { id: 136, rollNo: "36", name: "Nilesh Shinde", gender: "Male" },
    { id: 137, rollNo: "37", name: "Mayur Jadhav", gender: "Male" },
    { id: 138, rollNo: "38", name: "Rohit More", gender: "Male" },
    { id: 139, rollNo: "39", name: "Kartik Patil", gender: "Male" },
    { id: 140, rollNo: "40", name: "Harsh Pawar", gender: "Male" },
    { id: 141, rollNo: "41", name: "Yashwant Shinde", gender: "Male" },
    { id: 142, rollNo: "42", name: "Pranav Jadhav", gender: "Male" },
    { id: 143, rollNo: "43", name: "Chaitanya More", gender: "Male" },
    { id: 144, rollNo: "44", name: "Manav Patil", gender: "Male" },
    { id: 145, rollNo: "45", name: "Rudra Pawar", gender: "Male" },
  ];

  // =========================
  // AI & DS - 45 STUDENTS
  // 25 GIRLS + 20 BOYS
  // =========================
  const aiDsStudents = [
    // Girls
    { id: 201, rollNo: "01", name: "Aarya Patil", gender: "Female" },
    { id: 202, rollNo: "02", name: "Diya Jadhav", gender: "Female" },
    { id: 203, rollNo: "03", name: "Myra Chavan", gender: "Female" },
    { id: 204, rollNo: "04", name: "Ira More", gender: "Female" },
    { id: 205, rollNo: "05", name: "Avani Kulkarni", gender: "Female" },
    { id: 206, rollNo: "06", name: "Kiara Patil", gender: "Female" },
    { id: 207, rollNo: "07", name: "Navya Pawar", gender: "Female" },
    { id: 208, rollNo: "08", name: "Samaira Deshmukh", gender: "Female" },
    { id: 209, rollNo: "09", name: "Anvi Shinde", gender: "Female" },
    { id: 210, rollNo: "10", name: "Prisha More", gender: "Female" },
    { id: 211, rollNo: "11", name: "Vanya Patil", gender: "Female" },
    { id: 212, rollNo: "12", name: "Shanaya Jadhav", gender: "Female" },
    { id: 213, rollNo: "13", name: "Anika Pawar", gender: "Female" },
    { id: 214, rollNo: "14", name: "Meera Shinde", gender: "Female" },
    { id: 215, rollNo: "15", name: "Ishita More", gender: "Female" },
    { id: 216, rollNo: "16", name: "Reva Patil", gender: "Female" },
    { id: 217, rollNo: "17", name: "Tanishka Jadhav", gender: "Female" },
    { id: 218, rollNo: "18", name: "Saanvi Pawar", gender: "Female" },
    { id: 219, rollNo: "19", name: "Mahi Deshmukh", gender: "Female" },
    { id: 220, rollNo: "20", name: "Anushree Shinde", gender: "Female" },
    { id: 221, rollNo: "21", name: "Veda More", gender: "Female" },
    { id: 222, rollNo: "22", name: "Mahi Patil", gender: "Female" },
    { id: 223, rollNo: "23", name: "Riya Jadhav", gender: "Female" },
    { id: 224, rollNo: "24", name: "Siddhi Pawar", gender: "Female" },
    { id: 225, rollNo: "25", name: "Mokshada Patil", gender: "Female" },

    // Boys
    { id: 226, rollNo: "26", name: "Aryan Patil", gender: "Male" },
    { id: 227, rollNo: "27", name: "Vihaan Jadhav", gender: "Male" },
    { id: 228, rollNo: "28", name: "Reyansh More", gender: "Male" },
    { id: 229, rollNo: "29", name: "Kabir Pawar", gender: "Male" },
    { id: 230, rollNo: "30", name: "Ayaan Patil", gender: "Male" },
    { id: 231, rollNo: "31", name: "Arnav Shinde", gender: "Male" },
    { id: 232, rollNo: "32", name: "Darsh Jadhav", gender: "Male" },
    { id: 233, rollNo: "33", name: "Rudransh More", gender: "Male" },
    { id: 234, rollNo: "34", name: "Dhruv Patil", gender: "Male" },
    { id: 235, rollNo: "35", name: "Ishaan Pawar", gender: "Male" },
    { id: 236, rollNo: "36", name: "Atharva Shinde", gender: "Male" },
    { id: 237, rollNo: "37", name: "Kunal Jadhav", gender: "Male" },
    { id: 238, rollNo: "38", name: "Parth More", gender: "Male" },
    { id: 239, rollNo: "39", name: "Shrey Patil", gender: "Male" },
    { id: 240, rollNo: "40", name: "Rudra Pawar", gender: "Male" },
    { id: 241, rollNo: "41", name: "Aayush Shinde", gender: "Male" },
    { id: 242, rollNo: "42", name: "Ansh Jadhav", gender: "Male" },
    { id: 243, rollNo: "43", name: "Dev More", gender: "Male" },
    { id: 244, rollNo: "44", name: "Lakshya Patil", gender: "Male" },
    { id: 245, rollNo: "45", name: "Shaurya Pawar", gender: "Male" },
  ];

  // =========================
  // ENTC - 45 STUDENTS
  // 25 GIRLS + 20 BOYS
  // =========================
  const entcStudents = [
    // Girls
    { id: 301, rollNo: "01", name: "Poonam Patil", gender: "Female" },
    { id: 302, rollNo: "02", name: "Riya Jadhav", gender: "Female" },
    { id: 303, rollNo: "03", name: "Sakshi More", gender: "Female" },
    { id: 304, rollNo: "04", name: "Anjali Pawar", gender: "Female" },
    { id: 305, rollNo: "05", name: "Mansi Shinde", gender: "Female" },
    { id: 306, rollNo: "06", name: "Kashish Patil", gender: "Female" },
    { id: 307, rollNo: "07", name: "Shweta Jadhav", gender: "Female" },
    { id: 308, rollNo: "08", name: "Payal More", gender: "Female" },
    { id: 309, rollNo: "09", name: "Sonam Pawar", gender: "Female" },
    { id: 310, rollNo: "10", name: "Komal Shinde", gender: "Female" },
    { id: 311, rollNo: "11", name: "Vaishnavi Patil", gender: "Female" },
    { id: 312, rollNo: "12", name: "Prachi Jadhav", gender: "Female" },
    { id: 313, rollNo: "13", name: "Neha More", gender: "Female" },
    { id: 314, rollNo: "14", name: "Gauri Pawar", gender: "Female" },
    { id: 315, rollNo: "15", name: "Rutuja Shinde", gender: "Female" },
    { id: 316, rollNo: "16", name: "Kavya Patil", gender: "Female" },
    { id: 317, rollNo: "17", name: "Aditi Jadhav", gender: "Female" },
    { id: 318, rollNo: "18", name: "Shravani More", gender: "Female" },
    { id: 319, rollNo: "19", name: "Mrunal Pawar", gender: "Female" },
    { id: 320, rollNo: "20", name: "Tejal Shinde", gender: "Female" },
    { id: 321, rollNo: "21", name: "Ishwari Patil", gender: "Female" },
    { id: 322, rollNo: "22", name: "Manasi Jadhav", gender: "Female" },
    { id: 323, rollNo: "23", name: "Roshni More", gender: "Female" },
    { id: 324, rollNo: "24", name: "Sonal Pawar", gender: "Female" },
    { id: 325, rollNo: "25", name: "Akshata Shinde", gender: "Female" },

    // Boys
    { id: 326, rollNo: "26", name: "Rohit Patil", gender: "Male" },
    { id: 327, rollNo: "27", name: "Sanket Jadhav", gender: "Male" },
    { id: 328, rollNo: "28", name: "Omkar More", gender: "Male" },
    { id: 329, rollNo: "29", name: "Prathamesh Pawar", gender: "Male" },
    { id: 330, rollNo: "30", name: "Yash Shinde", gender: "Male" },
    { id: 331, rollNo: "31", name: "Siddhesh Patil", gender: "Male" },
    { id: 332, rollNo: "32", name: "Akshay Jadhav", gender: "Male" },
    { id: 333, rollNo: "33", name: "Vaibhav More", gender: "Male" },
    { id: 334, rollNo: "34", name: "Nikhil Pawar", gender: "Male" },
    { id: 335, rollNo: "35", name: "Swapnil Shinde", gender: "Male" },
    { id: 336, rollNo: "36", name: "Amol Patil", gender: "Male" },
    { id: 337, rollNo: "37", name: "Vivek Jadhav", gender: "Male" },
    { id: 338, rollNo: "38", name: "Karan More", gender: "Male" },
    { id: 339, rollNo: "39", name: "Shubham Pawar", gender: "Male" },
    { id: 340, rollNo: "40", name: "Ritesh Shinde", gender: "Male" },
    { id: 341, rollNo: "41", name: "Ganesh Patil", gender: "Male" },
    { id: 342, rollNo: "42", name: "Suraj Jadhav", gender: "Male" },
    { id: 343, rollNo: "43", name: "Dhananjay More", gender: "Male" },
    { id: 344, rollNo: "44", name: "Mangesh Pawar", gender: "Male" },
    { id: 345, rollNo: "45", name: "Sachin Shinde", gender: "Male" },
  ];

  // =========================
  // SELECT STUDENTS ACCORDING
  // TO SELECTED CLASS
  // =========================

  let students = [];

  if (classData?.name === "CSE") {
    students = cseStudents;
  } else if (classData?.name === "IT") {
    students = itStudents;
  } else if (classData?.name === "AI & DS") {
    students = aiDsStudents;
  } else if (classData?.name === "ENTC") {
    students = entcStudents;
  }

  // Add email and phone automatically
  students = students.map((student) => ({
    ...student,
    email:
      student.name.toLowerCase().replace(/\s+/g, ".") +
      "@college.com",
    phone: "98765" + String(student.id).padStart(5, "0"),
  }));


  const presentCount = Object.values(attendance).filter(
  (status) => status === "Present"
).length;

const absentCount = Object.values(attendance).filter(
  (status) => status === "Absent"
).length;

const attendancePercentage =
  students.length > 0
    ? ((presentCount / students.length) * 100).toFixed(2)
    : 0;

  // =========================
  // NO CLASS SELECTED
  // =========================

  if (!classData) {
    return (
      <div className="students-page empty-students">
        <h2>No Class Selected</h2>

        <p>Please select a class first.</p>

        <button onClick={() => navigate("/select-class")}>
          ← Select Class
        </button>
      </div>
    );
  }

  // =========================
  // STUDENTS PAGE
  // =========================

  return (
    <div className="students-page">

      {/* Header */}
      <div className="students-header">

        <div>
          <span className="page-label">
            COLLEGE DATA / STUDENTS
          </span>

          <h1>{classData.name} Students</h1>

          <p>{classData.fullName}</p>
        </div>

        <button
          className="back-class-btn"
          onClick={() => navigate("/select-class")}
        >
          ← Change Class
        </button>

      </div>

      {/* Summary */}
      <div className="students-summary">

        <div className="summary-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>

        <div className="summary-card">
          <span>Girls</span>
          <strong>
            {students.filter(
              (student) => student.gender === "Female"
            ).length}
          </strong>
        </div>

        <div className="summary-card">
          <span>Boys</span>
          <strong>
            {students.filter(
              (student) => student.gender === "Male"
            ).length}
          </strong>
        </div>


        <div className="summary-card">
  <span>Present</span>
  <strong>{presentCount}</strong>
</div>

<div className="summary-card">
  <span>Absent</span>
  <strong>{absentCount}</strong>
</div>

<div className="summary-card">
  <span>Attendance %</span>
  <strong>{attendancePercentage}%</strong>
</div>

      </div>

      {/* Student Table */}
      <div className="students-container">

        <div className="table-header">

          <div>
            <span>STUDENT LIST</span>

            <h2 style={{ color: "#000000" }}>Students Information</h2>
          </div>

          <div className="student-count">
            {students.length} Students
          </div>

        </div>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>ROLL NO.</th>
                <th>STUDENT</th>
                <th>GENDER</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>ATTENDANCE</th>
              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr key={student.id}>

                  {/* Roll No */}
                  <td>
                    <span className="roll-number">
                      {student.rollNo}
                    </span>
                  </td>

                  {/* Student */}
                  <td>

                    <div className="student-info">

                      <div className="student-avatar">
                        {student.name.charAt(0)}
                      </div>

                      <div>

                        <strong>
                          {student.name}
                        </strong>

                        <small>
                          {classData.name} Student
                        </small>

                      </div>

                    </div>

                  </td>

                  {/* Gender */}
                  <td>

                    <span className="table-text">
                      {student.gender}
                    </span>

                  </td>

                  {/* Email */}
                  <td>

                    <span className="table-text">
                      {student.email}
                    </span>

                  </td>

                  {/* Phone */}
                  <td>

                    <span className="table-text">
                      {student.phone}
                    </span>

                  </td>

        {/* Attendance */}
<td>

  {attendance[String(student.rollNo)] ? (

    <button
      type="button"
      className="attendance-btn attendance-marked"
      disabled
    >

      {attendance[String(student.rollNo)] === "Present"
        ? "✓ Present"
        : "× Absent"}

    </button>

  ) : (

    <div className="attendance-actions">

      {/* ================================
          PRESENT
      ================================= */}

      <button
        type="button"
        className="attendance-btn present-btn"
        onClick={async () => {

          try {

            const response =
              await markAttendance(
                student,
                classData,
                "Present"
              );


            if (response.success) {

              setAttendance((prev) => ({

                ...prev,

                [String(student.rollNo)]:
                  "Present",

              }));

            }

          } catch (error) {

            console.error(error);


            if (error.alreadyMarked) {

              alert(
                "Today's attendance is already marked."
              );

              // Refresh today's attendance

              window.location.reload();

            } else {

              alert(
                "Attendance save failed!"
              );

            }

          }

        }}
      >

        Present

      </button>


      {/* ================================
          ABSENT
      ================================= */}

      <button
        type="button"
        className="attendance-btn absent-btn"
        onClick={async () => {

          try {

            const response =
              await markAttendance(
                student,
                classData,
                "Absent"
              );


            if (response.success) {

              setAttendance((prev) => ({

                ...prev,

                [String(student.rollNo)]:
                  "Absent",

              }));

            }

          } catch (error) {

            console.error(error);


            if (error.alreadyMarked) {

              alert(
                "Today's attendance is already marked."
              );

              window.location.reload();

            } else {

              alert(
                "Attendance save failed!"
              );

            }

          }

        }}
      >

        Absent

      </button>

    </div>

  )}

</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Students;