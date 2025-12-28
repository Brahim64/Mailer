import { Discussion } from "@/components/discussion";
import { DiscussionSideBar } from "@/components/discussionSideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export const Messages: React.FC = () => {
  return (
    <SidebarProvider>
      <Discussion />
      <DiscussionSideBar />
    </SidebarProvider>
  );
};

export default Messages;
