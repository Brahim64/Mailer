import { DiscussionSideBar } from "@/components/discussionSideBar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

export const Messages: React.FC = () => {
  return (
    <div>
      <SidebarProvider>
        <DiscussionSideBar />
        <SidebarInset>
            <Outlet />
        </SidebarInset>
        
      </SidebarProvider>
      
    </div>
  );
};

export default Messages;
