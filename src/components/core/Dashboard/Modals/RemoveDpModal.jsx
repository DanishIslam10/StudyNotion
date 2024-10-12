import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal, Typography, CircularProgress } from "@mui/material";
import { setRemoveDpModal } from "../../../../slices/profileSlice";
import { useRemoveDisplayPictureHook } from "../../../../services/operations/operations";
import Btn from "../../../common/Btn"; // Import the custom Btn component

const RemoveDpModal = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const removeDisplayPicture = useRemoveDisplayPictureHook();

  function removeDpHandler() {
    removeDisplayPicture();
  }

  return (
    <Modal
      open={useSelector((state) => state.profile.removeDpModal)} // Keeps the original `removeDpModal` state variable
      onClose={() => dispatch(setRemoveDpModal(false))}
      disableScrollLock={true}
      aria-labelledby="remove-dp-modal-title"
      aria-describedby="remove-dp-modal-description"
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
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography
              variant="h6"
              id="remove-dp-modal-title"
              sx={{ color: "#424854", fontWeight: "bold", mb: 2 }}
            >
              Are you sure?
            </Typography>
            <Typography
              variant="body2"
              id="remove-dp-modal-description"
              sx={{ color: "#424854", mb: 2 }}
            >
              Your Display Picture will be removed.
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', gap: 2 }}
            >
              <Btn
                color={"#FFD60A"}
                textColor={"#000814"}
                onClickFunction={removeDpHandler}
                children={"Yes"}
                style={{ flex: 1 }} // Adding flex property for equal spacing
              />
              <Btn
                color={"#424854"}
                textColor={"#C5C7D4"}
                onClickFunction={() => dispatch(setRemoveDpModal(false))}
                children={"No"}
                style={{ flex: 1 }} // Adding flex property for equal spacing
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RemoveDpModal;
