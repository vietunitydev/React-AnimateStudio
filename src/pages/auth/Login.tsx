import React from 'react';
import { useAuth } from '@/contexts/useAuth';

const Login: React.FC = () => {
    const { loginWithGoogle } = useAuth();

    const handleGoogleLogin = () => {
        loginWithGoogle();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex overflow-hidden">
            {/* Left side: 60% - Hero image with animation */}
            <div className="w-3/5 relative flex items-center justify-center overflow-hidden">
                {/* Animated background blobs (chỉ ở left side) */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>

                <div className="relative z-10 ">
                    <img
                        src="logo.png"
                        alt="MagicWishes"
                        // className="w-full max-w-md h-auto rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    {/* Optional: Floating animation elements */}
                    <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 animate-bounce"></div>
                    <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
                </div>
            </div>

            {/* Right side: 40% - Login form */}
            <div className="w-2/5 flex flex-col items-center justify-center px-4 py-8 bg-white/80 backdrop-blur-md">
                <div className="w-full max-w-md">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Chào mừng trở lại!</h2>
                        <p className="text-gray-600">
                            Đăng nhập để tiếp tục sử dụng MagicWishes
                        </p>
                    </div>

                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg group mb-6"
                    >
                        {/* Google Icon */}
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                            Đăng nhập với Google
                        </span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">hoặc</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Info text */}
                    <p className="text-center text-sm text-gray-600 leading-relaxed mb-6">
                        Bằng cách đăng nhập, bạn đồng ý với <br/>
                        <span className="text-blue-600 hover:underline cursor-pointer">Điều khoản dịch vụ</span> và{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">Chính sách bảo mật</span>
                    </p>

                    {/* Sign up link */}
                    <p className="text-center text-sm text-gray-600">
                        Chưa có tài khoản?{' '}
                        <a href="/register" className="text-blue-600 font-semibold hover:underline cursor-pointer">
                            Đăng ký ngay
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;