import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDriveFolderUpload } from "react-icons/md";
import { Box, Modal, Typography, CircularProgress } from "@mui/material";
import { setDpModal } from "../../../../slices/profileSlice";
import { useUpdateDisplayPictureHook } from "../../../../services/operations/operations";
import Btn from "../../../common/Btn"; // Importing the custom Btn component

const ChangeDpModal = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const updateDisplayPicture = useUpdateDisplayPictureHook();
  const { loading } = useSelector((state) => state.auth);

  function dpChangehandler(event) {
    setSelectedImage(event.target.files[0]);
  }

  function saveDp() {
    updateDisplayPicture(selectedImage);
  }

  return (
    <Modal
      open={useSelector((state) => state.profile.dpModal)} // Keeps the original `dpModal` state variable
      onClose={() => dispatch(setDpModal(false))}
      disableScrollLock={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography
              variant="h6"
              id="modal-modal-title"
              sx={{ color: "#424854", fontWeight: "bold", mb: 2 }}
            >
              Change Display Picture
            </Typography>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={dpChangehandler}
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <Typography variant="body1" sx={{ color: "#6f6f70" }}>
                Upload Image
              </Typography>
              <MdDriveFolderUpload style={{ fontSize: "100px", color: "#6f6f70" }} />
            </label>
            {selectedImage && (
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {selectedImage.name}
              </Typography>
            )}
            <Box
              sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', gap: 2, mt: 2 }}
            >
              <Btn
                children={"Save"}
                color={"#FFD60A"}
                textColor={"#000814"}
                onClickFunction={saveDp}
                style={{ flex: 1 }} // Adding flex property for alignment
              />
              <Btn
                children={"Cancel"}
                color={"#424854"}
                textColor={"#C5C7D4"}
                onClickFunction={() => dispatch(setDpModal(false))}
                style={{ flex: 1 }} // Adding flex property for alignment
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ChangeDpModal;
