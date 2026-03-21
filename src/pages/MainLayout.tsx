import { useState } from "preact/hooks";
import { Link, Outlet, useLocation } from "react-router";

export const MainLayout = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: "BOOKS", path: "/books" },
    { name: "SHELVES", path: "/book-shelves" },
    { name: "SIGN IN", path: "/sign-in" },
    { name: "CREATE ACCOUNT", path: "/registration" },
  ];

  return <div>MainLayout</div>;
};
