import { type LucideIcon } from "lucide-react";
type BookInfoCardProps = {
    children: React.ReactNode;
    title: string;
    Icon: LucideIcon;
};

export const BookInfoCard = ({ children, title, Icon }: BookInfoCardProps) => {
    return (
        <div className="bg-[#1e2a3a] rounded-xl p-5 shadow-xl">
            <div className="flex gap-3 items-center mb-3">
                <Icon size={16} />
                <h3 className="font-semibold  flex items-center gap-2">
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
};
