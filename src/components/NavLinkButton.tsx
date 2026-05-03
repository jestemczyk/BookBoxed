import { Link } from "react-router";

export const NavLinkButton = ({ path, name }: { path: string; name: string }) => {
    const isActive = location.pathname === path;
    return (
        <Link
            key={path}
            to={path}
            className={`cursor-pointer text-sm font-medium tracking-wide transition-colors ${
                isActive ? "text-white" : "text-gray-500 hover:text-white"
            }`}
        >
            {name}
        </Link>
    );
};
