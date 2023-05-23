import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/basic/Navbar";
import ExpensePage from "./pages/ExpensePage";
import NetworthPage from "./pages/NetworthPage";
import ThreadsPage from "./pages/ThreadsPage";
import { RequireAuth } from "react-auth-kit";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/threads" element={<ThreadsPage />} />
        <Route path="/*" element={<LandingPage />} />

        {/* Private routes */}
        <Route
          path="/expense"
          element={
            // TODO: RequireAuth is causing infinite re-renders
            <RequireAuth loginPath="/login">
              <ExpensePage />
            </RequireAuth>
          }
        />
        <Route
          path="/networth"
          element={
            <RequireAuth loginPath="/login">
              <NetworthPage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
