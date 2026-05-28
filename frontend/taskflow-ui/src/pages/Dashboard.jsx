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

            alert("Task created");

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

    const deleteTask = async (id) => {
        try{
            await api.delete(`/task/${id}/remove`);
            fetchTasks();
            alert("Task deleted");

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

                            <h3>{task.title}</h3>

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
    }
};

export default Dashboard;