// ==========================================
// BACKEND API URL
// ==========================================

const API_URL =
  "https://college-attendance-backend-gkah.onrender.com";


// ==========================================
// TEST BACKEND
// ==========================================

export const testBackend = async () => {
  try {
    const response = await fetch(`${API_URL}/`);

    const data = await response.json();

    return data;

  } catch (error) {

    console.error(
      "Backend connection error:",
      error
    );

    throw error;
  }
};


// ==========================================
// TEACHER LOGIN
// ==========================================

export const teacherLogin = async (
  email,
  password
) => {

  try {

    const response = await fetch(
      `${API_URL}/api/teacher-login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Invalid username or password"
      );

    }


    return data;


  } catch (error) {

    console.error(
      "Teacher Login Error:",
      error
    );

    throw error;
  }
};


// ==========================================
// MARK ATTENDANCE
// ==========================================

export const markAttendance = async (
  student,
  classData,
  status
) => {

  try {

    const response = await fetch(
      `${API_URL}/api/attendance`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          className: classData.name,

          rollNo: student.rollNo,

          studentName: student.name,

          gender: student.gender,

          status: status,

        }),
      }
    );


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Attendance failed"
      );

    }


    return data;


  } catch (error) {

    console.error(
      "Attendance Error:",
      error
    );

    throw error;
  }
};


// ==========================================
// GET ALL ATTENDANCE
// ==========================================

export const getAttendance = async () => {

  try {

    const response = await fetch(
      `${API_URL}/api/attendance`
    );


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to get attendance"
      );

    }


    return data;


  } catch (error) {

    console.error(
      "Get Attendance Error:",
      error
    );

    throw error;
  }
};


// ==========================================
// GET DASHBOARD DATA
// ==========================================

export const getDashboard = async () => {

  try {

    const response = await fetch(
      `${API_URL}/api/dashboard`
    );


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to get dashboard data"
      );

    }


    return data;


  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

    throw error;
  }
};