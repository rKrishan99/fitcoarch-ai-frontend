import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoCloseOutline } from "react-icons/io5";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // <600px
    sm: 400, // >=600px
    md: 500, // >=900px
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  diplay: "flex",
  justifyItems: "center",
  borderRadius: 4,
};

const AskYesOrNot = () => {
  const {
    setVisiblleRequestResetPassword,
    closeAllModals,
    visibleAskYesOrNot,
    setVisibleAskYesOrNot,
  } = useContext(ModalContext);

  return (
    <Modal
      keepMounted
      open={visibleAskYesOrNot}
      onClose={closeAllModals}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <div className="bg-white dark:bg-black w-full h-full rounded-[16px] flex flex-col items-center justify-center relative p-6">
          <IoCloseOutline
            onClick={() => setVisibleAskYesOrNot(false)}
            className="absolute top-4 right-4 cursor-pointer"
            size={24}
          />
          <h1 className="mt-4">Do you want to reset password?</h1>

          <div className="flex flex-row gap-4">
            <button
              onClick={() => {
                setVisibleAskYesOrNot(false);
                setVisiblleRequestResetPassword(true);
              }}
              className="w-[100px] mt-6 bg-primary-400 text-white py-2 px-4 rounded-md hover:bg-primary-500 transition duration-200 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={() => setVisibleAskYesOrNot(false)}
              className="w-[100px] mt-6 bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AskYesOrNot;
