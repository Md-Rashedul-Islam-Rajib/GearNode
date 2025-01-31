import { Navigate } from "react-router";
// import { PrivateRoute, User } from "../../types/route.types";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, currentUserToken } from "@/redux/features/auth/authSlice";
import { PrivateRoute } from "@/types/auth.types";

const ProtectedRoute: React.FC<PrivateRoute> = ({
  allowedRoles = [],
  children,
}) => {
  const token = useAppSelector(currentUserToken);
  const user = useAppSelector(currentUser);
  // console.log(user);
    

  if (!token) {
    return <Navigate to="/login" replace></Navigate>;
  }
  if (
    allowedRoles.length &&
    (user && !allowedRoles.includes(user?.role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
