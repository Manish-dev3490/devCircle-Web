import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const [inputMsgVal, setInputMsgVal] = useState("");
  const [messages, setMessages] = useState([]);

  const { toUserId } = useParams();
  const userDetail = useSelector((store) => store?.userSlice);

  const userId = userDetail?._id;

  const sendMsg = () => {
    if (!inputMsgVal.trim()) return;

    const socket = createSocketConnection();

    socket.emit("send-message", {
      _id: userId,
      firstName: userDetail.firstName,
      toUserId,
      text: inputMsgVal,
    });

    setInputMsgVal("");
  };

  const fetchChat = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + toUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages?.map((data) => {
      const { senderId, text } = data;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text: text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    if (!userId || !toUserId) return;

    const socket = createSocketConnection();

    socket.connect();



    socket.on("connect", () => {
      console.log("✅ Connected", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Connect Error:", err.message);
      console.log(err);
    });


    socket.emit("join-chat", {
      firstName: userDetail.firstName,
      firstUserId: userId,
      toUserId,
    });

    socket.on("new-message", ({ firstName, text }) => {
      console.log(text);

      setMessages((prev) => [
        ...prev,
        {
          firstName,
          text,
        },
      ]);
    });

    return () => {
      console.log("CLEANUP CHALA");
      socket.disconnect();
    };
  }, [userId, toUserId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-md h-[550px] bg-base-100 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-600 text-white text-center py-4 font-semibold text-lg">
          Chat
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages yet</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="mb-3 p-2 rounded-lg bg-gray-100">
                <p className="font-semibold text-gray-600">
                  {msg.firstName + " " + msg.lastName}
                </p>

                <p className=" text-black">{msg.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            value={inputMsgVal}
            onChange={(e) => setInputMsgVal(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendMsg}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
