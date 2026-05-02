import { Link } from "react-router";
import { BookOpen, TrendingUp, ArrowRight, Library, Sparkles } from "lucide-react";
import { MainPageInfoCard } from "@/components/MainPageInfoCard";
import { useAuth } from "@/context/AuthContext";

export const Home = () => {
    const { user, signIn } = useAuth();

    return (
        <div className="min-h-screen text-white">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/5 to-transparent"></div>
                <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <span className="text-sm text-indigo-300">
                                Discover your next adventure
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                            Your personal bookshelf
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                            Track what you're reading, discover new books, and organize your
                            literary journey. All in one place.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/books"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all cursor-pointer group"
                            >
                                Start exploring
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {user ? (
                                <Link
                                    to="/bookshelves"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg font-medium border border-gray-700 transition-all cursor-pointer"
                                >
                                    <Library className="w-4 h-4" />
                                    My shelves
                                </Link>
                            ) : (
                                <button
                                    onClick={signIn}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg font-medium border border-gray-700 transition-all cursor-pointer"
                                >
                                    Log in
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-indigo-400">10k+</div>
                            <div className="text-sm text-gray-500">Books in catalog</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-indigo-400">500+</div>
                            <div className="text-sm text-gray-500">Active readers</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-indigo-400">∞</div>
                            <div className="text-sm text-gray-500">Stories to discover</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Organize your reading life with powerful tools designed for book lovers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <MainPageInfoCard
                        title="Track reading"
                        text="Log your progress, write reviews, and never lose your place again"
                        Icon={BookOpen}
                    />
                    <MainPageInfoCard
                        title="Custom shelves"
                        text="Create custom shelves to organize books your way"
                        Icon={Library}
                    />
                    <MainPageInfoCard
                        title="Discover"
                        text="Find your next favorite book with personalized recommendations"
                        Icon={TrendingUp}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-2xl p-8 sm:p-12 text-center border border-indigo-500/20">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        Ready to start your journey?
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Join thousands of readers who already organize their library with BookBoxd
                    </p>
                    {user ? (
                        <Link
                            to="/books"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all"
                        >
                            Get started
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    ) : (
                        <button
                            onClick={signIn}
                            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all"
                        >
                            Log in
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
