import CardContainer from "./CardContainer";
import "../../styles/cards/taskcard.css";

export default function TaskCard({
    task,
    onDelete,
    onEdit,
    onStatusChange,
    onClick
}) {
    return (
        <CardContainer
            className="Task"
            onClick={onClick}
        >
            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <p>
                Status:{" "}
                {task.completed
                    ? "Completed"
                    : "Pending"}
            </p>

            <nav>
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete(task.id);
                    }}
                >
                    Delete
                </button>

                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onEdit(task.id);
                    }}
                >
                    Edit
                </button>

                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onStatusChange(task.id);
                    }}
                >
                    {task.completed
                        ? "Mark Incomplete"
                        : "Mark Complete"}
                </button>
            </nav>
        </CardContainer>
    );
}
