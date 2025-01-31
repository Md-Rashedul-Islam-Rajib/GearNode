import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const AppSidebar = ({ paths }: { paths: { title: string; url: string }[] }) => {
  return (
    <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white/30 backdrop-blur-lg shadow-lg transition-transform duration-300 z-50">
      <SidebarContent className="p-4">
        <SidebarMenu>
          {paths.map((item) => (
            <SidebarMenuItem key={item.title} className="py-3 font-semibold">
              <SidebarMenuButton asChild>
                <a href={item.url} className="block w-full text-lg">
                  <span
                    className={item.title === "Items" ? "text-indigo-600" : ""}
                  >
                    {item.title}
                  </span>
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
