import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatePasswordModal, setUpdatePasswordInformation } from "../../../../slices/profileSlice";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import Btn from "../../../common/Btn"; // Import the custom Btn component
import { useUpdatePasswordHook } from "../../../../services/operations/operations";
import { IoKeyOutline } from "react-icons/io5";

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
      open={updatePasswordModal}
      onClose={() => dispatch(setUpdatePasswordModal(false))}
      disableScrollLock={true}
      aria-labelledby="update-password-modal-title"
      aria-describedby="update-password-modal-description"
    >

      {/* Modal Container */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "92%",
            sm: "460px",
          },
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "linear-gradient(180deg, rgba(22,29,41,0.98) 0%, rgba(15,23,42,0.98) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
          outline: "none",
        }}
      >

        {/* Top Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-400" />

        <div className="p-7">

          {
            loading ? (

              <div className="flex items-center justify-center py-10">
                <CircularProgress sx={{ color: "#FFD60A" }} />
              </div>

            ) : (
              <>

                {/* Icon */}
                <div
                  className="
                mb-5 flex h-16 w-16 items-center justify-center
                rounded-2xl bg-yellow-300/10
                text-3xl text-[#FFD60A]
              "
                >
                  <IoKeyOutline />
                </div>

                {/* Heading */}
                <Typography
                  variant="h5"
                  id="update-password-modal-title"
                  sx={{
                    fontWeight: 700,
                    color: "#FFFFFF",
                    mb: 1.5,
                    lineHeight: 1.3,
                  }}
                >
                  Update Password?
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  id="update-password-modal-description"
                  sx={{
                    color: "#94A3B8",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  Your account password will be updated securely. Make sure you remember your new password before continuing.
                </Typography>

                {/* Info Box */}
                <div
                  className="
                mt-5 rounded-2xl border border-yellow-300/20
                bg-yellow-300/10 p-4
              "
                >
                  <p className="text-sm font-medium text-yellow-200">
                    For security reasons, you may need to log in again after changing your password.
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

                  <Btn
                    children={"Cancel"}
                    variant="secondary"
                    onClickFunction={() =>
                      dispatch(setUpdatePasswordModal(false))
                    }
                    fullWidth={true}
                  />

                  <Btn
                    children={"Update Password"}
                    color={"#FFD60A"}
                    textColor={"#000814"}
                    onClickFunction={updatePasswordHandler}
                    fullWidth={true}
                  />
                </div>

              </>
            )
          }
        </div>
      </Box>
    </Modal>
  );
};

export default UpdatePasswordModal;
