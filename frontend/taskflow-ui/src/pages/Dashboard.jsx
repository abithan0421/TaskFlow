import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Loader from "./Loader";
import Header from "./Header";
import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
import EditSubTaskModal from "./EditSubTaskModal";

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [editingTask, setEditingTask] = useState(null);
    const [editingSubTask, setEditingSubTask] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSubTaskModal, setShowSubTaskModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [subTaskData, setSubTaskData] = useState({ subTask: "", remark: "" });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await api.get("/task");
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/task", formData);
            setFormData({ title: "", description: "" });
            fetchTasks();
            setShowCreateModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const markComplete = async (id) => {
        try {
            await api.put(`/task/${id}/complete`);
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (id, data) => {
        try {
            await api.put(`/Task/${id}/update`, data);
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/task/${id}/remove`);
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const createSubTask = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/SubTask/${selectedTaskId}`, {
                title: subTaskData.subTask,
                remark: subTaskData.remark
            });

            setShowSubTaskModal(false);
            setSubTaskData({ subTask: "", remark: "" });
            const response = await api.get("/task");
            setTasks(response.data);
            const currentTask = response.data.find(x => x.id === selectedTaskId);
            setEditingTask(currentTask);
        } catch (error) {
            console.log(error);
        }
    };

    const updateSubTask = async () => {
        try {
            await api.put(`/SubTask/${editingTask.id}/${editingSubTask.id}/update`, {
                title: editingSubTask.subTask,
                remark: editingSubTask.remark
            });

            const response = await api.get("/task");
            setTasks(response.data);
            const updatedTask = response.data.find(t => t.id === editingTask.id);
            setEditingTask(updatedTask);
            setEditingSubTask(null);
        } catch (error) {
            console.log(error);
        }
    };

    const completeSubTask = async (taskId, subTaskId) => {
        try {
            await api.put(`/SubTask/${taskId}/${subTaskId}/complete`);
            const response = await api.get("/task");
            setTasks(response.data);

            if (editingTask) {
                const updatedTask = response.data.find(t => t.id === editingTask.id);
                if (updatedTask) setEditingTask(updatedTask);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleSubTask = async (taskId, subTaskId) => {

        try {

            await api.put(
                `/SubTask/${taskId}/${subTaskId}/complete`
            );

            fetchTasks();

        }
        catch (error) {

            console.log(error);

            alert("Failed to update subtask");

        }

    };

    const deleteSubTask = async (taskId, subTaskId) => {
        // if (!window.confirm("Are you sure you want to delete this subtask?")) return;

        try {
            await api.delete(`/SubTask/${taskId}/${subTaskId}/remove`);

            const response = await api.get("/task");
            setTasks(response.data);

            if (editingTask) {
                const updatedTask = response.data.find(t => t.id === editingTask.id);
                if (updatedTask) {
                    setEditingTask(updatedTask);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <Loader />;

    return (
        <div style={styles.container}>
            <Header
                onCreateTask={() => setShowCreateModal(true)}
                onLogout={logout}
            />

            <div style={styles.taskContainer}>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onMarkComplete={markComplete}
                        onToggleSubTask={toggleSubTask}
                        onEdit={setEditingTask}
                        onDelete={deleteTask}
                    />
                ))}
            </div>

            {showCreateModal && (
                <CreateTaskModal
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowCreateModal(false);
                        setFormData({ title: "", description: "" });
                    }}
                />
            )}

            {editingTask && (
                <EditTaskModal
                    editingTask={editingTask}
                    onTaskChange={(field, value) =>
                        setEditingTask({ ...editingTask, [field]: value })
                    }
                    onSaveTask={async () => {
                        await updateTask(editingTask.id, {
                            title: editingTask.task,
                            description: editingTask.description
                        });
                        setEditingTask(null);
                    }}
                    onCancel={() => setEditingTask(null)}
                    onCreateSubTaskClick={() => {
                        setSelectedTaskId(editingTask.id);
                        setShowSubTaskModal(true);
                    }}
                    showSubTaskModal={showSubTaskModal}
                    subTaskData={subTaskData}
                    onSubTaskChange={(field) => (e) =>
                        setSubTaskData({ ...subTaskData, [field]: e.target.value })
                    }
                    onCreateSubTaskSubmit={createSubTask}
                    onSubTaskCancel={() => setShowSubTaskModal(false)}
                    onCompleteSubTask={completeSubTask}
                    onEditSubTask={setEditingSubTask}
                    onDeleteSubTask={deleteSubTask}
                />
            )}

            {editingSubTask && (
                <EditSubTaskModal
                    editingSubTask={editingSubTask}
                    onChange={(field, value) =>
                        setEditingSubTask({ ...editingSubTask, [field]: value })
                    }
                    onSave={updateSubTask}
                    onCancel={() => setEditingSubTask(null)}
                />
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#FAFAFA",
        minHeight: "100dvh",
        boxSizing: "border-box"
    },
    taskContainer: {
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        color: "#1565C0"
    }
};

export default Dashboard;