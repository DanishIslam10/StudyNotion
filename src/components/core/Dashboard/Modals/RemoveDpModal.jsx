import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal, Typography, CircularProgress } from "@mui/material";
import { setRemoveDpModal } from "../../../../slices/profileSlice";
import { useRemoveDisplayPictureHook } from "../../../../services/operations/operations";
import Btn from "../../../common/Btn"; // Import the custom Btn component
import { RiDeleteBin6Line } from "react-icons/ri";

const RemoveDpModal = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const removeDisplayPicture = useRemoveDisplayPictureHook();

  function removeDpHandler() {
    removeDisplayPicture();
  }

  return (
    <Modal
      open={useSelector((state) => state.profile.removeDpModal)}
      onClose={() => dispatch(setRemoveDpModal(false))}
      disableScrollLock={true}
      aria-labelledby="remove-dp-modal-title"
      aria-describedby="remove-dp-modal-description"
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
            sm: "450px",
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
        <div className="h-1 w-full bg-gradient-to-r from-red-400 via-pink-500 to-rose-500" />

        <div className="p-7">

          {
            loading ? (

              <div className="flex items-center justify-center py-10">
                <CircularProgress sx={{ color: "#FFD60A" }} />
              </div>

            ) : (
              <>

                {/* Warning Icon */}
                <div
                  className="
                mb-5 flex h-16 w-16 items-center justify-center
                rounded-2xl bg-red-500/10
                text-3xl text-[#f1828f]
              "
                >
                  <RiDeleteBin6Line />
                </div>

                {/* Heading */}
                <Typography
                  variant="h5"
                  id="remove-dp-modal-title"
                  sx={{
                    fontWeight: 700,
                    color: "#FFFFFF",
                    mb: 1.5,
                    lineHeight: 1.3,
                  }}
                >
                  Remove Profile Picture?
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  id="remove-dp-modal-description"
                  sx={{
                    color: "#94A3B8",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  Your current display picture will be permanently removed from your account.
                </Typography>

                {/* Warning Box */}
                <div
                  className="
                mt-5 rounded-2xl border border-[#7b7b7b] p-3
              "
                >
                  <p className="text-sm font-medium text-[#dddddd]">
                    You can upload a new profile picture anytime later.
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

                  <Btn
                    children={"Cancel"}
                    variant="secondary"
                    onClickFunction={() =>
                      dispatch(setRemoveDpModal(false))
                    }
                    fullWidth={true}
                  />

                  <Btn
                    children={"Remove"}
                    variant="danger"
                    onClickFunction={removeDpHandler}
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

export default RemoveDpModal;
