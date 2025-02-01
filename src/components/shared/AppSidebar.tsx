import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useGetAllUsersQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { User } from "@/types/auth.types";

const AppSidebar = ({ paths }: { paths: { title: string; url: string }[] }) => {
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(window.location.pathname); // Get current URL path
  }, []);

  const { data } = useGetAllUsersQuery(undefined);
  const loggedUser = useAppSelector(currentUser);
  const user = data?.data.find(
    (item: User) => item.email === loggedUser?.email
  );

  return (
    <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white/30 backdrop-blur-lg shadow-lg transition-transform duration-300 z-50">
      <SidebarContent className="p-4">
        {/* User Info Section */}
        {user && (
          <div className="flex items-center space-x-4 mb-6 mt-20">
            <img
              src={user.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        )}

        <SidebarMenu>
          {paths.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={`py-3 font-semibold rounded-md transition-colors duration-200 ${
                activePath === item.url ? "bg-zinc-500 text-white" : ""
              }`}
            >
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="block w-full text-lg"
                  onClick={() => setActivePath(item.url)}
                >
                  {item.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
