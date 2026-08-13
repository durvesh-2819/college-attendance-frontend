import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import SelectClass from "./pages/SelectClass";
import Students from "./pages/Students";
import Reports from "./pages/Reports";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ===================================== */}
        {/* LOGIN PAGE */}
        {/* ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ===================================== */}
        {/* PROTECTED WEBSITE */}
        {/* ===================================== */}

        <Route element={<ProtectedRoute />}>

          {/* Sidebar */}
          <Route
            path="*"
            element={
              <>
                <Sidebar />

                <main className="app-main">

                  <Routes>

                    <Route
                      path="/"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/select-class"
                      element={<SelectClass />}
                    />

                    <Route
                      path="/students"
                      element={<Students />}
                    />

                    <Route
                      path="/attendance"
                      element={<Attendance />}
                    />

                    <Route
                      path="/reports"
                      element={<Reports />}
                    />

                  </Routes>

                </main>
              </>
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;