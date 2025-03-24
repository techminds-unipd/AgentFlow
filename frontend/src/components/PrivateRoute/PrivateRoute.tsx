import { Outlet, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { JSX } from "react";

export const PrivateRoute = (): JSX.Element => {
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/signin" replace />;
};
