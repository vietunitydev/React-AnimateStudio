import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from "@/contexts/useAuth.ts";
// import {User} from "@/types/user.types.ts";

const HomeLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuth();
    // const user : User  = useAuth();

    return (
        <>
            {/* Fixed Navbar */}
            <nav className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                MagicWishes
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#templates" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                                Mẫu website
                            </a>
                            <a href="#promotions" className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex items-center gap-2">
                                Khuyến mãi
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">HOT</span>
                            </a>
                            <a href="#services" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                                Dịch vụ
                            </a>
                        </div>

                        {/* Auth Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center gap-3 group relative">
                                    <img
                                        src={user.picture}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer hover:border-purple-600 transition-colors"
                                    />
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                        <div className="p-3 border-b">
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <a href="/profile" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                                Tài khoản
                                            </a>
                                            <a href="/logout" className="block px-3 py-2 text-red-600 hover:bg-red-50 rounded">
                                                Đăng xuất
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <a href="/login">
                                        <button className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                                            Đăng nhập
                                        </button>
                                    </a>
                                    <a href="/register">
                                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105">
                                            Đăng ký miễn phí
                                        </button>
                                    </a>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 hover:text-purple-600 transition-colors"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 pt-2 pb-4 space-y-3">
                            <a href="#templates" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
                                Mẫu website
                            </a>
                            <a href="#promotions" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
                                Khuyến mãi <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">HOT</span>
                            </a>
                            <a href="#services" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
                                Dịch vụ
                            </a>
                            {user ? (
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex items-center gap-3 pb-3">
                                        <img
                                            src={user.picture}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full border-2 border-purple-500"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <a href="/profile" className="block py-2 text-gray-700 hover:text-purple-600">
                                        Tài khoản
                                    </a>
                                    <a href="/logout" className="block py-2 text-red-600">
                                        Đăng xuất
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-2 border-t pt-4">
                                    <a href="/login">
                                        <button className="w-full text-center py-2 text-gray-700 hover:text-purple-600 font-medium">
                                            Đăng nhập
                                        </button>
                                    </a>
                                    <a href="/register">
                                        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium">
                                            Đăng ký miễn phí
                                        </button>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Content below navbar - add padding top to account for fixed navbar */}
            <div className="pt-16">
                {children}
            </div>
        </>
    );
};

export default HomeLayout;