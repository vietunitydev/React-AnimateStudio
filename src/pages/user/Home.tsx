import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>

            <div className="flex flex-col items-center justify-center flex-grow px-4">
                {/* Main Title with highlight */}
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Tạo website lời chúc
                    </span>
                    <br />
                    <span className="bg-yellow-400 text-yellow-800 px-2 py-1 rounded inline-block">
                        siêu nhanh đẹp
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-xl text-gray-600 text-center max-w-2xl mb-8 leading-relaxed">
                    Tiết kiệm chi phí - Không cần lập trình
                </p>

                {/* CTA Button */}
                <a href="/login" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Sử dụng miễn phí →
                </a>
            </div>
        </div>
    );
};

export default Home;