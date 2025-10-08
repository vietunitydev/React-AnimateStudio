import React from "react";

const Admin: React.FC = () => {


    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
            <div className="mb-6">
                <label className="block text-gray-700 mb-1 font-medium">Admin Key:</label>
                <input
                    type="password"
                    placeholder="Enter admin key"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

        </div>
    );
};

export default Admin;