import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Input } from "./ui/input";
import AddContact from "./addContact";
import { useEffect, useState } from "react";
import { fetchChatRooms } from "@/services/chatServices";
import { useUser } from "@/contexts/userContext";
import { ChatRoom } from "@/models/chatroom";
import type { User } from "@/models/User";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function DiscussionSideBar() {
  const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);
  const [receptients, setReceptients] = useState<User[]>([]);

  const user = useUser();

  useEffect(() => {
    if (user) {
      fetchChatRooms(user!.id)
        .then((data) => {
          setChatrooms(data);
          console.log("Chat rooms retrieved:", data);
        })
        .catch((error) => {
          console.error("Error fetching chat rooms:", error);
        });
    }
  }, [user]);
  useEffect(() => {}, [chatrooms]);
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Messages</SidebarGroupLabel>
          <SidebarGroupContent>
            <Input placeholder="Search messages..." className="mb-4" />
            <SidebarMenu>
              {chatrooms.map((chatroom, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="flex items-center gap-3 p-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          chatroom.metaData.users
                            .filter((u) => u.id !== user?.id)
                            .at(0)?.profileImage
                        }
                        alt="User Avatar"
                      />
                      <AvatarFallback>
                        {chatroom.metaData.users
                          .filter((u) => u.id !== user?.id)
                          .map((u) => u.name.charAt(0))
                          .join(", ")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {chatroom.metaData.users
                          .filter((u) => u.id !== user?.id)
                          .map((u) => u.name)
                          .join(", ")}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {chatroom.metaData.lastMessage
                          ? chatroom.metaData.lastMessage.content
                          : "No messages yet."}
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AddContact />
      </SidebarFooter>
    </Sidebar>
  );
}
