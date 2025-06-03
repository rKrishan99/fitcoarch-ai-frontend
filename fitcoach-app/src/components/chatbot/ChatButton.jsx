import React, { useContext } from "react";
import { RiChatVoiceAiFill } from "react-icons/ri";
import { ModalContext } from "../../context/ModalContext";
import { useSelector } from "react-redux";

const ChatButton = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const { visibleChat, setVisibleChat } = useContext(ModalContext);

  const handleClick = () => {
    setVisibleChat(!visibleChat);
    console.log("visibleChat", visibleChat);
  };

  return (
    <>
      {authInfo && (
        <div className="fixed z-10 bottom-4 right-3 md:bottom-12 md:right-8 lx:bottom-22 xl:right-14 hover:scale-110 cursor-pointer">
          <RiChatVoiceAiFill
            size={48}
            className="text-primary-400 hover:text-primary-500"
            onClick={handleClick}
          />
        </div>
      )}
    </>
  );
};

export default ChatButton;
