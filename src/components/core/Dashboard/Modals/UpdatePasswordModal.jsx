import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatePasswordModal, setUpdatePasswordInformation } from "../../../../slices/profileSlice";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import Btn from "../../../common/Btn"; // Import the custom Btn component
import { useUpdatePasswordHook } from "../../../../services/operations/operations";

const UpdatePasswordModal = () => {
  const dispatch = useDispatch();
  const { updatePasswordModal, updatePasswordInformation } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.auth);
  const updatePassword = useUpdatePasswordHook();

  function updatePasswordHandler() {
    updatePassword(updatePasswordInformation);
  }

  return (
    <Modal
      open={updatePasswordModal} // Controls modal visibility based on Redux state
      onClose={() => dispatch(setUpdatePasswordModal(false))} // Closes modal on cancel
      disableScrollLock={true}
      aria-labelledby="update-password-modal-title"
      aria-describedby="update-password-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography
              variant="h6"
              id="update-password-modal-title"
              sx={{ color: "#424854", fontWeight: "bold", mb: 2 }}
            >
              Are you sure?
            </Typography>
            <Typography
              variant="body2"
              id="update-password-modal-description"
              sx={{ color: "#808080", mb: 2 }}
            >
              Your password will be changed.
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                gap: 2,
                mt: 2,
              }}
            >
              <Btn
                children={"Update"}
                color={"#FFD60A"}
                textColor={"#000814"}
                onClickFunction={updatePasswordHandler}
                style={{ flex: 1 }} // Ensures equal spacing for buttons
              />
              <Btn
                children={"Cancel"}
                color={"#424854"}
                textColor={"#ffffff"}
                onClickFunction={() => dispatch(setUpdatePasswordModal(false))}
                style={{ flex: 1 }} // Ensures equal spacing for buttons
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UpdatePasswordModal;
