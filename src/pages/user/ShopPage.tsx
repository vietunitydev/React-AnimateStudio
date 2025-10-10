import { useState } from 'react';
import { Search, FileText, Gift, Box, ChevronDown, ChevronUp, Image, Frame, BookOpen, Sticker, Flower2, Heart, Flame, Droplets, Candy } from 'lucide-react';

const ShopPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
        cards: true,
        gifts: true,
        boxes: true
    });

    const categories = [
        {
            id: 'all',
            name: 'Tất cả sản phẩm',
            icon: Gift,
            isParent: false
        },
        {
            id: 'cards',
            name: 'Thiệp và ấn phẩm',
            icon: FileText,
            isParent: true,
            children: [
                { id: 'printed-cards', name: 'Thiệp in', icon: Image },
                { id: 'photo-frames', name: 'Khung ảnh + QR', icon: Frame },
                { id: 'wish-books', name: 'Sổ tay lời chúc', icon: BookOpen },
                { id: 'stickers', name: 'Sticker', icon: Sticker }
            ]
        },
        {
            id: 'gifts',
            name: 'Quà tặng',
            icon: Gift,
            isParent: true,
            children: [
                { id: 'flowers', name: 'Hoa', icon: Flower2 },
                { id: 'teddy-bears', name: 'Gấu bông', icon: Heart },
                { id: 'candles', name: 'Nến thơm', icon: Flame },
                { id: 'essential-oils', name: 'Tinh dầu', icon: Droplets },
                { id: 'chocolates', name: 'Socola', icon: Candy }
            ]
        },
        {
            id: 'boxes',
            name: 'Hộp quà trang trí',
            icon: Box,
            isParent: true,
            children: [
                { id: 'birthday-boxes', name: 'Sinh nhật', icon: Gift },
                { id: 'valentine-boxes', name: 'Valentine', icon: Heart },
                { id: 'tet-boxes', name: 'Tết', icon: Gift }
            ]
        }
    ];

    // Mock data - 60 products
    const allProducts = Array.from({ length: 60 }, (_, i) => {
        const categoryTypes = ['printed-cards', 'photo-frames', 'wish-books', 'stickers',
            'flowers', 'teddy-bears', 'candles', 'essential-oils', 'chocolates',
            'birthday-boxes', 'valentine-boxes', 'tet-boxes'];
        return {
            id: i + 1,
            title: `Sản phẩm ${i + 1}`,
            backgroundUrl: `https://placehold.co/300x300/e0e0e0/666666?text=Product+${i + 1}`,
            price: Math.floor(Math.random() * 500000) + 50000,
            originalPrice: Math.floor(Math.random() * 700000) + 100000,
            category: categoryTypes[Math.floor(Math.random() * categoryTypes.length)]
        };
    });

    const productsPerPage = 15;

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    // Filter products
    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Paginate
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const handlePageChange = (page : number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
            {/* Header Section */}
            <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden py-16">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Cửa hàng Quà tặng & Ấn phẩm
                        </h1>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-6">
                    {/* Left Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="sticky top-8 space-y-6">
                            {/* Search */}
                            <div className="bg-white rounded-xl shadow-sm p-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white rounded-xl shadow-sm p-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Danh mục sản phẩm</h3>
                                <div className="space-y-1">
                                    {categories.map((category) => {
                                        const Icon = category.icon;

                                        if (!category.isParent) {
                                            return (
                                                <button
                                                    key={category.id}
                                                    onClick={() => {
                                                        setSelectedCategory(category.id);
                                                        setCurrentPage(1);
                                                    }}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                                        selectedCategory === category.id
                                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    <span className="flex-1 text-left">{category.name}</span>
                                                </button>
                                            );
                                        }

                                        return (
                                            <div key={category.id} className="space-y-1">
                                                <button
                                                    onClick={() => toggleCategory(category.id)}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    <span className="flex-1 text-left">{category.name}</span>
                                                    {expandedCategories[category.id] ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>

                                                {expandedCategories[category.id] && (
                                                    <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-2">
                                                        {category.children.map((child) => {
                                                            const ChildIcon = child.icon;
                                                            return (
                                                                <button
                                                                    key={child.id}
                                                                    onClick={() => {
                                                                        setSelectedCategory(child.id);
                                                                        setCurrentPage(1);
                                                                    }}
                                                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs font-medium ${
                                                                        selectedCategory === child.id
                                                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                                                                            : 'text-gray-600 hover:bg-gray-50'
                                                                    }`}
                                                                >
                                                                    <ChildIcon className="w-3.5 h-3.5" />
                                                                    <span className="flex-1 text-left">{child.name}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                                <div className="text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                                        {filteredProducts.length}
                                    </div>
                                    <div className="text-xs text-gray-600">sản phẩm</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 min-w-0">
                        {/* Products Grid */}
                        {displayedProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {displayedProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                                        >
                                            {/* Image */}
                                            <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                                                <img
                                                    src={product.backgroundUrl}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />

                                                {/* Discount Badge */}
                                                <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                                                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                                </div>

                                                {/* Hover overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors shadow-lg">
                                                        Thêm vào giỏ hàng
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-900 text-sm mb-2 truncate">
                                                    {product.title}
                                                </h3>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-lg font-bold text-blue-600">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                    <span className="text-xs text-gray-400 line-through">
                                                        {formatPrice(product.originalPrice)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {filteredProducts.length > productsPerPage && (
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                                        >
                                            Trước
                                        </button>

                                        <div className="flex gap-1">
                                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                                let page;
                                                if (totalPages <= 5) {
                                                    page = i + 1;
                                                } else if (currentPage <= 3) {
                                                    page = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    page = totalPages - 4 + i;
                                                } else {
                                                    page = currentPage - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`w-10 h-10 text-sm font-medium rounded-lg transition-all ${
                                                            currentPage === page
                                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                                                : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                                        >
                                            Sau
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* No results */
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Gift className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-900 font-semibold mb-2">Không tìm thấy sản phẩm nào</p>
                                <p className="text-gray-500 text-sm">Thử thay đổi từ khóa hoặc danh mục khác</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;