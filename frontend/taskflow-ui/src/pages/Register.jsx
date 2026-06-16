import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", formData);

            alert("Registration successful");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Registration failed");
        }
    };

    return (
        <div style={styles.container}>

            <form style={styles.form} onSubmit={handleSubmit}>

                <h2>Register</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Register
                </button>

                <p>
                    Already have account?
                    <Link to="/"> Login </Link>
                </p>

            </form>

        </div>
    );
}

const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "#124db3"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        gap: "10px"
    },

    input: {
        padding: "10px",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    },

    button: {
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "#dae4f7",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    }
};

export default Register;