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
import toast from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

// import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { bgGradient } from "../constants/color.jsx";

const Login = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [avatar, setAvatar] = useState();

  const handleLogin = async (e) => {};

  const handleSignUp = async (e) => {};

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
          width: isSmallScreen ? "400px" : "400px",
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
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onSubmit={handleSignUp}
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
                          src={avatar}
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
                          <CameraAltIcon />
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Bio"
                        margin="normal"
                        variant="outlined"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
