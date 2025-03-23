import { Outlet, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { JSX } from "react";

export const AnonymousRoute = (): JSX.Element => {
    const { user } = useAuth();
    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
