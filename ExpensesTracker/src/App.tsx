import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/basic/Navbar";
import ExpensePage from "./pages/ExpensePage";
import NetworthPage from "./pages/NetworthPage";
import ThreadsPage from "./pages/ThreadsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/networth" element={<NetworthPage />} />
        <Route path="/threads" element={<ThreadsPage />} />
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
