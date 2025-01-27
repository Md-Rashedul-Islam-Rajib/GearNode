import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import NavMenu from "./NavMenu";
import logo from "../../../public/assets/logo-2.png";
import { currentUser, logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { useNavigate } from "react-router";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser); // Select current user from the state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();  // State for mobile menu

  const handleLogout = () => {
    dispatch(logout());
    console.log("User logged out");
  };

  const handleLogin = () => {
      navigate('/login');
  };

  return (
    <nav className="bg-zinc-700 text-white">
      <div className="container mx-auto flex items-center justify-between px-5 py-4">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="w-36 md:w-[130px] lg:w-52" />
        </div>

        {/* Menu for Large Screens */}
        <div className="hidden md:flex gap-6 items-center">
          <NavMenu />
          <div>
            {user ? (
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            ) : (
              <InteractiveHoverButton
                className="text-black"
                onClick={handleLogin}
              >
                {" "}
                Log In
              </InteractiveHoverButton>
            )}
          </div>
        </div>

        {/* Hamburger Menu Icon for Small Screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-800 text-white px-5 pb-4 space-y-4">
          <NavMenu />
          <div>
            {user ? (
              <Button
                className="bg-red-500 hover:bg-red-600 w-full"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            ) : (
              <InteractiveHoverButton
                className="text-black"
                onClick={handleLogin}
              >
                {" "}
                Log In
              </InteractiveHoverButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
