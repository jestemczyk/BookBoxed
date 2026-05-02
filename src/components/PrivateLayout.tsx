import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";

export const PrivateLayout = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/" replace />;

    return <Outlet />;
};
