import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { default as QueryClientProvider } from "./components/basic/Providers.tsx";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    primary: {
      main: "#013e87",
    },
    secondary: {
      main: "#2e74c9",
    },
  },
  typography: {
    fontFamily: `Inter`,
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        // cookieSecure={window.location.protocol === "https:"} // Enable this in production
        cookieSecure={false}
      >
        <QueryClientProvider>
          <BrowserRouter>
            <Toaster position="top-center" />
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
