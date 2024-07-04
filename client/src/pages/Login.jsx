import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import { bgGradient } from "../constants/color.jsx";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  bio: yup.string("Enter your bio").required("Bio is required"),
  username: yup.string("Enter your username").required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState();

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (isLogin) {
        // Handle login logic
        await handleLogin(values);
      } else {
        // Handle signup logic
        await handleSignUp(values);
      }
      setIsLoading(false);
    },
  });

  const handleLogin = async (values) => {
    // Implement login logic
  };

  const handleSignUp = async (values) => {
    // Implement signup logic
  };

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{
          width: isSmallScreen ? "400px" : "600px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Container
                maxWidth={false}
                style={{
                  width: isSmallScreen ? "400px" : "600px",
                  maxWidth: isSmallScreen ? "400px" : "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Sign Up</Typography>
                <form
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                  }}
                  onSubmit={formik.handleSubmit}
                >
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                      <Stack
                        position={"relative"}
                        width={"10rem"}
                        margin={"auto"}
                      >
                        <Avatar
                          sx={{
                            width: "10rem",
                            height: "10rem",
                            objectFit: "contain",
                          }}
                          src={avatar ? URL.createObjectURL(avatar) : ""}
                        />
                        <IconButton
                          sx={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.5)",
                            ":hover": {
                              bgcolor: "rgba(0,0,0,0.7)",
                            },
                          }}
                          component="label"
                        >
                          <>
                            <CameraAltIcon />
                            <VisuallyHiddenInput
                              type="file"
                              onChange={handleAvatarChange}
                            />
                          </>
                        </IconButton>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Bio"
                        margin="normal"
                        variant="outlined"
                        id="bio"
                        name="bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        error={formik.touched.bio && Boolean(formik.errors.bio)}
                        helperText={formik.touched.bio && formik.errors.bio}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                      />
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        sx={{
                          marginTop: "1rem",
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                      >
                        Sign Up
                      </Button>
                      <Typography textAlign={"center"} m={"1rem"}>
                        OR
                      </Typography>
                      <Button
                        disabled={isLoading}
                        fullWidth
                        variant="text"
                        onClick={toggleLogin}
                      >
                        Login Instead
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Container>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
