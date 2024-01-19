import { useEffect } from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  fontFamily: "Poppins",
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};

import { Pagination, Typography, Box } from "@mui/material";

import moment from "moment";

import { instance } from "../utils/axiosInstance";

import { useDispatch, useSelector } from "react-redux";
import {
  getTweet,
  tweetPage,
  updateTweet,
  deleteTweet,
} from "../redux/Slices/tweetSlice";
import MenuBarIcon from "./Common/MenuBarIcon";

export default function GetTweet() {
  const dispatch = useDispatch();

  const tweetData = useSelector((state) => state.tweet.tweet);

  const tweetPageCount = useSelector((state) => state.tweet.totalTweets);

  const editableTweetId = useSelector((state) => state.tweet.editableTweetId);

  const [isEditable, setEditable] = useState(false);

  const totalTweetsCount = Math.ceil(tweetPageCount / 2);

  const [editedText, setEditedText] = useState("");

  const [page, setPage] = useState(1);

  const [isDeleteModal, setDeleteModal] = useState(false);

  const [selectedTweetId, setSelectedTweetId] = useState(null);

  const format1 = "YYYY-MM-DD HH:mm";

  const handleDelete = async (newid) => {
    try {
      const response = await instance.delete(`tweet/deleteTweet/${newid}`);
      if (response.data.status === "success") {
        gethandleUpdateData();
        dispatch(deleteTweet({ id: newid, status: "success" }));
      }
      setSelectedTweetId(null);
      setDeleteModal(false);
    } catch (error) {
      console.log("Error in deleting the tweet ", error.message);
    }
  };
  const handleEdit = (newid) => {
    const tweetToEdit = tweetData.find((ele) => ele._id === newid);
    if (tweetToEdit) {
      const initialText = tweetToEdit.text;
      setEditedText(initialText);
      dispatch(updateTweet({ id: newid, newText: initialText }));
      setEditable(true);
    }
  };

  const handleEditSubmit = async (newid, newText) => {
    try {
      const response = await instance.put(`/tweet/updateTweet/${newid}`, {
        newText,
      });
      const updatedTweet = response.data.data;

      dispatch(updateTweet({ id: newid, newText: updatedTweet.text }));
      setEditable(false);
      setOpen(false);
    } catch (error) {
      console.log("Failed to update the tweet", error.message);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const gethandleUpdateData = () => {
    instance
      .get(`/tweet/gettweet?page=${1}&limit=${2}`)
      .then((response) => {
        dispatch(getTweet(response.data.data));
        dispatch(tweetPage(response.data.totalDocument));
      })
      .catch((error) => {
        console.log("Failed to get the tweet", error.message);
      });
  };

  const handleDeleteModal = (tweetId) => {
    setDeleteModal(true);
    setSelectedTweetId(tweetId);
  };

  useEffect(() => {
    instance
      .get(`/tweet/gettweet?page=${page}&limit=${2}`)
      .then((response) => {
        dispatch(getTweet(response.data.data));
        dispatch(tweetPage(response.data.totalDocument));
      })
      .catch((error) => {
        console.log("Failed to get the tweet", error.message);
      });
  }, [page]);

  const [open, setOpen] = useState(false);
  const handleOpenEdit = () => {
    setEditable(true);
    setOpen(true);
  };

  const handleDocumentClick = (e) => {
    if (!e.target.closest("#edit-text")) {
      const newText = document.getElementById("edit-text").value;
      handleEditSubmit(editableTweetId, newText);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="flex relative  md:mt-10  mt-4 flex-col justify-center md:mb-10 mb-0 gap-2 w-full ">
        <div className="flex fixed z-10 bg-transparent right-0 left-0 justify-center mt-2 bottom-1  ">
          <Stack spacing={2}>
            <Pagination
              count={totalTweetsCount}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>
        {tweetData.length > 0 ? (
          tweetData.map((ele) => (
            <div key={ele._id} className=" w-full flex justify-center">
              <>
                <div className=" md:w-[80%] sd:w-{90%] hover:scale-[101%] ease-out duration-300 lg:max-w-[60%] bg-slate-50 w-full max-h-fit border-2 shadow-lg shadow-slate-500 rounded-md relative">
                  <div className="md:w-full w-full flex-col sd:flex-row h-fit flex md:flex-row">
                    {ele.tweetImage != "undefined" && (
                      <div className="m-1 h-fit max-w-sm  rounded-md overflow-hidden">
                        <img
                          style={{
                            display: "inline-block",
                            verticalAlign: "middle",
                          }}
                          className="rounded-md md:h-44 aspect-video md:w-[320px] w-[270px] object-cover"
                          src={`http://116.202.210.102:3339/images/${ele.tweetImage}`}
                          alt="No Image in this tweet"
                        />
                      </div>
                    )}
                    <div className="p-2 text-xs opacity-95 flex-wrap max-w-sm md:w-full  text-gray-900 dark:text-white flex justify-between w-full ">
                      <div className="flex w-full flex-col text-wrap justify-between">
                        <div className="w-[90%] md:w-full max-h-44 md:h-30 md:overflow-auto text-xs opacity-90 md:text-base text-black">{`${ele.text}`}</div>
                        <div className="mt-2">
                          <span className="text-xs mt-10 opacity-80">
                            {moment(ele.dateAndTime).format(format1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0">
                    <MenuBarIcon
                      onClick={() => setEditable(true)}
                      handleDelete={() => handleDelete(ele._id)}
                      handleDeleteModal={() => handleDeleteModal(ele._id)}
                      handleOpenEdit={handleOpenEdit}
                      handleEdit={() => handleEdit(ele._id)}
                    />
                  </div>
                </div>
              </>
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
            {` No tweets Available`}
          </Typography>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="rounded-md shadow-lg shadow-white" sx={style}>
          <div className="relative border-2 rounded-md shadow-md shadow-slate-400 p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white  dark:bg-gray-700">
              <div className="flex items-center justify-between pb-5  rounded-t dark:border-gray-600"></div>
              <>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <form
                      id="myForm"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(
                          document.getElementById("myForm")
                        );
                        const newText = formData.get("newText");

                        handleEditSubmit(editableTweetId, newText);
                      }}>
                      <label
                        htmlFor="edit-text"
                        className="block mb-2 p-2 text-sm md:text-2xl font-medium text-gray-900 dark:text-white border-b dark:border-gray-600">
                        Update Tweet
                      </label>
                      <textarea
                        style={{ resize: "none" }}
                        value={editedText}
                        onChange={(e) => {
                          setEditedText(e.target.value);
                        }}
                        id="edit-text"
                        name="newText"
                        rows="4"
                        className="block p-2.5 w-full text-xs font-medium text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write new tweet here"></textarea>
                    </form>
                  </div>
                </div>
              </>
              <div className="w-full flex justify-between p-4">
                <button
                  type="submit"
                  onClick={handleDocumentClick}
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Confirm
                </button>
                <button
                  onClick={handleClose}
                  className="text-white inline-flex items-center bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
