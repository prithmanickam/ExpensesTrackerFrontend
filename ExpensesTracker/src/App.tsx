import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import LoginPage from "./pages/LoginPage";

const serviceList = ["Service 1", "Service 2", "Service 3"];

function App() {
  const [count, setCount] = useState(0);

  return (
    
    <>
    <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage/>} />
    </Routes>
      <Container sx={{ bgcolor: "tomato", height: "100vh" }}>
        Hello wrld
        <Typography
          variant="h1"
          sx={{ my: 4, textAlign: "center", color: "primary.main" }}
        >
          YOOOO
        </Typography>
        <Typography variant="h2">Overview</Typography>
        
          {serviceList.map((service) => (
            <Paper elevation={3}>
              <Typography variant="h3">{service}</Typography>
              <Typography>yo yo yo wadduppp</Typography>
            </Paper>
          ))}
        
        <Typography variant="h2">Overview2</Typography>
        <Box 
          sx={{ 
            pt:4,
            display: "flex", 
            flexDirection: "row",
            justifyContent:"space-between",
            gap:4,
      
          }}>
          

          {serviceList.map((service) => (
            <Paper elevation={3}>
              <Box sx={{m:3}}>
              <Typography variant="h3">{service}</Typography>
              
              <Typography sx={{mt:2}}>yo yo yo wadduppp</Typography>
              <Button variant="contained" > 
                {/* outlined, contained */}
                Learn more
              </Button>
              <Button variant="contained" color="secondary" sx={{mt:2}}> 
               
                Learn more2
              </Button>
              
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default App;
