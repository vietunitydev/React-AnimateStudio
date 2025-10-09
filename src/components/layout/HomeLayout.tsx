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
                            {/* Tài nguyên - Dropdown */}
                            <div className="relative group">
                                <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex items-center gap-1">
                                    Tài nguyên
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <div className="p-2">
                                        <a href="/guides" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors">
                                            Hướng dẫn
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Mẫu website - Button */}
                            <a href="/templates">
                                <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                                    Mẫu website
                                </button>
                            </a>

                            {/* Gian hàng - Button */}
                            <a href="/store">
                                <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                                    Gian hàng
                                </button>
                            </a>

                            {/* Dịch vụ - Dropdown */}
                            <div className="relative group">
                                <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex items-center gap-1">
                                    Dịch vụ
                                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <div className="p-2">
                                        <a href="/services/custom-design" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors">
                                            Thiết kế mẫu riêng
                                        </a>
                                        <a href="/services/print-card" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors">
                                            In card
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Auth Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <div className="group relative">
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900 text-sm truncate max-w-[120px]">{user.name}</p>
                                        </div>
                                        <img
                                            src={user.picture}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full border-2 border-purple-500 hover:border-purple-600 transition-colors"
                                        />
                                    </div>
                                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                        <div className="p-4 border-b">
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <a href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Tài khoản của tôi
                                            </a>
                                            <a href="/referral" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Giới thiệu bạn bè
                                            </a>
                                            <a href="/guide" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                                Hướng dẫn sử dụng
                                            </a>
                                            <div className="border-t my-2"></div>
                                            <a href="/logout" className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
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
                            {/* Tài nguyên */}
                            <div>
                                <p className="font-semibold text-gray-900 py-2">Tài nguyên</p>
                                <a href="/guides" className="block py-2 pl-4 text-gray-700 hover:text-purple-600">
                                    Hướng dẫn
                                </a>
                            </div>

                            <a href="/templates" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
                                Mẫu website
                            </a>

                            <a href="/store" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
                                Gian hàng
                            </a>

                            {/* Dịch vụ */}
                            <div>
                                <p className="font-semibold text-gray-900 py-2">Dịch vụ</p>
                                <a href="/services/custom-design" className="block py-2 pl-4 text-gray-700 hover:text-purple-600">
                                    Thiết kế mẫu riêng
                                </a>
                                <a href="/services/print-card" className="block py-2 pl-4 text-gray-700 hover:text-purple-600">
                                    In card
                                </a>
                            </div>

                            {user ? (
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex items-center gap-3 pb-3">
                                        <img
                                            src={user.picture}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full border-2 border-purple-500"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{user.name}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <a href="/profile" className="block py-2 text-gray-700 hover:text-purple-600">
                                        Tài khoản của tôi
                                    </a>
                                    <a href="/referral" className="block py-2 text-gray-700 hover:text-purple-600">
                                        Giới thiệu bạn bè
                                    </a>
                                    <a href="/guide" className="block py-2 text-gray-700 hover:text-purple-600">
                                        Hướng dẫn sử dụng
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