import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    type User,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBqOH5XMJvdZ32ikXSKYSC_lW0e3txuMk4",
    authDomain: "bookboxd-be613.firebaseapp.com",
    projectId: "bookboxd-be613",
    storageBucket: "bookboxd-be613.firebasestorage.app",
    messagingSenderId: "581132558926",
    appId: "1:581132558926:web:8be59891c3ad9cfd70d91f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { user: result.user, error: null };
    } catch (error) {
        return { user: null, error };
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        return { error };
    }
};
export const onAuthChange = (callback: (user: User | null) => void) =>
    onAuthStateChanged(auth, callback);
