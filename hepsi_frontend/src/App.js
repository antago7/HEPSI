import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/home/home";

function App() {

  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </div>
    </Router>
  )
}