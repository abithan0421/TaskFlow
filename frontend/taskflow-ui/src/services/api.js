import axios from "axios";

const api = axios.create({
    baseURL: "https://taskflow-api-35f2.onrender.com/api"
});

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);

api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response && error.response.status === 401) {

            localStorage.removeItem("token");

            window.location.href = "/";

            return;
        }

        return Promise.reject(error);
    }
);

export default api;