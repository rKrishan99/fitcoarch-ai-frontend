import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { SprinnerContext } from "../../context/SprinnerContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../graphql/mutations/authMutation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // <600px
    sm: 300, // >=600px
    md: 400, // >=900px
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  diplay: "flex",
  justifyItems: "center",
  borderRadius: 4,
};

const AddNewPassword = () => {
  const {
    visibleAddNewPassword,
    // setAddNewPassword,
    // setVisiblleRequestResetPassword,
    closeAllModals,
  } = useContext(ModalContext);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await resetPassword({
        variables: { token, newPassword: password }
      });

      dispatch(setCredentials(data.resetPassword));
      toast.success('Password updated successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // if (!token) {
  //   return <div>Invalid reset link</div>;
  // }

  return (
    <Modal
      keepMounted
      open={visibleAddNewPassword}
      onClose={closeAllModals}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <h1 className="">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block mb-1">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            minLength="8"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            minLength="8"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Updating...' : 'Reset Password'}
        </button>
      </form>
      </Box>
    </Modal>
  );
};

export default AddNewPassword;
