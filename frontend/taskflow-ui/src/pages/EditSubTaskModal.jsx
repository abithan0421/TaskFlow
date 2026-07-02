// EditSubTaskModal.jsx
const EditSubTaskModal = ({ editingSubTask, onChange, onSave, onCancel }) => {
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
            border: "1px solid #BBDEFB", margin:"20px"
        },
        input: {
            padding: "12px", width: "100%", boxSizing: "border-box",
            color: "#124db3", border: "1px solid #a4c5ff"
        },
        button: {
            cursor: "pointer", padding: "6px", width: "85px", borderRadius: "4px",
            backgroundColor: "#124db3", color: "#FAFAFA", border: "1px solid #124db3"
        },
        cancelButton: {
            padding: "6px", width: "75px", borderRadius: "4px",
            backgroundColor: "#124db3", color: "#FAFAFA",
            border: "1px solid #124db3", marginLeft: "10px", cursor: "pointer"
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
                <h2 style={styles.header}>Update Subtask</h2>
                <input
                    style={styles.input}
                    value={editingSubTask?.subTask || ""}
                    onChange={(e) => onChange("subTask", e.target.value)}
                />
                <input
                    style={styles.input}
                    value={editingSubTask?.remark || ""}
                    onChange={(e) => onChange("remark", e.target.value)}
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                    <button style={styles.button} onClick={onSave}>Save</button>
                    <button style={styles.cancelButton} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditSubTaskModal;