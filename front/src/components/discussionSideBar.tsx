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

export function DiscussionSideBar() {
  const [chatrooms,setChatrooms] = useState<ChatRoom[]>([]);
  const [receptients,setReceptients]=useState<User[]>([]);

  const user=useUser();

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
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Messages</SidebarGroupLabel>
          <SidebarGroupContent>
            <Input placeholder="Search messages..." className="mb-4" />
            <SidebarMenu>
              {chatrooms.map((chatroom) => (
                
                <SidebarMenuItem key={chatroom._id}>
                  <SidebarMenuButton asChild>
                    <div className="flex flex-col">
                      <span className="font-medium">{chatroom.metaData.users['100578459061123837692'].name}</span>
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
