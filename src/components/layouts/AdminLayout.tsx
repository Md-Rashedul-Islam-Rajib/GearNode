import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../shared/AppSidebar";
import { adminPaths } from "@/routes/admin/AdminRoutes";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen overflow-hidden">
        {/* Sidebar */}
        <AppSidebar paths={adminPaths} />

        {/* SidebarTrigger to toggle Sidebar */}
        <SidebarTrigger className="" />

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
