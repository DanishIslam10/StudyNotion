import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteAccountModal } from '../../../../slices/profileSlice';
import Btn from '../../../common/Btn'; // Import your custom Btn component
import { useDeleteAccountHook, useLogOutHook } from '../../../../services/operations/operations';
import Spinner from "../../../common/Spinner"

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
                        disableScrollLock={true}>
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
                                maxWidth: '90%', // Responsive width
                                width: 'fit-content', // Fit content width
                            }}
                        >
                            <Typography variant="h5" sx={{ color: '#D32F2F', my: 2 }}>
                                Warning: Deleting Your Account is Permanent
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#808080' }}>
                                This action is irreversible. Deleting your account will permanently remove all your data,
                                including profile information, saved content, and activity history. You will no longer be able
                                to access any of your information. Are you sure you want to proceed?
                            </Typography>
                            <div className='flex gap-2 mt-4'>
                                <Btn
                                    color={"#808080"}
                                    textColor={"white"}
                                    onClickFunction={() => dispatch(setDeleteAccountModal(false))}
                                    children={"Cancel"}
                                    style={{ flex: 1 }} // Adding flex property for equal spacing
                                />
                                <Btn
                                    color={"#D32F2F"}
                                    textColor={"white"}
                                    onClickFunction={deleteAccountHandler}
                                    children={"Delete My Account"}
                                    style={{ flex: 1 }} // Adding flex property for equal spacing
                                />
                            </div>
                        </Box>
                    </Modal>
                )
            }
        </div>
    );
}

export default DeleteAccountModal;
