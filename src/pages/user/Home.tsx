import { ArrowRight, Star, CheckCircle, Sparkles, Zap, Heart } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                                Tạo website lời chúc
                            </span>
                            <br />
                            <span className="text-gray-900">chỉ trong 5 phút</span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                            Hơn 100+ mẫu đẹp, dễ tùy chỉnh. Chia sẻ bằng QR code hoặc link. Tiết kiệm thời gian và chi phí.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="/login" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                                Bắt đầu miễn phí
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a href="#video" className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-purple-300 transition-all">
                                Xem demo
                            </a>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>10,000+ người dùng</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Thiết lập nhanh chóng</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>3 in 1: Lời chúc, in thẻ, gói quà</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </section>

            {/* Video Demo Section - REFACTORED */}
            <section id="video" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>Hướng dẫn sử dụng</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Tạo website chỉ với <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">3 bước đơn giản</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                           Không cần thiết kế phức tạp. Chỉ cần chọn, tùy chỉnh và chia sẻ!
                        </p>
                    </div>

                    {/* Video Container */}
                    <div className="relative">
                        {/* Decorative background */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-3xl blur-2xl opacity-30"></div>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                            <div className="aspect-video">
                                <video
                                    src="/videos/instruction.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                    preload="auto"
                                >
                                    Trình duyệt không hỗ trợ video.
                                </video>
                            </div>
                        </div>
                    </div>

                    {/* Features below video */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-purple-600">1</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Chọn mẫu yêu thích</h3>
                            <p className="text-sm text-gray-600">Hơn 100+ mẫu thiết kế đẹp mắt cho mọi dịp</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-pink-600">2</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Tùy chỉnh nội dung</h3>
                            <p className="text-sm text-gray-600">Thêm lời chúc, hình ảnh và video cá nhân hóa</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">3</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Chia sẻ ngay lập tức</h3>
                            <p className="text-sm text-gray-600">Gửi qua link hoặc QR code đến người thân</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Gallery - REFACTORED */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <Zap className="w-4 h-4" />
                            <span>100+ Mẫu thiết kế</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Mẫu website cho <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">mọi dịp đặc biệt</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Từ sinh nhật, đám cưới đến các ngày lễ lớn - tìm mẫu hoàn hảo cho sự kiện của bạn
                        </p>
                    </div>

                    {/* Templates Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {[
                            { id: 1, title: 'Sinh nhật Sang trọng', category: 'Sinh nhật', color: 'from-yellow-400 to-orange-400' },
                            { id: 2, title: 'Đám cưới Lãng mạn', category: 'Đám cưới', color: 'from-pink-400 to-rose-400' },
                            { id: 3, title: 'Tết Truyền thống', category: 'Tết', color: 'from-red-400 to-pink-400' },
                            { id: 4, title: 'Khai trương Phát đạt', category: 'Khai trương', color: 'from-emerald-400 to-teal-400' },
                            { id: 5, title: 'Valentine Ngọt ngào', category: 'Valentine', color: 'from-rose-400 to-pink-400' },
                            { id: 6, title: 'Trung thu Ấm áp', category: 'Trung thu', color: 'from-amber-400 to-yellow-400' }
                        ].map((template) => (
                            <div key={template.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                                <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                                    {/* Placeholder gradient background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`}></div>
                                    <img
                                        src="logo.png"
                                        alt={template.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                                        {template.category}
                                    </div>
                                </div>

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <h3 className="font-bold text-xl text-white mb-2">{template.title}</h3>
                                    <p className="text-sm text-gray-200 mb-4">Nhấn để xem chi tiết và tùy chỉnh</p>
                                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors w-fit">
                                        Xem mẫu
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View all button */}
                    <div className="text-center">
                        <a href="/templates" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                            Xem tất cả 100+ mẫu
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* QR Code Showcase - REFACTORED */}
            <section className="py-24 px-4 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
                            <Heart className="w-4 h-4" />
                            <span>Chia sẻ dễ dàng</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Gửi lời chúc với <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">một lần quét</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Tạo QR code độc đáo cho website lời chúc của bạn. Khách mời chỉ cần quét là xem ngay!
                        </p>
                    </div>

                    {/* QR Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                occasion: 'tet',
                                title: 'Tết Nguyên Đán',
                                description: 'Gửi lời chúc năm mới ấm áp',
                                gradient: 'from-red-500 to-orange-500'
                            },
                            {
                                occasion: 'trungthu',
                                title: 'Trung Thu',
                                description: 'Chia sẻ niềm vui đoàn viên',
                                gradient: 'from-amber-500 to-yellow-500'
                            },
                            {
                                occasion: 'valentine',
                                title: 'Valentine',
                                description: 'Thể hiện tình yêu đặc biệt',
                                gradient: 'from-pink-500 to-rose-500'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                {/* Decorative gradient border effect */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`}></div>

                                <div className="relative">
                                    {/* QR Code Container */}
                                    <div className="aspect-square mb-6 rounded-2xl overflow-hidden bg-gray-50 p-4 relative">
                                        <img
                                            src={`images/Home_template_QR_${item.occasion}.png`}
                                            alt={`QR ${item.title}`}
                                            className="w-full h-full object-contain"
                                        />
                                        {/* Scan indicator */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 backdrop-blur-sm">
                                            <div className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-900 shadow-lg">
                                                Quét để xem
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="text-center">
                                        <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                                        {/* Feature tags */}
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Không giới hạn lượt xem</span>
                                            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Tùy chỉnh được</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional features */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Tại sao nên dùng QR Code?
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">Khách mời truy cập nhanh chóng chỉ bằng 1 cú chạm</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">In trên thiệp mời, banner, hoặc standee sự kiện</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">Theo dõi số lượt truy cập và tương tác</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">Cập nhật nội dung website mà không cần in lại QR</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl blur-2xl opacity-30"></div>
                                <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
                                    <div className="text-5xl mb-4">📱</div>
                                    <p className="font-semibold text-gray-900">Quét QR Code</p>
                                    <p className="text-sm text-gray-600 mt-2">Trải nghiệm website lời chúc ngay lập tức</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Thanh toán an toàn với<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> VNPAY</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Nhanh chóng, bảo mật và tiện lợi
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg inline-block">
                        <img
                            src="images/Home_quick_payment.png"
                            alt="VNPAY"
                            className="max-w-md mx-auto rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </section>

            {/* Reviews Section - REFACTORED */}
            <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <span>Đánh giá từ người dùng</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Hơn 10,000 khách hàng <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">hài lòng</span>
                        </h2>
                        <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-current" />
                            ))}
                            <span className="ml-2 text-gray-600 font-semibold">5.0 trên 5</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Trần Bảo Đăng",
                                role: "Chủ nhà hàng",
                                avatar: "images/avatar1.jpg",
                                text: "MagicWishes giúp tôi tạo website lời chúc khai trương nhà hàng cực kỳ ấn tượng! Giao diện kéo thả trực quan, không cần kiến thức lập trình. Khách hàng quét QR là thấy ngay lời chúc và menu đặc biệt. Dịch vụ tuyệt vời!",
                                color: "from-blue-100 to-blue-50",
                                rating: 5
                            },
                            {
                                name: "Dương Hoàng Nam",
                                role: "Tổ chức sự kiện",
                                avatar: "images/avatar2.jpg",
                                text: "Tôi đã tổ chức đám cưới cho hơn 50 cặp đôi với website lời chúc từ MagicWishes. Mỗi website đều độc đáo, dễ tùy chỉnh và khách mời rất thích. Đội ngũ hỗ trợ nhiệt tình, phản hồi nhanh. Đáng đầu tư!",
                                color: "from-slate-100 to-slate-50",
                                rating: 5
                            },
                            {
                                name: "Nguyễn Linh Chi",
                                role: "Giáo viên",
                                avatar: "images/avatar3.jpg",
                                text: "Mỗi dịp sinh nhật học trò, tôi tạo website lời chúc riêng với hình ảnh lớp học. Các em rất thích và phụ huynh khen ngợi sự sáng tạo. Giao diện mobile cực mượt, ai cũng xem được. Chỉ mong có thêm theme cho giáo dục!",
                                color: "from-pink-100 to-pink-50",
                                rating: 5
                            }
                        ].map((review, i) => (
                            <div key={i} className={`bg-gradient-to-br ${review.color} p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}>
                                {/* Decorative quote mark */}
                                <div className="absolute top-4 right-4 text-6xl opacity-10 font-serif">"</div>

                                <div className="relative">
                                    {/* Rating stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(review.rating)].map((_, idx) => (
                                            <Star key={idx} className="w-4 h-4 fill-current text-yellow-400" />
                                        ))}
                                    </div>

                                    {/* Review text */}
                                    <p className="text-gray-700 leading-relaxed mb-6 text-sm">{review.text}</p>

                                    {/* Author info */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-2 ring-white">
                                            <img
                                                src={review.avatar}
                                                alt={review.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{review.name}</h4>
                                            <p className="text-sm text-gray-600">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Sẵn sàng tạo lời chúc đặc biệt?
                    </h2>
                    <p className="text-xl mb-8 text-purple-100">
                        Bắt đầu miễn phí ngay hôm nay!
                    </p>
                    <a href="/login" className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                        Tạo website ngay
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                MagicWishes
                            </h3>
                            <p className="text-sm">
                                Tạo website lời chúc ý nghĩa cho mọi dịp đặc biệt.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Sản phẩm</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/templates" className="hover:text-white transition-colors">Mẫu website</a></li>
                                <li><a href="/pricing" className="hover:text-white transition-colors">Bảng giá</a></li>
                                <li><a href="/features" className="hover:text-white transition-colors">Tính năng</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Thông tin</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/about" className="hover:text-white transition-colors">Về chúng tôi</a></li>
                                <li><a href="/contact" className="hover:text-white transition-colors">Liên hệ</a></li>
                                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Pháp lý</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/privacy" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
                                <li><a href="/terms" className="hover:text-white transition-colors">Điều khoản dịch vụ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>&copy; 2025 MagicWishes. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;