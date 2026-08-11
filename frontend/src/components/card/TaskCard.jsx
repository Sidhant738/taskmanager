import CardContainer from "./CardContainer";
import "../../styles/cards/taskcard.css";

export default function TaskCard({
    task,
    onDelete,
    status,
    onEdit,
    onState,
    onClick
}) {

    return (

        <CardContainer
            className="Task"
            onClick={onClick}
        >

            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <nav>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
                    }}
                >
                    Delete
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(task.id);
                    }}
                >
                    Edit
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onState(task.id);
                    }}
                >
                    {status ? "Complete" : "Uncomplete"}
                </button>

            </nav>

        </CardContainer>

    );
}