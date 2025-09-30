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

    const fetchKeys = async () => {
        setLoading(true);
        try {
            // TODO: Implement API call
            // const response = await fetch('/api/keys');
            // const keyList = await response.json();
            // setKeys(keyList);

            const response = await keyService.getKeys(adminKey);
            setKeys(response.keys);
        } catch (error) {
            console.error('Error fetching keys:', error);
            alert('Failed to load keys.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!adminKey.trim()) {
            alert('Please enter the admin key to delete a key.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this key?')) {
            try {
                // TODO: Implement API call
                // await fetch(`/api/keys/${id}`, {
                //     method: 'DELETE',
                //     headers: { 'X-Admin-Key': adminKey }
                // });

                const response = await keyService.deleteProject(adminKey, id);
                console.log(response);

                setKeys(keys.filter(k => k.id !== id));
                alert('Key deleted successfully.');
            } catch (error) {
                console.error('Error deleting key:', error);
                alert('Failed to delete key.');
            }
        }
    };

    // const handleUpdateUsesLeft = async (id: string, newUsesLeft: number) => {
    //     if (!adminKey.trim()) {
    //         alert('Please enter the admin key to update a key.');
    //         return;
    //     }
    //
    //     try {
    //         // TODO: Implement API call
    //         // await fetch(`/api/keys/${id}`, {
    //         //     method: 'PATCH',
    //         //     headers: {
    //         //         'X-Admin-Key': adminKey,
    //         //         'Content-Type': 'application/json'
    //         //     },
    //         //     body: JSON.stringify({ usesLeft: newUsesLeft })
    //         // });
    //
    //         setKeys(keys.map(k => k.id === id ? { ...k, usesLeft: newUsesLeft } : k));
    //         alert('Key updated successfully.');
    //     } catch (error) {
    //         console.error('Error updating key:', error);
    //         alert('Failed to update key.');
    //     }
    // };

    // useEffect(() => {
    //     fetchKeys();
    // }, []);

    const filteredKeys = keys.filter(key => {
        const matchesSearch = key.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            key.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            key.orderId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPlan = filterPlan === 'all' || key.plan === filterPlan;
        return matchesSearch && matchesPlan;
    });

    const plans = ['all', ...Array.from(new Set(keys.map(k => k.plan)))];

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    Quản lý Keys ({keys.length})
                </h2>
                <button
                    onClick={fetchKeys}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    🔄 Refresh
                </button>
            </div>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Loading keys...
                </div>
            ) : filteredKeys.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    🔑 No keys found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Code</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Plan</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Uses Left</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Amount</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Status</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Order ID</th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredKeys.map(key => (
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
                                        {/*<button*/}
                                        {/*    onClick={() => navigator.clipboard.writeText(key.code)}*/}
                                        {/*    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors"*/}
                                        {/*>*/}
                                        {/*    📋 Copy*/}
                                        {/*</button>*/}
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
            )}
        </div>
    );
};

export default KeyManagement;
