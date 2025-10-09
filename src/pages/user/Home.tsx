import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>

            {/* Hero Section - Đẩy lên trên */}
            <section className="relative z-10 pt-20 pb-16 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Main Title with highlight */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Tạo website lời chúc ý nghĩa
                        </span>
                        <br />
                        <span className="bg-yellow-400 text-yellow-800 px-2 py-1 rounded inline-block">
                            siêu nhanh đẹp
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                        {/*Tiết kiệm chi phí*/}
                    </p>

                    {/* CTA Button */}
                    <a href="/login" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        Sử dụng miễn phí →
                    </a>
                </div>
            </section>

            {/* Section 1: Video Frame */}
            <section className="py-16 px-4 bg-white/50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Hướng dẫn sử dụng nhanh chóng</h2>
                    <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
                        <video
                            src="/videos/instruction.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls={false}  // Ẩn controls (không tua, play/pause)
                            className="w-full h-full object-cover"
                            preload="auto"
                            onContextMenu={(e) => e.preventDefault()}
                            onClick={(e) => e.preventDefault()}
                        >
                            Trình duyệt không hỗ trợ video.
                        </video>
                    </div>
                </div>
            </section>

            {/* Section 2: Templates - 3x3 Grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Dễ dàng tạo lời chúc với hơn 100+ mẫu</h2>
                    <p className="text-center text-gray-600 mb-12">Chọn mẫu yêu thích và tùy chỉnh theo ý muốn</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 3x3 Grid - Sử dụng placeholder images, thay bằng ảnh thực tế */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                            <div key={i} className="relative group cursor-pointer">
                                <img
                                    src={`https://via.placeholder.com/400x300/6B46C1/FFFFFF?text=Mẫu+${i}`}
                                    alt={`Mẫu lời chúc ${i}`}
                                    className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                    <span className="text-white font-semibold">Xem mẫu</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: QR Sharing - Row 3 Images */}
            <section className="py-16 px-4 bg-white/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Dễ dàng chia sẻ cho người thương với hệ thống mẫu QR</h2>
                    <p className="text-center text-gray-600 mb-12">Quét QR để truy cập lời chúc bất cứ lúc nào</p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <div key={1} className="flex-1 max-w-xs mx-auto">
                            <img
                                src="images/Home_template_QR_tet.png"
                                alt={`QR mẫu ${1}`}
                                className="w-full rounded-xl shadow-lg"
                            />
                        </div>
                        <div key={2} className="flex-1 max-w-xs mx-auto">
                            <img
                                src="images/Home_template_QR_trungthu.png"
                                alt={`QR mẫu ${2}`}
                                className="w-full rounded-xl shadow-lg"
                            />
                        </div>
                        <div key={3} className="flex-1 max-w-xs mx-auto">
                            <img
                                src="images/Home_template_QR_valentine.png"
                                alt={`QR mẫu ${3}`}
                                className="w-full rounded-xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Payment */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Thanh toán nhanh chóng với VNPAY</h2>
                    <p className="text-gray-600 mb-12">An toàn, tiện lợi và chỉ mất vài giây</p>
                    <div className="flex justify-center">
                        {/* Placeholder VNPAY logo */}
                        <img
                            src="images/Home_quick_payment.png"
                            alt="VNPAY"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Section 5: Reviews */}
            <section className="py-16 px-4 bg-white/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Review từ người dùng</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 3 Review cards - Có thể thay bằng carousel nếu cần */}
                        {[
                            { name: "Lan Anh", text: "Tuyệt vời! Tạo lời chúc chỉ trong 5 phút.", stars: 5 },
                            { name: "Minh Tuấn", text: "Giao diện đẹp, dễ dùng lắm!", stars: 5 },
                            { name: "Hương Giang", text: "QR code chia sẻ siêu tiện lợi.", stars: 5 }
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
                                <div className="flex justify-center mb-4">
                                    {[...Array(review.stars)].map((_, j) => (
                                        <span key={j} className="text-yellow-400">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4">"{review.text}"</p>
                                <p className="font-semibold text-gray-800">{review.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: Footer */}
            <footer className="py-8 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-4">MagicWishes</h3>
                    <p className="mb-4">Tạo lời chúc ý nghĩa cho người thân yêu.</p>
                    <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
                        <a href="/privacy" className="hover:underline">Chính sách bảo mật</a>
                        <a href="/terms" className="hover:underline">Điều khoản dịch vụ</a>
                        <a href="/contact" className="hover:underline">Liên hệ</a>
                    </div>
                    <p>&copy; 2025 MagicWishes. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;