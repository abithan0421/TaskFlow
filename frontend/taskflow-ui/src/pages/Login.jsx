import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data
            );

            alert("Login successful");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>

            <form style={styles.form} onSubmit={handleSubmit}>

                <h2>Login</h2>

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
                    Login
                </button>

                <p>
                    Don't have account?
                    <Link to="/register">
                        Register
                    </Link>
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
        height: "100vh"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        gap: "10px"
    },

    input: {
        padding: "10px"
    },

    button: {
        padding: "10px",
        cursor: "pointer"
    }
};

export default Login;