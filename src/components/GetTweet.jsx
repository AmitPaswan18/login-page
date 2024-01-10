import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect } from "react";

import { instance } from "../utils/axiosInstance";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { getTweet } from "../redux/Slices/tweetSlice";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function GetTweet() {
  const dispatch = useDispatch();
  const tweetData = useSelector((state) => state.tweet.tweet);
  console.log(tweetData);
  useEffect(() => {
    instance
      .get("/tweet/gettweet")
      .then((response) => {
        dispatch(dispatch(getTweet(response.data.data)));
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            mt: 4,
            mb: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          variant="h6"
          component="div">
          Recent Tweets
        </Typography>
        <Demo>
          {tweetData.map((ele) => (
            <>
              <List>
                <div className="flex justify-center ">
                  <ListItem
                    sx={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                    secondaryAction={
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }>
                    <ListItemText primary={ele.text} />
                  </ListItem>
                </div>
              </List>
            </>
          ))}
        </Demo>
      </Grid>{" "}
    </div>
  );
}
