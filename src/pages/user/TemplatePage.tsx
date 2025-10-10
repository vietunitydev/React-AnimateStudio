import { useState } from 'react';
import { Search, Heart, Gift, Moon, Cake, Calendar, Sparkles, Filter } from 'lucide-react';

const TemplatePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [
        { id: 'all', name: 'Tất cả', icon: Sparkles },
        { id: 'love', name: 'Tình yêu', icon: Heart },
        { id: 'tet', name: 'Tết', icon: Gift },
        { id: 'midautumn', name: 'Trung thu', icon: Moon },
        { id: 'birthday', name: 'Sinh nhật', icon: Cake },
        { id: 'anniversary', name: 'Kỷ niệm', icon: Calendar }
    ];

    // Mock data - 45 templates
    const allTemplates = Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        title: `Mẫu ${i + 1}`,
        backgroundUrl: `https://placehold.co/300x200/e0e0e0/666666?text=Template+${i + 1}`,
        amount: Math.floor(Math.random() * 50) + 10,
        category: categories[Math.floor(Math.random() * 5) + 1].id
    }));

    const templatesPerPage = 15;
    const totalPages = Math.ceil(allTemplates.length / templatesPerPage);

    // Filter templates
    const filteredTemplates = allTemplates.filter(template => {
        const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Paginate
    const startIndex = (currentPage - 1) * templatesPerPage;
    const displayedTemplates = filteredTemplates.slice(startIndex, startIndex + templatesPerPage);

    const handlePageChange = (page : number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
            {/* Header Section */}
            <section className="relative bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden py-16">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Tạo nhanh Website từ template chuyên nghiệp
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
                                        placeholder="Tìm kiếm..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white rounded-xl shadow-sm p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Filter className="w-4 h-4 text-gray-600" />
                                    <h3 className="text-sm font-semibold text-gray-900">Danh mục</h3>
                                </div>
                                <div className="space-y-1">
                                    {categories.map((category) => {
                                        const Icon = category.icon;
                                        return (
                                            <button
                                                key={category.id}
                                                onClick={() => {
                                                    setSelectedCategory(category.id);
                                                    setCurrentPage(1);
                                                }}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                                    selectedCategory === category.id
                                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span>{category.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                                <div className="text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                                        {filteredTemplates.length}
                                    </div>
                                    <div className="text-xs text-gray-600">mẫu phù hợp</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 min-w-0">

                        {/* Templates Grid */}
                        {displayedTemplates.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {displayedTemplates.map((template) => (
                                        <div
                                            key={template.id}
                                            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                                        >
                                            {/* Image */}
                                            <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                                                <img
                                                    src={template.backgroundUrl}
                                                    alt={template.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />

                                                {/* Badge */}
                                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                                                    {template.amount} ảnh
                                                </div>

                                                {/* Hover overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors shadow-lg">
                                                        Sử dụng mẫu
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-900 text-sm truncate">
                                                    {template.title}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {filteredTemplates.length > templatesPerPage && (
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
                                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
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
                                    <Sparkles className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-900 font-semibold mb-2">Không tìm thấy mẫu nào</p>
                                <p className="text-gray-500 text-sm">Thử thay đổi từ khóa hoặc danh mục khác</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplatePage;