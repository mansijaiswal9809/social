import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuth, signIn, signUp } from "../../reducer/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setVisible(false);
  };
  const handleShowPassword = () => {
    setVisible(!visible);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    if (isSignUp) {
      dispatch(signUp({ formData, navigate }));
      // navigate("/")
    } else {
      dispatch(signIn({ formData, navigate }));
      // navigate("/")
    }
  };
  const googleSuccess = (response) => {
    dispatch(googleAuth(response));
    navigate("/");
  };
  const googleFailure = (err) => {
    alert(err)
    console.log(err);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          mt: (theme) => theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          "& .MuiTextField-root": { m: 1 },
        }}
        elevation={3}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: (theme) => theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {!isSignUp ? "Sign In" : "Sign Up"}
        </Typography>
        <form style={{marginTop:"3rem", width:"100%" }} onSubmit={HandleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={visible ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          {!isSignUp && (
            <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            margin={2}
          >
            {isSignUp ? "Sign Up" : "sign In"}
          </Button>
          <Grid container justify-content="center">
            <Grid item xs={12}>
              <Button onClick={switchMode} fullWidth>
                {isSignUp
                  ? "already have an account? Sign In "
                  : "do not have an account?Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
