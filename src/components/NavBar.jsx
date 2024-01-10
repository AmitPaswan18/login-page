import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import TextField from "@mui/material/TextField";

import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { useState } from "react";
import { instance } from "../utils/axiosInstance";
import GetTweet from "./GetTweet";
const defaultTheme = createTheme();

export default function Navbar() {
  const [showtweet, setShowTweet] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
  });
  const handleClickShowPassword = () => setShowTweet((show) => !show);

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target.closest("form");
    if (!form) {
      console.error("Form element not found");
      return;
    }

    const data = new FormData(form);
    const formData = {
      text: data.get("text"),
    };

    console.log(formData);

    instance
      .post("/tweet/createtweet", {
        text: formData.text,
      })
      .then((response) => {
        console.log(response);
        setFormData({ text: "" });
        setShowTweet(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  return (
    <div>
      <div className="flex">
        <Button
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDown}
          sx={{ marginTop: "40px", marginLeft: "40px" }}
          variant="contained">
          Add tweet
        </Button>
      </div>

      {showtweet ? (
        <div className="md:w-[100%] w-full h-[86vh] flex justify-center items-center">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />

              <Box
                className="shadow-lg shadow-slate-700 w-full border-cyan-800 md:border border-0 p-3 bg-white rounded-lg md:h-[90%] h-full"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1, width: "80%" }}>
                  <div className="mt-3">
                    <InputLabel className="text-[#CBCBCB]" htmlFor="text">
                      <Typography
                        sx={{
                          display: "flex",
                          fontFamily: "Poppins",
                          fontSize: "20px",
                          lineHeight: "1",
                        }}
                        component="h1"
                        variant="h6">
                        Tweet
                      </Typography>
                    </InputLabel>
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <Textarea
                        id="text"
                        name="text"
                        label="text"
                        aria-label="text"
                        minRows={3}
                        onKeyDown={handleKeyDown}
                        placeholder="What is happening!?"
                        sx={{ marginTop: 1, width: "100%" }}
                      />
                    </FormControl>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    className="bg-cyan-500"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: "100%" }}>
                    Submit Tweet
                  </Button>
                  <Grid
                    container
                    justifyContent="center"
                    marginBottom="30px"></Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      ) : (
        <GetTweet />
      )}
    </div>
  );
}
