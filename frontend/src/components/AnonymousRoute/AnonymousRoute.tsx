import { Outlet, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export const AnonymousRoute = () => {
    const { user } = useAuth();
    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
