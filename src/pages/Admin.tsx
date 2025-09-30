import React, { useState } from 'react';
import ProjectManagement from './ProjectManagement';
import KeyManagement from './KeyManagement';
import OrderManagement from './OrderManagement';

type TabType = 'projects' | 'keys' | 'orders';

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('projects');
    const [inputAdminKey, setInputAdminKey] = useState('');

    const tabs = [
        { id: 'projects' as TabType, label: 'Quản lý Projects', icon: '📁' },
        { id: 'keys' as TabType, label: 'Quản lý Keys', icon: '🔑' },
        { id: 'orders' as TabType, label: 'Quản lý Orders', icon: '🛒' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Admin Key:
                        </label>
                        <input
                            // type="password"
                            value={inputAdminKey}
                            onChange={(e) => setInputAdminKey(e.target.value)}
                            placeholder="Nhập admin key để thực hiện các thao tác"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-2 border-b border-gray-200">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 font-semibold transition-all ${
                                    activeTab === tab.id
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    {activeTab === 'projects' && <ProjectManagement adminKey={inputAdminKey} />}
                    {activeTab === 'keys' && <KeyManagement adminKey={inputAdminKey} />}
                    {activeTab === 'orders' && <OrderManagement adminKey={inputAdminKey} />}
                </div>
            </div>
        </div>
    );
};

export default Admin;