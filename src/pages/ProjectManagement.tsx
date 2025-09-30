import React, { useState } from 'react';
import { ProjectData } from "@/types/types.ts";
import projectService from "@/utils/projectService";

interface Project extends ProjectData {
    id: string;
    createdAt: string;
}

interface Props {
    adminKey: string;
}

const ProjectManagement: React.FC<Props> = ({ adminKey }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProjects, setTotalProjects] = useState(0);
    const [limit] = useState(10); // Number of projects per page
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await projectService.getProjects(adminKey, {
                page: currentPage,
                limit,
                search: searchTerm,
                sortBy,
                sortOrder,
            });
            setProjects(response.projects);
            setTotalPages(response.pagination.totalPages);
            setTotalProjects(response.pagination.totalProjects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            alert('Failed to load projects.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!adminKey.trim()) {
            alert('Please enter the admin key to delete a project.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectService.deleteProject(adminKey, id);
                setProjects(projects.filter(p => p.id !== id));
                alert('Project deleted successfully.');
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Failed to delete project.');
            }
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            fetchProjects(); // Fetch immediately on page change
        }
    };

    const handleSortChange = (newSortBy: string) => {
        if (newSortBy === sortBy) {
            // Toggle sort order if same field
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort field and default to descending
            setSortBy(newSortBy);
            setSortOrder('desc');
        }
        // No page reset; sorting will apply on next refresh
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    Quản lý Projects ({totalProjects})
                </h2>
                <button
                    onClick={fetchProjects}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    🔄 Refresh
                </button>
            </div>

            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo title hoặc ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="createdAt">Sort by Created At</option>
                    <option value="title">Sort by Title</option>
                    <option value="theme">Sort by Theme</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">
                    Loading projects...
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    📭 No projects found.
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Title
                                    <button
                                        onClick={() => handleSortChange('title')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Theme
                                    <button
                                        onClick={() => handleSortChange('theme')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'theme' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                                    Created At
                                    <button
                                        onClick={() => handleSortChange('createdAt')}
                                        className="ml-2 text-sm"
                                    >
                                        {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">ID</th>
                                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {projects.map(project => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-3">
                                        {project.title || 'Untitled'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                            {project.theme}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        {new Date(project.createdAt).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3 font-mono text-sm">
                                        {project.id}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <div className="flex gap-2 justify-center">
                                            <a
                                                href={`/project/${project.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors"
                                            >
                                                👁️ View
                                            </a>
                                            <button
                                                onClick={() => handleDelete(project.id)}
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
                            Showing {projects.length} of {totalProjects} projects
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

export default ProjectManagement;