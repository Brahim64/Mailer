import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import type { ChatRoom, Message } from "@/models/chatroom";
import {
  fetchChatRoomById,
  fetchMessagesByRoomId,
} from "@/services/chatServices";
import { useUser } from "@/contexts/userContext";
import MessageHolder from "./MessageHolder";
import { Textarea } from "./ui/textarea";
import { LucideSend } from "lucide-react";
import { useChat } from "@/hooks/use-Chat";
import { ScrollArea } from "./ui/scroll-area";

export const Discussion: React.FC = () => {
  const user = useUser();
  const { id } = useParams();

  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { messages: chatMessages, sendMessage } = useChat(
    id || "",
    user?.id || ""
  );
  const sendingMessage = async (content: string) => {
    await sendMessage(content);
    setNewMessage("");
  };
  useEffect(() => {
    if (id) {
      fetchChatRoomById(id)
        .then(setChatRoom)
        .finally(() => setLoading(false));
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      fetchMessagesByRoomId(id)
        .then(setMessages)
        .finally(() => setLoading(false));
    }
  }, [id]);
  useEffect(() => {
    if (chatMessages) {
      setMessages((prev) => [...prev, ...chatMessages]);
    }
  }, [chatMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {chatRoom?.name ||
            chatRoom?.metaData.users.filter((u) => u.id !== user?.id)[0]?.name}
        </CardTitle>
        <CardDescription>Start Sending Messages</CardDescription>
        <CardAction>
          <Button variant="link">Options</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-100 w-full rounded-md border">
          <div className="p-4">
            {loading && <p>Loading chat...</p>}
            {!loading && !chatRoom && <p>No chat room found.</p>}
            {!loading &&
              messages &&
              user &&
              messages.map((message) => (
                <MessageHolder message={message} currentUserId={user.id} />
              ))}
          </div>
          <div ref={bottomRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <Textarea
          placeholder="Type your message here."
          className="basis-230"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          onClick={() => sendingMessage(newMessage)}
          disabled={newMessage.trim() === ""}
        >
          <LucideSend />
        </Button>
      </CardFooter>
    </Card>
  );
};
