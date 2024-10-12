import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogOutHook } from "../../../../services/operations/operations";
import { setLogoutModal } from "../../../../slices/profileSlice";
import { Modal, Box, Typography } from '@mui/material';
import Btn from "../../../common/Btn"; // Import the custom Btn component

const LogoutModal = () => {
  const dispatch = useDispatch();
  const logout = useLogOutHook();
  const { logoutModal } = useSelector((state) => state.profile);

  function logoutHandler() {
    dispatch(setLogoutModal(false));
    logout();
  }

  return (
    <Modal open={logoutModal} onClose={() => dispatch(setLogoutModal(false))} disableScrollLock={true}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: "0.4rem",
          boxShadow: 24,
          maxWidth: '90%', // Adjust max width for responsiveness
          width: 'fit-content', // Adjust width to fit content
        }}
      >
        <Typography variant="h6" className="text-[#616161] my-2 w-fit">
          Are you sure?
        </Typography>
        <Typography variant="body2" className="text-[#808080] w-fit">
          You will be logged out of your account.
        </Typography>
        <div className="flex gap-2 mt-4">
          <Btn
            color={"#FFD60A"}
            textColor={"#000814"}
            onClickFunction={logoutHandler}
            children={"Logout"}
            style={{ flex: 1 }} // Adding flex property for equal spacing
          />
          <Btn
            color={"#424854"}
            textColor={"white"}
            onClickFunction={() => dispatch(setLogoutModal(false))}
            children={"Close"}
            style={{ flex: 1 }} // Adding flex property for equal spacing
          />
        </div>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
