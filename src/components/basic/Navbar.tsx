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
import { Link, useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import routes from "../../constants/routes";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";

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
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  const takeToSignIn = () => {
    navigate("login");
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
                to={`/${item}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%",
                }}
              >
                <ListItemText primary={item} />
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
      <AppBar component="nav" variant="elevation" position="sticky">
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
                to={`/${item}`}
                style={{ textDecoration: "none", color: "white" }}
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
                  >
                    {item}
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
              if (isAuthenticated()) {
                handleSignOut();
                return;
              }

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
              {isAuthenticated() ? "Logout" : "Login"}
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
