import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/home/home";
import AuthForm from "./components/pages/auth/sign";
import CoursePage from "./components/pages/courses/courses";
import ContactPage from "./components/pages/contacts/contacts";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); 
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/auth" element={<AuthForm onLogin={handleLogin} />} />
          <Route path="/courses" element={isAuthenticated ? <CoursePage /> : <Navigate to="/auth" />} />
          <Route path="/contacts" element={isAuthenticated ? <ContactPage /> : <Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;