import MainLayout from "./components/layouts/MainLayout";
import UserLayout from "./components/layouts/UserLayout";
import { currentUser } from "./redux/features/auth/authSlice"
import { useAppSelector } from "./redux/hooks"
import { User } from "./types/auth.types";


function App() {

  const user = useAppSelector(currentUser);

  if (!user) {
    return <MainLayout/>
  }
  if (user.role === 'customer') {
    return <UserLayout/>
  }
}

export default App
