import React from "react"
import { Modal, Box } from "@mui/material"
import { useForm } from "react-hook-form";
import Btn from "../../../../common/Btn";
import VideoUpload from "../VideoUpload";
import { useUpdateSubSection } from "../../../../../services/operations/operations";

const EditSubSectionModal = ({ editSubSectionModal, setEditSubSectionModal, subSectionId }) => {

    const updateSubSection = useUpdateSubSection()

    const {
        register,
        setValue,
        getValues,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm()

    function closeHandler() {
        setEditSubSectionModal(false)
        reset()
    }

    function updateSubSectionHandler(data) {
        data.subSectionId = subSectionId
        // console.log("updation data is: ", data)
        updateSubSection(data)
        setEditSubSectionModal(false)
        reset()
    }

    return (
        <Modal open={editSubSectionModal} onClose={() => setEditSubSectionModal(false)} disableScrollLock={true}>
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
                <div>
                    <p className="bg-[#2C333F] p-2 text-lg font-[600] text-[#FFFFFF] rounded-t-md ">Add Lecture</p>
                    <form className="flex flex-col gap-3 sub-section-form p-4 bg-[#161D29] ">

                        <VideoUpload register={register} setValue={setValue} errors={errors} />

                        <div className="flex flex-col">
                            <label htmlFor="title" >Lecture Title</label>
                            <input
                                type="text"
                                placeholder="Enter lecture title"
                                {...register("title")}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description" >Lecture Description</label>
                            <textarea
                                rows={4}
                                placeholder="Enter Lecture Description"
                                {...register("description")}
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Btn
                                children="Close"
                                color="#2C333F"
                                textColor="#F1F2FF"
                                onClickFunction={closeHandler}
                            />
                            <Btn
                                children="Update"
                                color="#FFD60A"
                                textColor="#000814"
                                onClickFunction={handleSubmit(updateSubSectionHandler)}
                            />
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    )
};

export default EditSubSectionModal;
