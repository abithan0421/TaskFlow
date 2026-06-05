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
        try{
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

                <h2>Task Dashboard</h2>

                <button
                    onClick={logout}
                    style={styles.logoutButton}
                >
                    Logout
                </button>

            </div>

            <form
                onSubmit={handleSubmit}
                style={styles.form}
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    value={formData.title}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Task description"
                    value={formData.description}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button
                    type="submit"
                    style={styles.button}
                >
                    Add Task
                </button>

            </form>

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
        </div>
    );
}

const styles = {

    container: {
        padding: "20px"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    form: {
        display: "flex",
        gap: "10px",
        marginTop: "20px"
    },

    input: {
        padding: "10px",
        width: "200px"
    },

    button: {
        padding: "10px",
        cursor: "pointer"
    },

    logoutButton: {
        padding: "10px",
        cursor: "pointer"
    },

    taskContainer: {
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    taskCard: {
        border: "1px solid gray",
        padding: "15px",
        borderRadius: "8px"
    },

    completeButton: {
    padding: "8px",
    cursor: "pointer",
    marginTop: "10px"
    },

    deleteButton: {
    padding: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "10px"
    },

    editButton: {
    padding: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "10px"
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
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    textArea: {
        padding: "10px",
        minHeight: "100px"
    },

    cancelButton: {
        padding: "10px",
        marginLeft: "10px",
        cursor: "pointer"
    }
    };

export default Dashboard;