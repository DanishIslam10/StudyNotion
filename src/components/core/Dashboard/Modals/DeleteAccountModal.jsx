import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteAccountModal } from '../../../../slices/profileSlice';
import Btn from '../../../common/Btn'; // Import your custom Btn component
import { useDeleteAccountHook, useLogOutHook } from '../../../../services/operations/operations';
import Spinner from "../../../common/Spinner"
import { RiDeleteBin6Line } from "react-icons/ri";

function DeleteAccountModal() {
    const { deleteAccountModal } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const deleteAccount = useDeleteAccountHook()
    const { loading } = useSelector((state) => state.auth)

    function deleteAccountHandler() {
        deleteAccount()
    }

    return (
        <div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <Modal
                        open={deleteAccountModal}
                        onClose={() => dispatch(setDeleteAccountModal(false))}
                        disableScrollLock={true}
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
                                    sm: "500px",
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
                            <div className="h-1 w-full bg-gradient-to-r from-[#EF476F] via-[#FF6B81] to-[#F78C6B]" />

                            <div className="p-7">

                                {/* Icon */}
                                <div
                                    className="
                mb-5 flex h-16 w-16 items-center justify-center
                rounded-2xl bg-[#EF476F]/10
                text-3xl text-[#FF7B94]
              "
                                >
                                    <RiDeleteBin6Line />
                                </div>

                                {/* Heading */}
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#FFFFFF",
                                        mb: 1.5,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    Delete Account Permanently
                                </Typography>

                                {/* Description */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#94A3B8",
                                        lineHeight: 1.8,
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    This action cannot be undone. Deleting your account will permanently remove your profile, purchased courses, saved data, and all associated activity from our platform.
                                </Typography>

                                {/* Warning Box */}
                                <div
                                    className="
                mt-5 rounded-2xl border border-[#EF476F]/20
                bg-[#EF476F]/10 p-4
              "
                                >
                                    <p className="text-sm font-medium text-[#FFB4C2]">
                                        You will lose access to all enrolled courses and account data permanently.
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

                                    <Btn
                                        variant="secondary"
                                        onClickFunction={() =>
                                            dispatch(setDeleteAccountModal(false))
                                        }
                                        children={"Cancel"}
                                        fullWidth={true}
                                    />

                                    <Btn
                                        variant="danger"
                                        onClickFunction={deleteAccountHandler}
                                        children={"Delete Account"}
                                        fullWidth={true}
                                    />
                                </div>
                            </div>
                        </Box>
                    </Modal>
                )
            }
        </div>
    );
}

export default DeleteAccountModal;
