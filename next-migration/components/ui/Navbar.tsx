"use client"

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { FC, useState } from "react";
import routes from "@/lib/constants/routes";
import { useRouter } from "next/navigation"
import Link from "next/link";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

const Navbar: FC<Props> = ({ window }) => {
  // Auth state
  const navigate = useRouter();

  const handleSignOut = () => {
    // signOut();
    navigate.push("/login");
  };

  const takeToSignIn = () => {
    navigate.push("login");
  };

  // UI state
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "middle",
          alignItems: "middle",
        }}
      >
        {routes.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                href={`/${item}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%",
                }}
              >
                <ListItemText className="inter-font" primary={item.charAt(0).toUpperCase() + item.slice(1)} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", mb: 1 }}>
      <CssBaseline />
      <AppBar component="nav" variant="elevation" position="sticky" className="">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}>
            {routes.map((item) => (
              <Link
                href={`/${item}`}
                style={{ textDecoration: "none", color: "white" }}
                key={`nav-${item}`}
              >
                <Button key={item} sx={{ color: "#fff", mx: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      textTransform: "none",
                      fontSize: {
                        sm: "1.0rem",
                        md: "1.3rem",
                      },
                    }}
                    className="inter-font"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Typography>
                </Button>
              </Link>
            ))}
          </Box>
          <Button
            key={"login-logout"}
            sx={{
              color: "#fff",
              mx: 2,
              display: {
                xs: "none",
                sm: "block",
              },
            }}
            onClick={() => {
              // if (isAuthenticated()) {
              //   handleSignOut();
              //   return;
              // }

              takeToSignIn();
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textTransform: "none",
                fontSize: {
                  sm: "1.0rem",
                  md: "1.3rem",
                },
              }}
            >
              {"Login/Signout"}
              {/* {isAuthenticated() ? "Logout" : "Login"} */}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
