import React from "react"
import { Modal, Box } from "@mui/material"
import Btn from "../../../../common/Btn"
import { IoMdClose } from "react-icons/io";

const ViewSubSectionModal = ({ viewSubSectionModal, setViewSubSectionModal, subSection }) => {
    return (
        <Modal open={viewSubSectionModal} onClose={() => setViewSubSectionModal(false)} disableScrollLock={true} >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    width: {
                        xs: "90%",  // Full width on extra small screens
                        sm: "75%",  // Smaller width on small screens
                        md: "60%",  // Medium width on medium screens
                        lg: "50%",  // Default width on large screens
                    },
                }}
            >
                <div className="view-subsection-modal flex flex-col gap-2 bg-[#161D29] rounded-md p-4">
                    <div className="flex justify-between items-center bg-[#2C333F] text-[#FFFFFF] p-3 rounded-t-md ">
                        <p>Viewing Lecture</p>
                        <IoMdClose onClick={() => setViewSubSectionModal(false)} className="cursor-pointer hover:scale-125 " />
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <div>
                            <p className="text-sm font-[400] text-[#C5C7D4] my-1 " >Lecture Video</p>
                            <video src={subSection?.videoUrl} controls className="rounded-md" />
                        </div>
                        <div>
                            <p className="text-sm font-[400] text-[#C5C7D4] my-1 " >Lecture Title</p>
                            <p className="text-[#999DAA] bg-[#424854] p-2 rounded-md " > {subSection?.title} </p>
                        </div>
                        <div>
                            <p className="text-sm font-[400] text-[#C5C7D4] my-1 " >Lecture Description</p>
                            <p className="text-[#999DAA] bg-[#424854] p-2 rounded-md " > {subSection?.description} </p>
                        </div>

                    </div>
                </div>
            </Box>
        </Modal>
    )
};

export default ViewSubSectionModal;
