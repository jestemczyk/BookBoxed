import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { BookOpen } from "lucide-react";

export const PrivateLayout = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f1724] to-[#101828]">
                <div className="relative">
                    <BookOpen className="w-16 h-16 text-indigo-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                    </div>
                </div>
                <p className="mt-6 text-gray-400 text-sm animate-pulse">
                    Loading your bookshelf...
                </p>
            </div>
        );
    }

    if (!user) return <Navigate to="/" replace />;

    return <Outlet />;
};
