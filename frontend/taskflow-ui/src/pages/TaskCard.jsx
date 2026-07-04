// TaskCard.jsx
const TaskCard = ({ task, onMarkComplete, onToggleSubTask, onEdit, onDelete }) => {
    const styles = {
        taskCard: {
            backgroundColor: "#FFFFFF",
            border: "1px solid #EEEEEE",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        },
        subTaskContainer: {
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
        },
        subTaskCard: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "10px 12px",
            backgroundColor: "#f8fbff",
            borderRadius: "8px",
            marginBottom: "6px",
            gap: "10px",
            minWidth: 0
        },
        subTaskLeft: {
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
            flex: 1,
            minWidth: 0
        },
        remark: {
            fontSize: "12px",
            fontStyle: "italic",
            color: "gray",
            marginTop: "3px"
        },
        completeButton: {
            cursor: "pointer", marginTop: "10px", padding: "6px", width: "85px",
            borderRadius: "4px", backgroundColor: "#2E7D32", color: "#FAFAFA",
            border: "1px solid #2E7D32"
        },
        editButton: {
            cursor: "pointer", marginTop: "10px", marginLeft: "10px", padding: "6px",
            width: "85px", borderRadius: "4px", backgroundColor: "#124db3",
            color: "#FAFAFA", border: "1px solid #124db3"
        },
        deleteButton: {
            cursor: "pointer", marginTop: "10px", marginLeft: "10px", padding: "6px",
            width: "85px", borderRadius: "4px", backgroundColor: "#124db3",
            color: "#FAFAFA", border: "1px solid #124db3"
        },
        completeDeleteButton: {
            cursor: "pointer", padding: "6px", width: "85px", borderRadius: "4px",
            backgroundColor: "#124db3", color: "#FAFAFA", border: "1px solid #124db3"
        }
    };

    return (
        <div style={styles.taskCard}>
            <h3>{task.task}</h3>
            <p>{task.description}</p>

            {task.subTasks?.length > 0 && (
                <div style={styles.subTaskContainer}>
                    {task.subTasks.map((subTask) => (
                        <div key={subTask.id} style={styles.subTaskCard}>
                            <div style={styles.subTaskLeft}>
                                <input
                                    type="checkbox"
                                    checked={subTask.isCompleted}
                                    onChange={() =>
                                        onToggleSubTask(
                                            task.id,
                                            subTask.id
                                        )
                                    }

                                />
                                <div>
                                    <strong>{subTask.subTask}</strong>
                                    <p style={styles.remark}>{subTask.remark}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <p>
                Status: {task.isCompleted ? " Completed" : " Pending"}
            </p>

            {!task.isCompleted && (
                <>
                    <button onClick={() => onMarkComplete(task.id)} style={styles.completeButton}>
                        Done
                    </button>
                    <button onClick={() => onEdit(task)} style={styles.editButton}>
                        Edit
                    </button>
                    <button onClick={() => onDelete(task.id)} style={styles.deleteButton}>
                        Delete
                    </button>
                </>
            )}

            {task.isCompleted && (
                <button onClick={() => onDelete(task.id)} style={styles.completeDeleteButton}>
                    Delete
                </button>
            )}
        </div>
    );
};

export default TaskCard;