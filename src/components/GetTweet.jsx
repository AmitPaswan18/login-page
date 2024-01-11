import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import moment from "moment";

import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

import { instance } from "../utils/axiosInstance";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getTweet, setEditable } from "../redux/Slices/tweetSlice";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function GetTweet() {
  const dispatch = useDispatch();
  const tweetData = useSelector((state) => state.tweet.tweet);
  const isEditable = useSelector((state) => state.tweet.isEditable);
  const editableTweetId = useSelector((state) => state.tweet.editableTweetId);
  const [editedText, setEditedText] = useState("");

  const format1 = "YYYY-MM-DD HH:mm";

  const handleDelete = async (newid) => {
    try {
      await instance.delete(`tweet/deleteTweet/${newid}`);
      dispatch(getTweet(tweetData.filter((ele) => ele._id !== newid)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (newid) => {
    const tweetToEdit = tweetData.find((ele) => ele._id === newid);

    if (tweetToEdit) {
      const initialText = tweetToEdit.text;
      setEditedText(initialText);
      dispatch(setEditable({ id: newid, initialText }));
    }
  };

  const handleEditSubmit = async (newid, newText) => {
    try {
      await instance.put(`/tweet/updateTweet/${newid}`, { newText });
      const response = await instance.get("/tweet/gettweet");
      dispatch(getTweet(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    instance
      .get("/tweet/gettweet")
      .then((response) => {
        dispatch(getTweet(response.data.data));
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
            fontFamily: "Poppins",
            fontSize: "36px",
            lineHeight: "1",
          }}
          variant="h6"
          component="div">
          Recent Tweets
        </Typography>
        <Demo>
          {tweetData.map((ele) => (
            <List key={ele._id}>
              <div className="flex ">
                <ListItem
                  className="border-2 md:mx-[25%] m-0 rounded-md shadow-slate-400 shadow-md"
                  secondaryAction={
                    <>
                      <span>{moment(ele.dateAndTime).format(format1)}</span>
                      <IconButton
                        onClick={() => handleDelete(ele._id)}
                        aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(ele._id)}
                        aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </>
                  }>
                  <div className="w-[65%]">
                    {isEditable && editableTweetId.id === ele._id ? (
                      <Box
                        component="form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const newText = formData.get("newText");
                          handleEditSubmit(ele._id, newText);
                        }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                        <FormControl
                          sx={{ width: "90%", marginTop: "20px" }}
                          variant="standard">
                          <Input
                            className="rounded-md h-8 w-full text-[#CBCBCB]  focus:outline-none"
                            name="newText"
                            placeholder="New Tweet"
                            value={editedText}
                            onChange={(e) => {
                              setEditedText(e.target.value);
                            }}
                            id="input-with-icon-adornment"
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ marginLeft: "20px" }}>
                          Update
                        </Button>
                      </Box>
                    ) : (
                      <ListItemText primary={ele.text} />
                    )}
                  </div>
                </ListItem>
              </div>
            </List>
          ))}
        </Demo>
      </Grid>{" "}
    </div>
  );
}
