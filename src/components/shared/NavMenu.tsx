import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";

const NavMenu = () => {
    const navStyle ="hover:bg-white hover:text-zinc-700  hover:rounded-xl hover:py-1 hover: px-2 "
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList className="space-x-6 text-white font-semibold">
          <NavLink to={"/about"}>
            <NavigationMenuItem className={navStyle}>About</NavigationMenuItem>
          </NavLink>

          <NavigationMenuItem className={navStyle}>
            Dashboard
          </NavigationMenuItem>
          <NavigationMenuItem className={navStyle}>
            All Products
          </NavigationMenuItem>
          {/* <NavigationMenuItem className={navStyle}>Contact</NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
