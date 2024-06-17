import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Opportunities from "./components/Opportunity/Opportunities";
import Reports from "./components/Report/Reports";
import Alumni from "./components/Alumni/Alumni";
import Events from "./components/Events/Events";
import AdminLogin from "./components/RegisterLogin/AdminLogin";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("b2a9eb27-51de-4f45-ad3d-ce45c4e51ed7", "true"); // Persist login state
  };
  useEffect(() => {
    // Check if user is logged in when the component mounts
    const loggedIn =
      sessionStorage.getItem("b2a9eb27-51de-4f45-ad3d-ce45c4e51ed7") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      <div className={`App `}>
        <Header />
        {!isLoggedIn ? (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/opportunity' element={<Opportunities />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/alumni' element={<Alumni />} />
              <Route path='/events' element={<Events />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
