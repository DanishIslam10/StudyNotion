import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDriveFolderUpload } from "react-icons/md";
import { Box, Modal, CircularProgress } from "@mui/material";
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
      open={useSelector((state) => state.profile.dpModal)}
      onClose={() => dispatch(setDpModal(false))}
      disableScrollLock={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
            sm: "480px",
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

                {/* Header */}
                <div className="mb-6">

                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Change Profile Picture
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
                    Upload a new profile image to personalize your account.
                  </p>
                </div>

                {/* Upload Box */}
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={dpChangehandler}
                />

                <label
                  htmlFor="file-upload"
                  className="
                group flex cursor-pointer flex-col items-center
                justify-center rounded-3xl
                border-2 border-dashed border-white/10
                bg-white/[0.03]
                px-6 py-10
                transition-all duration-300
                hover:border-yellow-300/40
                hover:bg-white/[0.05]
              "
                >

                  {/* Upload Icon */}
                  <div
                    className="
                  flex h-24 w-24 items-center justify-center
                  rounded-2xl bg-yellow-300/10
                  text-[#FFD60A]
                  transition-all duration-300
                  group-hover:scale-105
                  group-hover:bg-yellow-300/20
                "
                  >
                    <MdDriveFolderUpload className="text-6xl" />
                  </div>

                  {/* Upload Text */}
                  <p className="mt-5 text-lg font-semibold text-white">
                    Upload Image
                  </p>

                  <p className="mt-1 text-sm text-[#94A3B8]">
                    PNG, JPG or JPEG (Max 5MB)
                  </p>

                  {/* Selected File */}
                  {
                    selectedImage && (
                      <div
                        className="
                      mt-5 rounded-2xl border border-green-400/20
                      bg-green-400/10 px-4 py-3
                    "
                      >
                        <p className="text-sm font-medium text-green-300">
                          {selectedImage.name}
                        </p>
                      </div>
                    )
                  }
                </label>

                {/* Buttons */}
                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

                  <Btn
                    children={"Cancel"}
                    variant="secondary"
                    onClickFunction={() => dispatch(setDpModal(false))}
                    fullWidth={true}
                  />

                  <Btn
                    children={"Save Changes"}
                    color={"#FFD60A"}
                    textColor={"#000814"}
                    onClickFunction={saveDp}
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

export default ChangeDpModal;
