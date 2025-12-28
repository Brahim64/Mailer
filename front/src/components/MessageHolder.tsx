import React from "react";
import { Card, CardContent } from "./ui/card";
import type { Message } from "@/models/chatroom";
type MessageHolderProps = {
  message: Message
  currentUserId: string
};
const MessageHolder: React.FC<MessageHolderProps> = ({ message, currentUserId }) => {
const mine = message.senderId === currentUserId
  return (
    <div className="w-full grid rounded-xl my-1 p-1">
      {mine ? (
          <div className="w-fit max-w-[60%] justify-self-end bg-blue-100 p-3 text-sm break-words">
            {message.content}
          </div>
      ) : (
          <div className="w-fit max-w-[60%] justify-self-start bg-gray-100 p-3 text-sm break-words">
            {message.content}
          </div>
        
      )}
    </div>
  );
};

export default MessageHolder;
