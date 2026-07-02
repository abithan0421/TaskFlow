import CreateSubTaskModal from "./CreateSubTaskModal";
// EditTaskModal.jsx
const EditTaskModal = ({
    editingTask,
    onTaskChange,
    onSaveTask,
    onCancel,
    onCreateSubTaskClick,
    showSubTaskModal,
    subTaskData,
    onSubTaskChange,
    onCreateSubTaskSubmit,
    onSubTaskCancel,
    onCompleteSubTask,
    onEditSubTask,
    onDeleteSubTask  
}) => {
    const styles = {
        modalOverlay: {
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
            justifyContent: "center", alignItems: "center"
        },
        modal: {
            backgroundColor: "white", padding: "20px", borderRadius: "12px",
            width: "90%", maxWidth: "450px", display: "flex", flexDirection: "column",
            gap: "12px", color: "#1565C0", border: "1px solid #BBDEFB",
            maxHeight: "75vh", overflow: "hidden", margin:"10px"
        },
        input: {
            padding: "12px", width: "100%", boxSizing: "border-box",
            color: "#124db3", border: "1px solid #a4c5ff"
        },
        textArea: {
            padding: "10px", minHeight: "100px", boxSizing: "border-box",
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
        createSubTaskButton: {
            padding: "8px 12px", cursor: "pointer", borderRadius: "6px",
            border: "none", backgroundColor: "#124db3", color: "white"
        },
        subTaskScroll: {
            maxHeight: "280px", overflowY: "auto", marginTop: "8px",
            paddingRight: "8px", paddingBottom: "8px"
        },
        subTaskCard: {
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            padding: "10px 12px", backgroundColor: "#f8fbff", borderRadius: "8px",
            marginBottom: "6px", gap: "10px", minWidth: 0
        },
        subTaskLeft: {
            display: "flex", gap: "12px", alignItems: "flex-start", flex: 1, minWidth: 0
        },
        remark: {
            fontSize: "12px", fontStyle: "italic", color: "gray", marginTop: "3px"
        },
        editIconButton: {
            border: "none", background: "transparent", cursor: "pointer",
            padding: "6px", borderRadius: "4px", color: "#124db3",
            display: "flex", alignItems: "center", justifyContent: "center"
        },
        deleteSubButton: {
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "6px",
            color: "#d32f2f",
            fontSize: "18px"
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#124db3",
            flexWrap: "wrap",
            fontSize: "20px",
        },
        subtask: {
            fontSize: "17px",
            color: "#124db3",
        }
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={styles.header}>Edit Task</h2>
                    <button
                        style={styles.createSubTaskButton}
                        onClick={onCreateSubTaskClick}
                    >
                        Create Subtask
                    </button>
                </div>

                <input
                    type="text"
                    value={editingTask.task}
                    onChange={(e) => onTaskChange("task", e.target.value)}
                    style={styles.input}
                />
                <textarea
                    value={editingTask.description}
                    onChange={(e) => onTaskChange("description", e.target.value)}
                    style={styles.textArea}
                />

                <h3 style={styles.subtask}>Subtasks</h3>
                {editingTask.subTasks?.length > 0 ? (
                    <div style={styles.subTaskScroll}>
                        {editingTask.subTasks.map((subTask) => (
                            <div key={subTask.id} style={styles.subTaskCard}>
                                <div style={styles.subTaskLeft}>
                                    <input
                                        type="checkbox"
                                        checked={subTask.isCompleted}
                                        onChange={() => onCompleteSubTask(editingTask.id, subTask.id)}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <strong style={{ wordBreak: "break-word" }}>
                                            {subTask.subTask}
                                        </strong>
                                        <p style={styles.remark}>{subTask.remark}</p>
                                    </div>
                                </div>

                                {/* Action Buttons: Edit + Delete */}
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                        style={styles.editIconButton}
                                        onClick={() => onEditSubTask(subTask)}
                                        title="Edit Subtask"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        style={styles.deleteSubButton}
                                        onClick={() => onDeleteSubTask(editingTask.id, subTask.id)}
                                        title="Delete Subtask"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No subtasks added.</p>
                )}

                <div>
                    <button onClick={onSaveTask} style={styles.button}>Save</button>
                    <button onClick={onCancel} style={styles.cancelButton}>Cancel</button>
                </div>

                {showSubTaskModal && (
                    <CreateSubTaskModal
                        subTaskData={subTaskData}
                        onSubTaskChange={onSubTaskChange}
                        onSubmit={onCreateSubTaskSubmit}
                        onCancel={onSubTaskCancel}
                    />
                )}
            </div>
        </div>
    );
};

export default EditTaskModal;