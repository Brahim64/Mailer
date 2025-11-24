import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/appSideBar";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";

export default function App() {
  
  return (
    <UserProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
      </UserProvider>
  );
}
