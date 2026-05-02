import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

export const MainLayout = () => {
    const navItems = [
        { name: "BOOKS", path: "/books" },
        { name: "SHELVES", path: "/bookshelves" },
    ];
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signIn, signOut } = useAuth();

    return (
        <>
            <header className="border-b bg-gray-900 border-t border-gray-800">
                <nav className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center">
                            <span className="text-3xl font-black tracking-tight text-white hover:text-gray-600 transition-colors">
                                BookBoxd
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-6">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`cursor-pointer text-sm font-medium tracking-wide transition-colors ${
                                            isActive
                                                ? "text-white"
                                                : "text-gray-500 hover:text-white"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <button
                                        className="cursor-pointer text-sm font-medium tracking-wide transition-colors text-gray-500 hover:text-white"
                                        onClick={signOut}
                                    >
                                        LOG OUT
                                    </button>
                                    <img
                                        src={user.photoURL || undefined}
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>
                            ) : (
                                <button
                                    className="cursor-pointer text-sm font-medium tracking-wide transition-colors text-gray-500 hover:text-white"
                                    onClick={signIn}
                                >
                                    LOG IN
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block py-3 text-sm font-medium tracking-wide transition-colors ${
                                            isActive ? "text-white" : "text-gray-500"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </nav>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8 ">
                <Outlet />
            </main>
            <footer className="border-t bg-gray-900 border-t border-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <p className="text-xs text-gray-300 leading-relaxed">
                            © 2026 BookBoxd Limited. Made by fans in{" "}
                            <span className="line-through text-gray-400">Minsk</span>{" "}
                            <span className="text-gray-400">Mensk</span>, Belarus. Book data from{" "}
                            <a
                                href="https://developers.google.com/books"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-600 transition-colors underline decoration-dotted underline-offset-2"
                            >
                                Google books API
                            </a>
                            .{" "}
                        </p>

                        <p className="text-xs text-gray-200 italic leading-relaxed">
                            and Modern Romance. the hood on the Academy's new award. spectacularly
                            niche moments in this season's literature.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};
