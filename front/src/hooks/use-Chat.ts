import { useEffect, useState } from "react";
import type { Message, MessageRequest } from "@/models/chatroom";
import { chatConnection } from "@/services/signalR/chatConnection";

export function useChat(chatRoomId: string, userId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let mounted = true;

    chatConnection
      .start()
      .then(() => {
        if (!mounted) return;
        setConnected(true);
        chatConnection.invoke("JoinRoom", chatRoomId);
      })
      .catch((err: any) => console.error("bahe", err));

    chatConnection.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      
    });

    return () => {
      mounted = false;
      chatConnection.off("newMessage");
      chatConnection.invoke("LeaveRoom", chatRoomId).catch(() => {});
    };
  }, [chatRoomId]);

  const sendMessage = async (content: string) => {
    const message: MessageRequest = {
      roomId: chatRoomId,
      senderId: userId,
      content,
    };

    await chatConnection.invoke("SendMessage", message);
  };

  return {
    messages,
    sendMessage,
    connected,
  };
}
