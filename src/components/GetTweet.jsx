import { useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";

import Stack from "@mui/material/Stack";
import {
  Pagination,
  Typography,
  Input,
  FormControl,
  CardContent,
  CardActionArea,
  IconButton,
  Card,
  Box,
} from "@mui/material";

import moment from "moment";

import { instance } from "../utils/axiosInstance";

import { useDispatch, useSelector } from "react-redux";
import { getTweet, setEditable } from "../redux/Slices/tweetSlice";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function GetTweet() {
  const dispatch = useDispatch();

  const tweetData = useSelector((state) => state.tweet.tweet);
  const isEditable = useSelector((state) => state.tweet.isEditable);
  const editableTweetId = useSelector((state) => state.tweet.editableTweetId);

  const [editedText, setEditedText] = useState("");
  const [page, setPage] = useState(1);

  const format1 = "YYYY-MM-DD HH:mm";

  const handleDelete = async (newid) => {
    try {
      await instance.delete(`tweet/deleteTweet/${newid}`);
      dispatch(getTweet(tweetData.filter((ele) => ele._id !== newid)));
    } catch (error) {
      console.log("Error in deleting the tweet ", error.message);
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
      const response = await instance.get(
        `/tweet/gettweet?page=${page}&limit=2`
      );
      dispatch(getTweet(response.data.data));
    } catch (error) {
      console.log("Failed to update the tweet", error.message);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    instance
      .get(`/tweet/gettweet?page=${page}&limit=2`)
      .get(`/tweet/gettweet?page=${page}&limit=2`)
      .then((response) => {
        dispatch(getTweet(response.data.data));
      })
      .catch((error) => {
        console.log("Failed to get the tweet", error.message);
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
    <>
      <div className="flex justify-center fixed md:bottom-10 md:left-[37%] left-10 bottom-0">
        <Stack spacing={2}>
          <Pagination count={10} page={page} onChange={handleChange} />
        </Stack>
      </div>
      <div className="flex flex-col md:flex-row justify-evenly md:gap-10 gap-2 ">
        {tweetData.length > 0 ? (
          tweetData.map((ele) => (
            <div key={ele._id}>
              {isEditable && editableTweetId.id === ele._id ? (
                <Card sx={{ maxWidth: 345, height: "340px", overflow: "auto" }}>
                  <CardActionArea sx={{ width: "fit" }}>
                    <Typography
                      sx={{
                        mt: 1,
                        mb: 1,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        lineHeight: "1",
                      }}
                      variant="h6"
                      component="div">
                      Tweets
                    </Typography>
                    <CardMedia
                      component="img"
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                      }}
                      image={`http://116.202.210.102:3339/images/${ele.tweetImage}`}
                      alt=" Tweet Image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {moment(ele.dateAndTime).format(format1)}
                        <>
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
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
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
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ) : (
                <>
                  <Card
                    sx={{
                      maxWidth: 345,
                      height: "340px",
                      overflow: "auto",
                    }}>
                    <CardActionArea>
                      <Typography
                        sx={{
                          mt: 1,
                          mb: 1,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          lineHeight: "1",
                        }}
                        variant="h6"
                        component="div">
                        Tweets
                      </Typography>
                      <CardMedia
                        component="img"
                        height="140"
                        image={`http://116.202.210.102:3339/images/${ele.tweetImage}`}
                        alt="tweet image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {moment(ele.dateAndTime).format(format1)}
                          <span className="pl-2">
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
                          </span>
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {`${ele.text}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </>
              )}
            </div>
          ))
        ) : (
          <Typography
            sx={{
              mt: 2,
              mb: 2,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontFamily: "Poppins",
              color: "blue",
              fontSize: "20px",
              lineHeight: "1",
              "@media (max-width: 600px)": { fontSize: "12px", mt: 1, mb: 1 },
            }}
            variant="h6"
            component="div">
            {` No data to be displyed on page ${page}`}
          </Typography>
        )}
      </div>
    </>
  );
}
