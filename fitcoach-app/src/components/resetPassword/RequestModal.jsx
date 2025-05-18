import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { SprinnerContext } from "../../context/SprinnerContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD_RESET } from "../../graphql/mutations/authMutation";
import { toast } from "react-toastify";
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
  p: 4,
  diplay: "flex",
  justifyItems: "center",
  borderRadius: 4,
};

const RequestModal = () => {
  const {
    visibleRequestResetPassword,
    setAddNewPassword,
    setVisiblleRequestResetPassword,
    closeAllModals,
  } = useContext(ModalContext);

  const [requestReset, { loading }] = useMutation(REQUEST_PASSWORD_RESET);

  const { setLoading } = useContext(SprinnerContext);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === "") {
        toast.error("Please add your email!");
        return;
      }

      await requestReset({ variables: { email } });
      toast.success("Password reset link sent to your email");

      setVisiblleRequestResetPassword(false);
      setAddNewPassword(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    console.log("Loading state changed:", loading);
    setLoading(loading);
  }, [loading]);

  return (
    <Modal
      keepMounted
      open={visibleRequestResetPassword}
      onClose={closeAllModals}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <IoCloseOutline
          onClick={() => setVisiblleRequestResetPassword(false)}
          className="absolute top-4 right-4 cursor-pointer"
          size={24}
        />
        <h1 className="tex-left">Enter Your Email</h1>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
          required
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-primary-400 text-white py-2 px-4 rounded-md hover:bg-primary-500 transition duration-200 cursor-pointer"
        >
          Send Reset Link
        </button>
      </Box>
    </Modal>
  );
};

export default RequestModal;
