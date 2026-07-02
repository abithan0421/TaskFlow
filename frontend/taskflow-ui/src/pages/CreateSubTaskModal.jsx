// CreateSubTaskModal.jsx
const CreateSubTaskModal = ({ subTaskData, onSubTaskChange, onSubmit, onCancel }) => {
    const styles = {
        modalOverlay: {
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
            justifyContent: "center", alignItems: "center"
        },
        modal: {
            backgroundColor: "white", padding: "20px", borderRadius: "12px",
            width: "90%", maxWidth: "450px", display: "flex",
            flexDirection: "column", gap: "12px", color: "#1565C0",
            border: "1px solid #BBDEFB",margin:"20px"
        },
        input: {
            padding: "12px", width: "100%", boxSizing: "border-box",
            color: "#124db3", border: "1px solid #a4c5ff", marginBottom: "10px"
        },
        button: {
            cursor: "pointer", padding: "6px", width: "85px", borderRadius: "4px",
            backgroundColor: "#124db3", color: "#FAFAFA", border: "1px solid #124db3"
        },
        deleteButton: {
            cursor: "pointer", padding: "6px", width: "85px", borderRadius: "4px",
            backgroundColor: "#124db3", color: "#FAFAFA", border: "1px solid #124db3"
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#124db3",
            flexWrap: "wrap",
            fontSize: "20px",
        },
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <h2 style={styles.header}>Create Subtask</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Subtask"
                        value={subTaskData.subTask}
                        onChange={onSubTaskChange("subTask")}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Remark"
                        value={subTaskData.remark}
                        onChange={onSubTaskChange("remark")}
                        style={styles.input}
                    />
                    <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                        <button type="submit" style={styles.button}>Save</button>
                        <button type="button" onClick={onCancel} style={styles.deleteButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSubTaskModal;