
// import { getAuthStorage } from "@/common/utils/auth_storage.utils";
import { ROLES } from "@/common/utils/Roles";

import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

type RouteProps = {
    allowedRoles: string[]
}

const RoleRoute = ({ allowedRoles }: RouteProps) => {
    // const {user} = getAuthStorage() 
    // const user = "admin"

    // if (!user) return <Navigate to="/login" replace />

    // const userRole = (user as { role: string }).role;
    const userRole = ROLES.CLIENTE;

    if (!allowedRoles.includes(userRole) && userRole === ROLES.CLIENTE) {
        toast.error("Te invitamos a iniciar sesión :)",{icon: "🔒", duration: 5000})
        // localStorage.removeItem("user")
        return <Navigate to="/" />;
      }
    
      if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/"  />;
      }
    return <Outlet />
}

export default RoleRoute