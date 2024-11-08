import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/home/home";
import AuthForm from "./components/pages/auth/sign";
import BookList from "./components/pages/courses/courses";
import ContactPage from "./components/pages/contacts/contacts";
import DevOpsPage from "./components/pages/devopspage/devopspage";
import NEpage from "./components/pages/NEengineering/NEengineering";
import Cspage from "./components/pages/cybersecurity/cybersecurity";


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
          <Route path="/books" element={isAuthenticated ? <BookList /> : <Navigate to="/auth" />} />
          <Route path="/contacts" element={isAuthenticated ? <ContactPage /> : <Navigate to="/auth" />} />
          <Route path="/devops" element={isAuthenticated ? <DevOpsPage /> : <Navigate to="/auth " />} /> 
          <Route path="/nepage" element={isAuthenticated ? <NEpage /> : <Navigate to=" /auth" />} />
          <Route path="/cspage" element={isAuthenticated ? <Cspage /> : <Navigate to=" /auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;