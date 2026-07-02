// CreateTaskModal.jsx
const CreateTaskModal = ({ formData, onChange, onSubmit, onCancel }) => {
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
            border: "1px solid #BBDEFB",
            margin:"10px"
        },
        input: {
            padding: "12px", width: "100%", boxSizing: "border-box",
            color: "#124db3", border: "1px solid #a4c5ff"
        },
        textArea: {
            padding: "10px", minHeight: "100px", boxSizing: "border-box",
            color: "#124db3", border: "1px solid #a4c5ff"
        },
        createButton: {
            padding: "6px", width: "75px", borderRadius: "4px",
            backgroundColor: "#124db3", color: "#FAFAFA",
            border: "1px solid #124db3", cursor: "pointer"
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
                <h2 style={styles.header}>Create Task</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    value={formData.title}
                    onChange={onChange}
                    style={styles.input}
                />
                <textarea
                    name="description"
                    placeholder="Task description"
                    value={formData.description}
                    onChange={onChange}
                    style={styles.textArea}
                />
                <div>
                    <button onClick={onSubmit} style={styles.createButton}>Create</button>
                    <button onClick={onCancel} style={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;