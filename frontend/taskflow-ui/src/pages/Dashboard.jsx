import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const [editingTask, setEditingTask] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        try {

            const response = await api.get("/task");

            setTasks(response.data);

        } catch (error) {

            console.log(error);

            console.log(error.response);

            alert("Failed to fetch tasks");
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/task", formData);

            setFormData({
                title: "",
                description: ""
            });

            fetchTasks();

        } catch (error) {

            console.log(error);

            alert("Failed to create task");
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

            alert("Failed to update task");
        }
    };

    const updateTask = async (id, data) => {

        try {

            await api.put(`/Task/${id}/update`, data);

            fetchTasks();

        } catch (error) {

            console.log(error);

            alert("Failed to update task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/task/${id}/remove`);
            fetchTasks();

        } catch (error) {

            console.log(error);

            alert("Failed to delete task");
        }
    };

    return (

        <div style={styles.container}>
            <div style={styles.header}>

                <h2 style={styles.header}>Task Flow</h2>

                <div style={styles.headerButtons}>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        style={styles.button}
                    >
                        Create Task
                    </button>

                    <button
                        onClick={logout}
                        style={styles.logoutButton}
                    >
                        Logout
                    </button>
                </div>

            </div>
            <div style={styles.taskContainer}>

                {
                    tasks.map((task) => (

                        <div
                            key={task.id}
                            style={styles.taskCard}
                        >

                            <h3>{task.task}</h3>

                            <p>{task.description}</p>

                            <p>
                                Status:
                                {
                                    task.isCompleted
                                        ? " Completed"
                                        : " Pending"
                                }
                            </p>
                            {
                                !task.isCompleted && (

                                    <button
                                        onClick={() => markComplete(task.id)}
                                        style={styles.completeButton}
                                    >
                                        Mark Complete
                                    </button>
                                )
                            }
                            {
                                !task.isCompleted && (
                                    <button onClick={() => setEditingTask(task)}
                                        style={styles.editButton}>
                                        Edit
                                    </button>
                                )
                            }
                            <button
                                onClick={() => deleteTask(task.id)}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>

                        </div>
                    ))
                }

            </div>
            {
                editingTask && (

                    <div style={styles.modalOverlay}>

                        <div style={styles.modal}>

                            <h2>Edit Task</h2>

                            <input
                                type="text"
                                value={editingTask.task}
                                onChange={(e) =>
                                    setEditingTask({
                                        ...editingTask,
                                        task: e.target.value
                                    })
                                }
                                style={styles.input}
                            />

                            <textarea
                                value={editingTask.description}
                                onChange={(e) =>
                                    setEditingTask({
                                        ...editingTask,
                                        description: e.target.value
                                    })
                                }
                                style={styles.textArea}
                            />

                            <div>

                                <button
                                    onClick={async () => {

                                        await updateTask(
                                            editingTask.id,
                                            {
                                                title: editingTask.task,
                                                description:
                                                    editingTask.description
                                            }
                                        );

                                        setEditingTask(null);
                                    }}
                                    style={styles.button}
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() =>
                                        setEditingTask(null)
                                    }
                                    style={styles.cancelButton}
                                >
                                    Cancel
                                </button>

                            </div>
                        </div>
                    </div>
                )
            }

            {
                showCreateModal && (

                    <div style={styles.modalOverlay}>

                        <div style={styles.modal}>

                            <h2>Create Task</h2>

                            <input
                                type="text"
                                name="title"
                                placeholder="Task title"
                                value={formData.title}
                                onChange={handleChange}
                                style={styles.input}
                            />

                            <textarea
                                name="description"
                                placeholder="Task description"
                                value={formData.description}
                                onChange={handleChange}
                                style={styles.textArea}
                            />

                            <div>

                                <button
                                    onClick={async () => {

                                        await handleSubmit({
                                            preventDefault: () => { }
                                        });

                                        setShowCreateModal(false);
                                    }}
                                    style={styles.button}
                                >
                                    Create
                                </button>

                                <button
                                    onClick={() => {

                                        setShowCreateModal(false);

                                        setFormData({
                                            title: "",
                                            description: ""
                                        });
                                    }}
                                    style={styles.cancelButton}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }
        </div>
    );
}

const styles = {
    headerButtons: {
        display: "flex",
        gap: "10px"
    },

    container: {
        padding: "20px",
        backgroundColor: "#FAFAFA",
        minHeight: "100dvh",
        boxSizing: "border-box"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#124db3",
        flexWrap: "wrap",
        gap: "10px"
    },

    form: {
        display: "flex",
        gap: "10px",
        marginTop: "20px",
        flexWrap: "wrap"
    },

    input: {
        padding: "12px",
        width: "100%",
        boxSizing: "border-box",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    },

    button: {
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "#dae4f7",
        color: "#124db3",
        border: "1px solid #a4c5ff",
    },

    createButton: {
        backgroundColor: "#dae4f7",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    },

    logoutButton: {
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "#dae4f7",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    },

    taskContainer: {
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "15px", color: "#1565C0"
    },

    taskCard: {
        backgroundColor: "#FFFFFF",
        border: "1px solid #EEEEEE",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    },

    completeButton: {
        padding: "8px",
        cursor: "pointer",
        marginTop: "10px",
        backgroundColor: "#E8F5E9",
        color: "#2E7D32",
        border: "1px solid #C8E6C9"
    },

    deleteButton: {
        padding: "8px",
        cursor: "pointer",
        marginTop: "10px",
        marginLeft: "10px",
        backgroundColor: "#dae4f7",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    },

    editButton: {
        padding: "8px",
        cursor: "pointer",
        marginTop: "10px",
        marginLeft: "10px",
        backgroundColor: "#dae4f7",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    },

    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    modal: {
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "450px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxSizing: "border-box",
        color: "#1565C0",
        border: "1px solid #BBDEFB"
    },

    textArea: {
        padding: "10px",
        minHeight: "100px",
        boxSizing: "border-box",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    },

    cancelButton: {
        padding: "10px",
        marginLeft: "10px",
        cursor: "pointer",
        backgroundColor: "#dae4f7",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    }
};

export default Dashboard;