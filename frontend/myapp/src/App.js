import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Appointments from "./components/Appointments";
import Doctors from "./components/Doctors";
import Patients from "./components/Patients";
import "./App.css";

const App = () => {
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <div className="container">
      <div
        className="background-overlay"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/hospital1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          opacity: "0.5",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }}
      ></div>
      
      <h1 style={{ color: "green", textAlign: "center" }}>Hospital Management App</h1>
      
      <nav>
        <ul>
          <li className={isLinkActive("/appointments") ? "active" : ""}>
            <Link to="/appointments">Appointments</Link>
          </li>
          <li className={isLinkActive("/doctors") ? "active" : ""}>
            <Link to="/doctors">Doctors</Link>
          </li>
          <li className={isLinkActive("/patients") ? "active" : ""}>
            <Link to="/patients">Patients</Link>
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/" element={<Appointments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </div>
  );
};

// Ensure App is wrapped inside Router
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
