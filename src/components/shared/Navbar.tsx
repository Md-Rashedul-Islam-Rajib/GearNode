import { currentUser, logout } from "@/redux/features/auth/authSlice";
import { Button } from "../ui/button";
import NavMenu from "./NavMenu";
import logo from "@/assets/logo-2.png"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";


const Navbar = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    }

    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <div className="flex justify-between gap-4 bg-zinc-700 text-white px-5 py-6">
            <div>
                <img src={logo} alt="Logo" className="w-52"/>
            </div>
            <div><NavMenu /></div>
            <div>{user ?
                <Button onClick={handleLogout}> Logout</Button> : 
                <InteractiveHoverButton className="text-black" onClick={handleLogin}> Log In</InteractiveHoverButton>  
                }</div>
        
      </div>
    );
};

export default Navbar;
