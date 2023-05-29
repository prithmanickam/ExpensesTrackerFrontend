import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/basic/Navbar";
import ThreadsPage from "./pages/ThreadsPage";
import { RequireAuth } from "react-auth-kit";
import HomePage from "./pages/HomePage";
import RecommendationPage from "./pages/RecommendationPage";
import { TransactionContextProvider } from "./context/TransactionContext";

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
          path="/home"
          element={
            // TODO: RequireAuth is causing infinite re-renders
            //<RequireAuth loginPath="/login">
            <TransactionContextProvider>
              <HomePage />
              {/* <ChartsData /> */}
            </TransactionContextProvider>
            //</RequireAuth>
          }
        />
        <Route
          path="/recommendation"
          element={
            <RequireAuth loginPath="/login">
              <RecommendationPage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
