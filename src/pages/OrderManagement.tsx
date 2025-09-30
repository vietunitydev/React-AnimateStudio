import React, { useState } from 'react';
import { OrderData } from "@/types/types.ts";
import paymentService from "@/utils/paymentService";

interface Props {
    adminKey: string;
}

const OrderManagement: React.FC<Props> = ({ adminKey }) => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterPlan, setFilterPlan] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [limit] = useState(10);
    const [sortBy, setSortBy] = useState('paidAt');
    const [sortOrder, setSortOrder] = useState('desc');

    // Stats state
    const [stats, setStats] = useState<{
        period: { from: string; to: string };
        totalOrders: number;
        totalRevenue: number;
        avgAmount: number;
        statusStats: { [key: string]: number };
        planStats: { [key: string]: number };
    } | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [fromDate, setFromDate] = useState(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
    );
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await paymentService.getOrders(adminKey, {
                page: currentPage,
                limit,
                search: searchTerm,
                sortBy,
                sortOrder,
                status: filterStatus !== 'all' ? filterStatus : undefined,
                plan: filterPlan !== 'all' ? filterPlan : undefined,
            });
            setOrders(response.orders);
            setTotalPages(response.pagination.totalPages);
            setTotalOrders(response.pagination.totalOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to load orders.');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        setStatsLoading(true);
        try {
            const response = await paymentService.getPaymentStats(adminKey, {
                fromDate,
                toDate,
            });
            setStats(response.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
            alert('Failed to load payment stats.');
        } finally {
            setStatsLoading(false);
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

    const filteredOrders = orders;
    const statuses = ['all', ...Array.from(new Set(orders.map(o => o.status)))];
    const plans = ['all', ...Array.from(new Set(orders.map(o => o.plan)))];

    const totalRevenue = filteredOrders
        .filter(o => o.status === 'success' || o.status === 'paid')
        .reduce((sum, o) => sum + o.amount, 0);

    return (
        <div className="p-6">
            {/* Stats Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Thống kê Orders
                </h2>
                <div className="mb-4 flex gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Từ ngày
                        </label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Đến ngày
                        </label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>

                <button
                    onClick={() => {
                        fetchStats();
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    🔄 Refresh
                </button>

                {statsLoading ? (
                    <div className="text-center py-4 text-gray-500">
                        Loading statistics...
                    </div>
                ) : stats ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-800">Tổng Orders</h3>
                            <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
                            <p className="text-sm text-gray-500">
                                Từ {stats.period.from} đến {stats.period.to}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-800">Tổng Doanh Thu</h3>
                            <p className="text-2xl font-bold text-green-600">
                                {stats.totalRevenue.toLocaleString()} VND
                            </p>
                            <p className="text-sm text-gray-500">Chỉ tính trạng thái paid</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-800">Trung Bình Order</h3>
                            <p className="text-2xl font-bold text-purple-600">
                                {stats.avgAmount.toLocaleString()} VND
                            </p>
                            <p className="text-sm text-gray-500">Trung bình mỗi order</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-800">Thống kê Status</h3>
                            {Object.entries(stats.statusStats).map(([status, count]) => (
                                <p key={status} className="text-sm text-gray-600">
                                    {status}: <span className="font-bold">{count}</span>
                                </p>
                            ))}
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-800">Thống kê Plan</h3>
                            {Object.entries(stats.planStats).map(([plan, count]) => (
                                <p key={plan} className="text-sm text-gray-600">
                                    {plan}: <span className="font-bold">{count}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 text-gray-500">
                        Không có dữ liệu thống kê
                    </div>
                )}
            </div>

            {/* Existing Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Quản lý Orders ({totalOrders})
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Tổng doanh thu (paid):{' '}
                        <span className="font-bold text-green-600">
                            {totalRevenue.toLocaleString()} VND
                        </span>
                    </p>
                </div>
                <button
                    onClick={() => {
                        fetchOrders();
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    🔄 Refresh
                </button>
            </div>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo Order ID hoặc Transaction No..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {statuses.map(status => (
                        <option key={status} value={status}>
                            {status === 'all' ? 'All Statuses' : `Status: ${status}`}
                        </option>
                    ))}
                </select>
                <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {plans.map(plan => (
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
                    <option value="paidAt">Sort by Paid At</option>
                    <option value="orderId">Sort by Order ID</option>
                    <option value="amount">Sort by Amount</option>
                    <option value="status">Sort by Status</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">
                    Loading orders...
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    🛒 No orders found.
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Order ID
                                    <button
                                        onClick={() => handleSortChange('orderId')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'orderId' && (sortOrder === 'asc' ? '↑' : '↓')}
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
                                    Amount
                                    <button
                                        onClick={() => handleSortChange('amount')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Status
                                    <button
                                        onClick={() => handleSortChange('status')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Transaction No</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Response Code</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Paid At
                                    <button
                                        onClick={() => handleSortChange('paidAt')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'paidAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => (
                                <tr key={order.orderId} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">
                                        {order.orderId}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                                            {order.plan}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3 font-semibold">
                                        {order.amount.toLocaleString()} VND
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-semibold ${
                                                order.status === 'success' || order.status === 'paid'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : order.status === 'failed'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">
                                        {order.vnp_TransactionNo || '-'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-mono ${
                                                order.vnp_ResponseCode === '00'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {order.vnp_ResponseCode || '-'}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3 text-sm">
                                        {order.paidAt ? new Date(order.paidAt).toLocaleString() : '-'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-gray-600">
                            Showing {orders.length} of {totalOrders} orders
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

export default OrderManagement;