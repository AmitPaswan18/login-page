import "./App.css";

import LoginForm from "./components/auth/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./index.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/dashboard" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
