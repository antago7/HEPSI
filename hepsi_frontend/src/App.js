import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/home/home";
import AuthForm from "./components/pages/auth/sign";

function App() {

  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/auth" element={<AuthForm/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;