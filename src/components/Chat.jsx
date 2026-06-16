import { useEffect } from "react";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {

  useEffect(() => {
    const socket = createSocketConnection();
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });
  }, [])
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-md h-[550px] bg-base-100 rounded-2xl shadow-xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4 font-semibold text-lg">
          Chat
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate">
          {/* Messages will come here */}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;