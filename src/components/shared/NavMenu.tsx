import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router";

const NavMenu = () => {
  const user = useAppSelector(currentUser);
    const navStyle ="hover:bg-white hover:text-zinc-700  hover:rounded-xl hover:py-1 hover: px-2 "
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList className="space-x-6 text-white font-semibold">
          <NavLink to={"/about"}>
            <NavigationMenuItem className={navStyle}>About</NavigationMenuItem>
          </NavLink>

          {user && (
            <NavLink to={`/${user?.role}`}>
              <NavigationMenuItem className={navStyle}>
                Dashboard
              </NavigationMenuItem>
            </NavLink>
          )}

          {!user ? <NavLink to={"/all-products"}>
            <NavigationMenuItem className={navStyle}>
              All Products
            </NavigationMenuItem>
          </NavLink> :
            <NavLink to={`/${user?.role}/all-products`}>
            <NavigationMenuItem className={navStyle}>
              All Products
            </NavigationMenuItem>
          </NavLink>
          }
          {/* <NavigationMenuItem className={navStyle}>Contact</NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
