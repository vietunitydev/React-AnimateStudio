import React, { useEffect, useState } from 'react';
import { OrderData } from "@/types/types.ts";

interface Props {
    adminKey: string;
}

const OrderManagement: React.FC<Props> = ({ adminKey }) => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterPlan, setFilterPlan] = useState<string>('all');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            // TODO: Implement API call
            // const response = await fetch('/api/orders');
            // const orderList = await response.json();
            // setOrders(orderList);
            // Mock data for testing
            setOrders([]);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to load orders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.vnp_TransactionNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        const matchesPlan = filterPlan === 'all' || order.plan === filterPlan;
        return matchesSearch && matchesStatus && matchesPlan;
    });

    const statuses = ['all', ...Array.from(new Set(orders.map(o => o.status)))];
    const plans = ['all', ...Array.from(new Set(orders.map(o => o.plan)))];

    const totalRevenue = filteredOrders
        .filter(o => o.status === 'success' || o.status === 'paid')
        .reduce((sum, o) => sum + o.amount, 0);

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Quản lý Orders ({orders.length})
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Tổng doanh thu (paid):{' '}
                        <span className="font-bold text-green-600">
              {totalRevenue.toLocaleString()} VND
            </span>
                    </p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    🔄 Refresh
                </button>
            </div>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">
                    {/*<div className="animate-spin text-4xl mb-4">⏳</div>*/}
                    Loading orders...
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    🛒 No orders found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Order ID</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Plan</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Amount</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Status</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Transaction No</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Response Code</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Paid At</th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.map(order => (
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
                                    <select
                                        value={order.status}
                                        // onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                                        disabled={!adminKey.trim()}
                                        className={`px-2 py-1 rounded text-sm font-semibold disabled:cursor-not-allowed ${
                                            order.status === 'success' || order.status === 'paid'
                                                ? 'bg-green-100 text-green-800'
                                                : order.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : order.status === 'failed'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        <option value="pending">pending</option>
                                        <option value="paid">paid</option>
                                        <option value="success">success</option>
                                        <option value="failed">failed</option>
                                        <option value="cancelled">cancelled</option>
                                    </select>
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
                                <td className="border border-gray-300 px-4 py-3 text-center">
                                    <button
                                        // onClick={() => handleDelete(order.orderId)}
                                        disabled={!adminKey.trim()}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:cursor-not-allowed disabled:bg-red-300 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;