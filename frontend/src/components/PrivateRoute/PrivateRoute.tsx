import { Outlet, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export const PrivateRoute = () => {
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/signin" replace />;
};
