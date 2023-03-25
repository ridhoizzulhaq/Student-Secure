import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CreateReport from "./pages/CreateReport";
import GetReport from "./pages/GetReport";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-nav">
            <Link className="nav-link" to="/create-report">
              Create Report
            </Link>
            <Link className="nav-link" to="/get-report">
              Get Report
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/create-report" element={<CreateReport />} />
          <Route path="/get-report" element={<GetReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
