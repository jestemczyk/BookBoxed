import { useState, useEffect, type ReactNode } from "react";
import { signInWithGoogle, logout, onAuthChange } from "@/lib/firebase";
import { AuthContext } from "./AuthContext";
import type { User } from "firebase/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signIn = async () => {
        const { error } = await signInWithGoogle();
        if (error) console.error(error);
    };

    const signOut = async () => {
        const { error } = await logout();
        if (error) console.error(error);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
