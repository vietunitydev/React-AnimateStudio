import React, { useState } from 'react';
import { KeyData } from "@/types/types.ts";
import keyService from "@/utils/keyService";

interface Props {
    adminKey: string;
}

const KeyManagement: React.FC<Props> = ({ adminKey }) => {
    const [keys, setKeys] = useState<KeyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPlan, setFilterPlan] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalKeys, setTotalKeys] = useState(0);
    const [limit] = useState(10); // Number of keys per page
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    // States for creating new key
    const [newCode, setNewCode] = useState('');
    const [newUsesLeft, setNewUsesLeft] = useState(1);

    const fetchKeys = async () => {
        setLoading(true);
        try {
            const response = await keyService.getKeys(adminKey, {
                page: currentPage,
                limit,
                search: searchTerm,
                sortBy,
                sortOrder,
                plan: filterPlan !== 'all' ? filterPlan : undefined,
            });
            setKeys(response.keys);
            setTotalPages(response.pagination.totalPages);
            setTotalKeys(response.pagination.totalKeys);
        } catch (error) {
            console.error('Error fetching keys:', error);
            alert('Failed to load keys.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newCode.trim() ||  newUsesLeft < 1 ) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        try {
            await keyService.createKey(adminKey, newCode, newUsesLeft);
            alert('Key created successfully.');
            setNewCode('');
            setNewUsesLeft(1);
            fetchKeys();
        } catch (error) {
            console.error('Error creating key:', error);
            alert('Failed to create key.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!adminKey.trim()) {
            alert('Please enter the admin key to delete a key.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this key?')) {
            try {
                const response = await keyService.deleteKey(adminKey, id);
                console.log(response);
                setKeys(keys.filter(k => k.id !== id));
                alert('Key deleted successfully.');
            } catch (error) {
                console.error('Error deleting key:', error);
                alert('Failed to delete key.');
            }
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSortChange = (newSortBy: string) => {
        if (newSortBy === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('desc');
        }
    };

    return (
        <div className="p-6">
            {/* Create New Key Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Tạo Key Mới
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Nhập code"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Nhập usesLeft"
                        value={newUsesLeft}
                        onChange={(e) => setNewUsesLeft(parseInt(e.target.value) || 1)}
                        min={1}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleCreate}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        ➕ Create Key
                    </button>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    Quản lý Keys ({totalKeys})
                </h2>
                <button
                    onClick={fetchKeys}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    🔄 Refresh
                </button>
            </div>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo code, ID hoặc Order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {['all', ...Array.from(new Set(keys.map(k => k.plan)))].map(plan => (
                        <option key={plan} value={plan}>
                            {plan === 'all' ? 'All Plans' : `Plan: ${plan}`}
                        </option>
                    ))}
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="createdAt">Sort by Created At</option>
                    <option value="code">Sort by Code</option>
                    <option value="plan">Sort by Plan</option>
                    <option value="usesLeft">Sort by Uses Left</option>
                    <option value="amount">Sort by Amount</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">
                    Loading keys...
                </div>
            ) : keys.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    🔑 No keys found.
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Code
                                    <button
                                        onClick={() => handleSortChange('code')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'code' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Plan
                                    <button
                                        onClick={() => handleSortChange('plan')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'plan' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Uses Left
                                    <button
                                        onClick={() => handleSortChange('usesLeft')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'usesLeft' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Amount
                                    <button
                                        onClick={() => handleSortChange('amount')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Status</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Order ID</th>
                                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {keys.map(key => (
                                <tr key={key.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">
                                        {key.code}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                                            {key.plan}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3 text-center">
                                        {key.usesLeft}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        {key.amount.toLocaleString()} VND
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-sm ${
                                            key.status === 'active' ? 'bg-green-100 text-green-800' :
                                                key.status === 'expired' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {key.status}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">
                                        {key.orderId}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleDelete(key.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!adminKey.trim()}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-gray-600">
                            Showing {keys.length} of {totalKeys} keys
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default KeyManagement;