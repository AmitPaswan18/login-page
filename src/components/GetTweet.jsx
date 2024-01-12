import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import moment from "moment";

import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import { createTheme } from "@mui/material/styles";

import { instance } from "../utils/axiosInstance";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getTweet, setEditable } from "../redux/Slices/tweetSlice";

import Grid from "@mui/material/Grid";
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
  const theme = createTheme();

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
      const response = await instance.get(
        `/tweet/gettweet?page=${page}&limit=2`
      );
      dispatch(getTweet(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  console.log(page);

  useEffect(() => {
    instance
      .get(`/tweet/gettweet?page=${page}&limit=2`)
      .then((response) => {
        dispatch(getTweet(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest("#input-with-icon-adornment")) {
        const newText = document.getElementById(
          "input-with-icon-adornment"
        ).value;
        handleEditSubmit(editableTweetId.id, newText);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [editableTweetId?.id]);

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
              <div>
                <ListItem
                  sx={{
                    alignItems: "start",
                    width: "74%",
                    mx: "auto",
                    [theme.breakpoints.down("sm")]: {
                      textAlign: "center",
                    },
                  }}
                  className="border-2 w-[50%] flex  max-h-20 flex-col md:flex-row md:mx-[25%] m-0 rounded-md shadow-slate-400 shadow-md"
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
                  <div>
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
                      </Box>
                    ) : (
                      <>
                        <CardMedia
                          sx={{ height: "30px", width: "30px" }}
                          component="img"
                          height="20"
                          image={`http://116.202.210.102:3339/images/${ele.tweetImage}`}
                          alt="Paella dish"
                        />
                        <ListItemText primary={ele.text} />
                      </>
                    )}
                  </div>
                </ListItem>
              </div>
            </List>
          ))}
          <div className="flex justify-center absolute md:bottom-10 md:left-[37%] left-10 bottom-0">
            <Stack spacing={2}>
              <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>
          </div>
        </Demo>
      </Grid>{" "}
    </div>
  );
}
