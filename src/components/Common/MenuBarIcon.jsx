import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const options = ["Delete", "Edit"];

const ITEM_HEIGHT = 48;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function MenuBarIcon({
  handleDeleteModal,
  handleOpenEdit,
  tweetId,
  handleDelete,
  handleEdit,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmedDelete, setConfirmedDelete] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    setOpen(option === "Delete");
    if (option === "Delete") {
      handleDeleteModal(tweetId);
    } else if (option === "Edit") {
      handleOpenEdit();
      handleEdit(tweetId);
    } else {
      handleDeleteModal(null);
      handleEdit(null);
    }
  };

  const handleConfirmDelete = () => {
    handleDelete(tweetId);
    handleDeleteModal(tweetId);
    setConfirmedDelete(true);
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={anchorEl ? "long-menu" : undefined}
        aria-expanded={Boolean(anchorEl)}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            backgroundColor: "#FFFFFF",
            width: "14ch",
          },
        }}>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className="border-2 rounded-md">
          <div className="p-4 md:p-5 text-center w-[100%]">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <Typography
              className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
              sx={{
                display: "flex",
                height: "fit",
                justifyContent: "center",
                fontFamily: "Poppins",
                marginTop: "5px",
                fontSize: "16px",
                lineHeight: "1",
                "@media (max-width: 740px)": {
                  fontSize: "16px",
                },
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2">
              Are you sure you want to delete this tweet?
            </Typography>

            <button
              type="button"
              className="text-white mt-10 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              onClick={handleConfirmDelete}>
              {" "}
              Confirm delete
            </button>
            <button
              onClick={handleClose}
              data-modal-hide="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              No, cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
