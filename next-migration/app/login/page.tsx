"use client"

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

export default function Login() {

  const { mutate: handleSubmit } = useMutation({
    mutationFn: async (event: FormEvent<HTMLFormElement>) => {
      try {
        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;

        const response = await axios.post("http://localhost:5173/api/login", {
          email,
          password,
        });

        // signIn({
        //   token: response.data.token,
        //   expiresIn: 3600,
        //   tokenType: "Bearer",
        //   authState: { email: email },
        // });
      } catch (err) {
        // if (err && err instanceof AxiosError)
        //   setError(err.response?.data.message);
        // else if (err && err instanceof Error) setError(err.message);

        // console.log("Error: ", err);
      }

      event.preventDefault();

      const response = await axios({
        method: "get",
        url: "api/auth",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },

    onSuccess: async (body) => {
      // if (
      //   signIn({
      //     token: body.data,
      //     tokenType: "Bearer",
      //     expiresIn: 5,
      //     authState: {
      //       // Locally store non-sensitive user data here
      //      }
      //   })
      // ) {
      //   navigate("/home");
      // }
    },
  });

  return (
    <Container maxWidth="xl" disableGutters>
      <Grid
        container
        component="main"
        sx={{ height: "90vh", width: "100%", px: 4 }}
      >
        <CssBaseline />
        <Grid
          component={Paper}
          elevation={10}
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Card} elevation={10} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};