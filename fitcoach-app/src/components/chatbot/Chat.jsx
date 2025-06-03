import React, { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { VscClose } from "react-icons/vsc";
import { BsFillSendFill } from "react-icons/bs";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { SEND_MESSAGE } from "../../graphql/mutations/chatMutation";
import { GET_CHAT_HISTORY } from "../../graphql/queries/chatbotQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import TypingIndicator from "./TypingIndicator";
import TextareaAutosize from "react-textarea-autosize";

const Chat = () => {
  const { visibleChat, setVisibleChat } = useContext(ModalContext);
  const messagesEndRef = useRef(null);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { authInfo } = useSelector((state) => state.auth);
  const userId = authInfo?.user?.id;

  // Fetch chat history
  const { loading: historyLoading } = useQuery(GET_CHAT_HISTORY, {
    variables: { userId },
    skip: !userId || !visibleChat,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setMessages(data?.getChatHistory || []);
    },
    onError: (error) => {
      console.error("Error loading chat history:", error);
    }
  });

  // Enhanced send message mutation with proper optimistic response
  const [sendMessage, { loading: sendLoading }] = useMutation(SEND_MESSAGE, {
    update: (cache, { data: { sendMessage } }) => {
      // This ensures the Apollo cache is updated with the new message
      if (sendMessage?.history) {
        const newMessages = sendMessage.history;
        cache.writeQuery({
          query: GET_CHAT_HISTORY,
          variables: { userId },
          data: { getChatHistory: newMessages },
        });
      }
    },
  });

  // Handle send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const tempId = Date.now().toString();

    const userMsg = {
      sender: "user",
      text: userMessage,
      timestamp: new Date().toISOString()
    };

    try {
      // Optimistically update UI
      setMessages(prev => [...prev, userMsg]);
      setUserMessage("");

      // Send message to server
      const response = await sendMessage({
        variables: { userId, message: userMessage },
        optimisticResponse: {
          sendMessage: {
            reply: "Thinking...",
            history: [...messages, userMsg],
            __typename: "ChatResponse"
          }
        }
      });

      console.log('user message:', userMessage);
      console.log("Response from server:", response);

      if (response.data?.sendMessage?.history) {
        // Replace temp message with actual response
        setMessages(response.data.sendMessage.history);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      // Remove temporary messages on error
      setMessages(prev => prev.filter(msg => msg.tempId !== tempId));
      setUserMessage(userMessage);
    } finally {
      setUserMessage("");
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {visibleChat && (
        <div className="fixed border-2 border-[#2caa8e] z-40 mx-4 bottom-18 right-0 md:bottom-12 md:right-24 xl:bottom-23 lx:right-30 rounded-xl md:w-[400px] bg-[#ffff] transition-all overflow-hidden">
          <div className="h-full">
            {/* header */}
            <div className="flex z-40 justify-between items-center px-3 py-1 bg-[#2caa8e]">
              <p className="text-gray-800 font-semibold">
                FitCoash-AI Chatbot 🤖
              </p>
              <VscClose
                onClick={() => setVisibleChat(false)}
                size={20}
                className="text-gray-800 cursor-pointer"
              />
            </div>

            {/* chat */}
            <div className="relative flex flex-col h-[450px] bg-[#f3f3f3] dark:bg-[#0c1a17] overflow-y-auto scrollbar-hide">
              {historyLoading ? (
                <div className="flex justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={`${msg.timestamp}-${i}`}
                    className={`relative flex justify-${
                      msg.sender === "user" ? "end" : "start"
                    } items-center`}
                  >
                    <div
                      className={`flex flex-col gap-1 m-3 max-w-4/6 rounded-xl p-2  ${
                        msg.sender === "user" ? "bg-[#81e4cf]" : "bg-gray-300"
                      }`}
                    >
                      <p className="text-[14px] z-30 text-gray-800">
                        {msg.text}
                      </p>
                      <div
                        className={`flex justify-${
                          msg.sender === "user" ? "end" : "start"
                        }`}
                      >
                        <span className="text-[8px] z-30 text-gray-500">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    {msg.sender === "user" ? (
                      <IoArrowRedo
                        size={34}
                        className="absolute text-[#81e4cf] bottom-1 right-2 -rotate-90"
                      />
                    ) : (
                      <IoArrowUndo
                        size={34}
                        className="absolute text-gray-300 bottom-1 left-2 rotate-90"
                      />
                    )}
                  </div>
                ))
              )}

              <div className="absolute bottom-1 left-2">
                {sendLoading && <TypingIndicator isTyping={sendLoading} />}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* input */}
            <div className="px-4 p-3 z-40 rounded-b-lg drop-shadow-2xl bg-[#2caa8e]">
              <div className="flex items-center gap-2">
                <TextareaAutosize
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  minRows={1}
                  maxRows={3}
                  placeholder="Ask me anything"
                  className="border-1 border-gray-600 text-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-800 placeholder:text-gray-600 px-3 py-1 w-full resize-none scrollbar-hide"
                />
                <BsFillSendFill
                  onClick={handleSend}
                  size={24}
                  className="text-gray-800 hover:scale-105 hover:text-gray-900 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;