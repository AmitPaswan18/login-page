import { useEffect } from "react";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteModal from "./Common/DeleteModal";
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
import { getTweet, setEditable, tweetPage } from "../redux/Slices/tweetSlice";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function GetTweet() {
  const dispatch = useDispatch();

  const tweetData = useSelector((state) => state.tweet.tweet);
  const tweetPageCount = useSelector((state) => state.tweet.totalTweets);
  const isEditable = useSelector((state) => state.tweet.isEditable);
  const editableTweetId = useSelector((state) => state.tweet.editableTweetId);

  const totalTweetsCount = Math.ceil(tweetPageCount / 2);

  const [deleteWarn, setDeleteWarn] = useState(false);
  const [editedText, setEditedText] = useState("");

  const [page, setPage] = useState(1);

  const [selectedTweetId, setSelectedTweetId] = useState(null);

  const handleMoreOptionsClick = (tweetId) => {
    setSelectedTweetId(tweetId);
  };

  const format1 = "YYYY-MM-DD HH:mm";

  const handleDelete = async (newid) => {
    try {
      await instance.delete(`tweet/deleteTweet/${newid}`);
      dispatch(getTweet(tweetData.filter((ele) => ele._id !== newid)));
      setSelectedTweetId(null);
      setDeleteWarn(false);
    } catch (error) {
      console.log("Error in deleting the tweet ", error.message);
    }
  };

  const hanldeDeletePopUp = () => {
    setDeleteWarn(true);
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
      const response = await instance.get(`/tweet/gettweet?page=${1}&limit=2`);
      dispatch(getTweet(response.data.data));

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
      .get(`/tweet/gettweet?page=${page}&limit=${2}`)
      .then((response) => {
        dispatch(getTweet(response.data.data));
        dispatch(tweetPage(response.data.totalDocument));
        console.log(response.data.totalDocument);
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

  return (
    <>
      <div className="flex justify-center fixed md:bottom-10 md:left-[40%] left-10 bottom-0">
        <Stack spacing={2}>
          <Pagination
            count={totalTweetsCount}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
      <div className="flex md:mt-10 mt-0 flex-col justify-center md:mb-10 mb-0 gap-2 w-full ">
        {tweetData.length > 0 ? (
          tweetData.map((ele) => (
            <div key={ele._id} className=" w-[100%]  flex justify-center">
              {isEditable && editableTweetId.id === ele._id ? (
                <Card className="md:w-[50%] w-full max-h-fit ">
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
                    {ele.tweetImage != undefined && (
                      <div>
                        <img
                          className="h-auto max-w-xs"
                          src={`http://116.202.210.102:3339/images/${ele.tweetImage}`}
                          alt=""
                        />
                      </div>
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {moment(ele.dateAndTime).format(format1)}
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
                  <Card className="md:w-[70%] lg:w-[60%]  w-full max-h-fit">
                    <div className="flex flex-col md:flex-row w-full ">
                      {ele.tweetImage != undefined && (
                        <div>
                          <img
                            className="h-auto max-w-xs"
                            src={`http://116.202.210.102:3339/images/${ele.tweetImage}`}
                            alt=""
                          />
                        </div>
                      )}

                      <div className="p-2 w-fit max-h-fit">
                        <Typography
                          sx={{
                            mb: 1,
                            width: "100%",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            lineHeight: "1",
                          }}
                          component="div">
                          {`${ele.text}`}
                        </Typography>

                        <Typography>
                          <span className="text-sm">
                            {moment(ele.dateAndTime).format(format1)}
                          </span>
                          <span className="pl-2">
                            {selectedTweetId === ele._id ? (
                              <>
                                <IconButton
                                  onClick={() => hanldeDeletePopUp()}
                                  aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() => handleEdit(ele._id)}
                                  aria-label="edit">
                                  <EditIcon />
                                </IconButton>
                              </>
                            ) : (
                              <MoreHorizIcon
                                onClick={() => handleMoreOptionsClick(ele._id)}
                              />
                            )}
                          </span>
                        </Typography>
                        {deleteWarn && (
                          <DeleteModal
                            onClick={() => handleDelete(selectedTweetId)}
                          />
                        )}
                      </div>
                    </div>
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
