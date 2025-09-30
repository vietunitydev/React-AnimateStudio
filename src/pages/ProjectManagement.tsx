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

    const fetchProjects = async () => {
        setLoading(true);
        try {
            // TODO: Implement API call
            // const response = await fetch('/api/projects');
            // const projectList = await response.json();
            // setProjects(projectList);

            const response = await projectService.getProjects(adminKey);
            // console.log(response.projects);
            setProjects(response.projects);
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
                // TODO: Implement API call
                // await fetch(`/api/projects/${id}`, {
                //     method: 'DELETE',
                //     headers: { 'X-Admin-Key': adminKey }
                // });
                const response = await projectService.deleteProject(adminKey, id);
                console.log(response);
                setProjects(projects.filter(p => p.id !== id));
                alert('Project deleted successfully.');
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Failed to delete project.');
            }
        }
    };

    // useEffect(() => {
    //     fetchProjects();
    // }, []);

    const filteredProjects = projects.filter(project =>
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    Quản lý Projects ({projects.length})
                </h2>
                <button
                    onClick={fetchProjects}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    🔄 Refresh
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo title hoặc ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">
                    {/*<div className="animate-spin text-4xl mb-4">⏳</div>*/}
                    Loading projects...
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    📭 No projects found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Theme</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Created At</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">ID</th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProjects.map(project => (
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
            )}
        </div>
    );
};

export default ProjectManagement;