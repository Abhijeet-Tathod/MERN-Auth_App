import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { PersonAdd } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../store/Slices/UserInfoSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.UserInfo);

  const defaultTheme = createTheme();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string("Invalid Password")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
      )
      .required("Password is required"),
  });
  const apiUrl = process.env.REACT_APP_API_URL;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        dispatch(signInStart());
        const response = await Axios.post(`${apiUrl}/api/auth/signin`, values);
        if (response.success === false)
          return dispatch(signInFailure(response.data));
        dispatch(signInSuccess(response.data.user));
        formik.resetForm();
        // console.log("Response : ", response);
      } catch (error) {
        dispatch(signInFailure(error));
        // console.log("Error", error);
      }
    },
  });
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    formik.setValues({ ...formik.values, [name]: value });
  };

  const renderTextField = (name, label, type) => (
    <FormControl fullWidth>
      <TextField
        id={name}
        name={name}
        type={type}
        value={formik.values[name]}
        onChange={handleInputChange}
        label={label}
      />
      {formik.errors[name] ? (
        <FormHelperText style={{ color: "red" }}>
          {formik.errors[name]}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <CssBaseline />
          <Grid
            container
            component="main"
            sx={{ height: "100vh", paddingY: "2%" }}
          >
            <Grid
              item
              xs={false}
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
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
              className="flex items-center justify-center"
            >
              <Box noValidate>
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Sign In
                  </h1>
                  <div className="w-full flex-1 mt-8">
                    <div className="flex flex-col items-center">
                      <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                        <div className="bg-white p-2 rounded-full">
                          <svg className="w-4" viewBox="0 0 533.5 544.3">
                            <path
                              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                              fill="#4285f4"
                            />
                            <path
                              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                              fill="#34a853"
                            />
                            <path
                              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                              fill="#fbbc04"
                            />
                            <path
                              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                              fill="#ea4335"
                            />
                          </svg>
                        </div>
                        <span className="ml-4">Sign In with Google</span>
                      </button>

                      <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                        <div className="bg-white p-1 rounded-full">
                          <svg className="w-6" viewBox="0 0 32 32">
                            <path
                              fillRule="evenodd"
                              d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                            />
                          </svg>
                        </div>
                        <span className="ml-4">Sign In with GitHub</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="my-6 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or Sign In with Email
                  </div>
                </div>

                <Box component="form" noValidate>
                  <Grid
                    container
                    sx={{ width: "330px", margin: "auto" }}
                    className="flex justify-center"
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      paddingBottom={2}
                      paddingInline={1}
                    >
                      {renderTextField("email", "Email", "email")}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      paddingBottom={2}
                      paddingInline={1}
                    >
                      {renderTextField("password", "Password", "password")}
                    </Grid>
                    <Typography sx={{ color: "red", textAlign: "center" }}>
                      {error ? error.message || "Something went wrong" : ""}
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      paddingBottom={2}
                      paddingInline={1}
                    >
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          formik.handleSubmit();
                        }}
                        // disabled={loading}
                        sx={{
                          marginTop: "1.25rem",
                          letterSpacing: "0.05em",
                          fontWeight: 600,
                          color: "#FFFFFF",
                          width: "100%",
                          padding: "1rem 0",
                          transition: "background-color 0.3s ease-in-out",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          outline: 0,
                          borderRadius: "10px",
                          boxShadow: "0 0 0 3px rgba(100, 126, 234, 0.5)",
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={30} color="inherit" />
                        ) : (
                          <>
                            <PersonAdd fontSize="medium" className="mr-3" />
                            <Typography
                              sx={{ fontSize: "20px", marginTop: "3px" }}
                            >
                              Sign In
                            </Typography>
                          </>
                        )}
                      </Button>
                    </Grid>
                  </Grid>

                  <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
                    <Link to="/signup" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
