// Header.jsx
const Header = ({ onCreateTask, onLogout }) => {
    const styles = {
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#124db3",
            flexWrap: "wrap",
            fontSize: "20px",
        },
        headerButtons: { display: "flex", gap: "10px" },
        button: {
            cursor: "pointer", padding: "6px", width: "85px", borderRadius: "4px",
            backgroundColor: "#124db3", color: "#FAFAFA", border: "1px solid #124db3"
        },
        logoutButton: {
            cursor: "pointer", padding: "6px", width: "85px", borderRadius: "4px",
            backgroundColor: "#124db3", color: "#FAFAFA", border: "1px solid #124db3"
        }
    };

    return (
        <div style={styles.header}>
            <h2 style={styles.header}>TaskFlow</h2>
            <div style={styles.headerButtons}>
                <button onClick={onCreateTask} style={styles.button}>Create Task</button>
                <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
            </div>
        </div>
    );
};

export default Header;