// Loader.jsx
const Loader = () => {
    const styles = {
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
        text: { color: "#124db3" }
    };

    return (
        <div style={styles.loaderContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.text}>Loading your tasks...</p>
        </div>
    );
};

export default Loader;