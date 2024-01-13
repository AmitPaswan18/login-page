import {
  Button,
  InputLabel,
  Grid,
  Box,
  CssBaseline,
  FormControl,
  Typography,
  Container,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { useState } from "react";
import { instance } from "../utils/axiosInstance";
import GetTweet from "./GetTweet";
import { startCorn } from "../redux/Slices/tweetSlice";
import { useDispatch } from "react-redux";
import InputFileUpload from "./Common/FileUpload";

const defaultTheme = createTheme();

export default function DashBoard() {
  const dispatch = useDispatch();

  const [showTweet, setShowTweet] = useState(false);

  const [formData, setFormData] = useState({
    text: "",
    tweetImage: "",
  });

  const handleClickShowAddTweet = () => setShowTweet((show) => !show);

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.target.closest("form");
      if (!form) {
        throw new Error("Form element not found");
      }
      const data = new FormData(form);
      const fileInput = form.querySelector('input[type="file"]');

      if (fileInput) {
        const file = fileInput.files[0];
        data.append("tweetImage", file);
      }

      const response = await instance.post("/tweet/createtweet", data);

      if (response.status === 200) {
        setFormData({ text: "", tweetImage: "" });
        setShowTweet(false);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting the tweet:", error.message);
    }
  };

  const handlestartCorn = () => {
    instance.get("/tweetcron/startcron").then((response) => {
      console.log(response);
      if (response.status == 200) {
        dispatch(startCorn(response.status));
      }
    });
  };

  const handlestopCorn = () => {
    instance.get("/tweetcron/stopcron").then((response) => {
      console.log(response);
      if (response.status == 200) {
        dispatch(startCorn(response.status));
      }
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
    
  
  `,
    { readOnly: false }
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
        <div className="flex h-fit md:h-full md:flex-row md:w-full  mt-2 gap-2 px-5">
          <div className="flex md:h-10 h-fit md:flex-row justify-evenly gap-2 ">
            <Button
              sx={{
                "@media (max-width: 740px)": {
                  fontSize: "8px",
                },
              }}
              onClick={handleClickShowAddTweet}
              onMouseDown={handleMouseDown}
              variant="contained">
              Add Tweet
            </Button>
            <Button
              sx={{
                position: "fixed",
                right: "20px",
                "@media (max-width: 740px)": {
                  display: "flex",
                  fontSize: "8px",
                },
              }}
              variant="contained"
              onClick={handlestartCorn}>
              Upload
            </Button>
            <Button
              sx={{
                position: "fixed",
                right: "120px",
                "@media (max-width: 740px)": {
                  display: "flex",
                  right: "90px",
                  fontSize: "8px",
                },
              }}
              onClick={handlestopCorn}
              variant="contained">
              Stop
            </Button>
          </div>
        </div>
      </div>
      <Typography
        sx={{
          display: "flex",
          height: "fit",
          justifyContent: "center",
          fontFamily: "Poppins",
          marginTop: "5px",
          fontSize: "26px",
          lineHeight: "1",
          "@media (max-width: 740px)": {
            fontSize: "16px",
          },
        }}
        variant="h6"
        component="div">
        Recent Tweets
      </Typography>

      {showTweet ? (
        <div className="md:w-[100%] w-full h-[86vh] flex justify-center items-center">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box className="shadow-lg shadow-slate-700 w-full flex flex-col items-center border-cyan-800 md:border border-0 p-3 bg-white rounded-lg md:h-[90%] h-full">
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
                      <div className="flex justify-center mt-2 w-full">
                        <InputFileUpload
                          id="tweetImage"
                          onChange={handleFileChange}
                          name="tweetImage"
                        />
                      </div>
                    </FormControl>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    className="bg-cyan-500 opacity-90"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: "100%" }}>
                    Post
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