import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utilis/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./constant";

const Chat = () => {
  const { targetUserId } = useParams();

  const [messages, setMessage] = useState([]);
  const [newMessages, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });
    socket.on("messageRecivied", ({ firstName, newMessages }) => {
      setMessage((messages) => [...messages, { firstName, newMessages }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    getUserChat();
  }, []);

  const getUserChat = async () => {
    const getChat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = getChat?.data?.messages.map((msg) => {
      return { firstName: msg.senderId.firstName, newMessages: msg.text };
    });
    setMessage(chatMessages);
  };

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      userId,
      targetUserId,
      firstName: user.firstName,
      newMessages,
    });
    setNewMessage("");
  };
  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600"> Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }>
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.newMessages}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border border-gray-600 flex items-center gap-2">
        <input
          type="text"
          value={newMessages}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-black rounded p-2 bg-gray-300"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
