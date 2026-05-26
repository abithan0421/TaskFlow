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
    }
};

export default Dashboard;