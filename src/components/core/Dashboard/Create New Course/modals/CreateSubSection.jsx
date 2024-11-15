import React, { useState } from "react";
import { Modal, Box } from '@mui/material';
import { useForm } from "react-hook-form";
import Btn from "../../../../common/Btn";
import VideoUpload from "../VideoUpload";
import { useCreateSubSection } from "../../../../../services/operations/operations";

const CreateSubSectionModal = ({ createSubSectionModal, setCreateSubSectionModal,sectionId }) => {

    // console.log("section id prop wali : ",sectionId)

    const {
        register,
        getValues,
        setValue,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const createSubSection = useCreateSubSection()

    // console.log("sub section form data: ",getValues())

    function closeHandler() {
        setCreateSubSectionModal(false)
        reset()
    }

    function createSubSectionHandler(data) {
        data.sectionId = sectionId
        // console.log("subsection form data submit hone se pehle : ", data)
        createSubSection(data)
        reset()
        setCreateSubSectionModal(false)
    }

    return (
        <Modal open={createSubSectionModal} onClose={() => setCreateSubSectionModal(false)} disableScrollLock={true}>
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
                       
                        <VideoUpload register = {register} setValue = {setValue} errors={errors} />

                        <div className="flex flex-col">
                            <label htmlFor="title" >Lecture Title</label>
                            <input
                                type="text"
                                placeholder="Enter lecture title"
                                {...register("title", { required: true })}
                            />
                            {
                                errors.title && (
                                    <span>Title is required</span>
                                )
                            }
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description" >Lecture Description</label>
                            <textarea
                                rows={4}
                                placeholder="Enter Lecture Description"
                                {...register("description", { required: true })}
                            />
                            {
                                errors.description && (
                                    <span>Lecture description is required.</span>
                                )
                            }
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Btn
                                children="Close"
                                color="#2C333F"
                                textColor="#F1F2FF"
                                onClickFunction={closeHandler}
                            />
                            <Btn
                                children="Create"
                                color="#FFD60A"
                                textColor="#000814"
                                onClickFunction={handleSubmit(createSubSectionHandler)}
                            />
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default CreateSubSectionModal;
