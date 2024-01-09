import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import logo from "./images/img.webp";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import ToggleSelectar from "./common/ToggleSelector";

import WavingHandIcon from "@mui/icons-material/WavingHand";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { signinsucces } from "../redux/Slices/authlogin";
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit">Login Page</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginForm() {
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const formData = {
      username: data.get("username"),
      password: data.get("password"),
    };

    if (formData) {
      dispatch(signinsucces(formData));
    }

    console.log(formData);
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[60%]  h-[100vh] hidden md:flex  ">
        <img src={logo} className="h-[100vh]" />
      </div>

      <div className="md:w-[40%] w-full h-[100vh] flex justify-center items-center  bg-[#151D5E]">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              sx={{
                paddingTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Typography
                sx={{
                  color: "white",
                  display: "flex",
                  fontSize: "1.25rem",
                  fontFamily: " Poppins",
                }}
                component="h1"
                variant="h5">
                Welcome to Login Page!
                <WavingHandIcon sx={{ color: "white", margin: "0px 5px" }} />
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, color: "white", width: "80%" }}>
                <div className="mt-2">
                  <label className="text-[16px] " htmlFor="UserName">
                    Email:
                  </label>
                  <ToggleSelectar
                    type="text"
                    className="rounded-md h-8 w-full border-2 bg-[#151D5E] focus:outline-none  text-white  p-4"
                    name="username"
                    id="username"
                    required
                    autoComplete="UserName"
                    autoFocus
                  />
                </div>

                <div className="mt-3">
                  <label className="text-[16px]" htmlFor="Password">
                    Password:
                  </label>
                  <ToggleSelectar
                    type="password"
                    className="rounded-md h-8 w-full focus:outline-none text-white p-4 bg-[#151D5E] border-slate-200 border-2"
                    name="password"
                    id="password"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <div className="mt-2">
                  <Link className="flex text-white focus:outline-none justify-end cursor-pointer">
                    {"Forgot Password?"}
                  </Link>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  className="rounded-2xl"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "blue" }}>
                  Sign In
                </Button>
                <div className="flex justify-center">{"Or sign up Using "}</div>

                <div className="h-fit flex flex-row  justify-center  ">
                  <Avatar sx={{ m: 1, bgcolor: "blue" }}>
                    <button>
                      {" "}
                      <FacebookIcon />
                    </button>
                  </Avatar>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <button>
                      <GoogleIcon />
                    </button>
                  </Avatar>
                  <Avatar sx={{ m: 1, bgcolor: "red" }}>
                    <button>
                      <TwitterIcon />
                    </button>
                  </Avatar>
                </div>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link
                      sx={{ color: "white" }}
                      href="/signup"
                      variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
