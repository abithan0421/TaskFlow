import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

function Login() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard", { replace: true });
        }
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        try {

            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data
            );

            navigate("/dashboard");

        } catch (error) {
            console.log(error);

            alert("Invalid credentials");
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.loaderContainer}>
                <div style={styles.spinner}></div>
                <p style={styles.text}>Logging you in...</p>
            </div>
        );
    }

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
        minHeight: "100dvh"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        gap: "10px",
        color: "#124db3"
    },

    input: {
        padding: "10px",
        boxSizing: "border-box",
        color: "#124db3",
        border: "1px solid #a4c5ff"
    },

    button: {
        padding: "10px",
        cursor: "pointer",
        borderRadius: "4px",
        backgroundColor: "#124db3",
        color: "#FAFAFA",
        border: "1px solid #124db3",
    },

    loaderContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "15px"
    },

    spinner: {
        width: "25px",
        height: "25px",
        border: "5px solid white",
        borderTop: "5px solid #124db3",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
    },
    text: {
        color: "#124db3"
    }
};

export default Login;