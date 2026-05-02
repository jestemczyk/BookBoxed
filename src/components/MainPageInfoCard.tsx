import type { LucideIcon } from "lucide-react";

interface InfoCardProps {
    title: string;
    text: string;
    Icon: LucideIcon;
}

export const MainPageInfoCard = ({ title, text, Icon }: InfoCardProps) => {
    return (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-indigo-500/30 transition-all group">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600/30 transition-colors">
                <Icon className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
    );
};
