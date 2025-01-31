import { Outlet } from "react-router";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
// import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
// import AppSidebar from "../shared/AppSidebar";

const MainLayout = () => {
  return (
    <div className="flex">
      {/* <SidebarProvider> */}
        <div className="flex w-full min-h-screen">
          {/* <AppSidebar /> */}
          <main className="w-screen">
            <Navbar />
            {/* <SidebarTrigger className=""/> */}
            <Outlet />
            <Footer />
          </main>
        </div>
      {/* </SidebarProvider> */}
    </div>
  );
};

export default MainLayout;
