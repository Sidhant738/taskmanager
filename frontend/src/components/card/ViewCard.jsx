import CardContainer from "./CardContainer";
import "../../styles/cards/viewcard.css";

export default function ViewCard({ task, onClose }) {
    if (!task) return null;

    return (
        <CardContainer className="View">
            <h2>{task.title}</h2>

            <p>
                {task.description || "No description"}
            </p>

            <p>
                Status:{" "}
                {task.completed
                    ? "Completed"
                    : "Pending"}
            </p>

            <button
                type="button"
                onClick={onClose}
            >
                Close
            </button>
        </CardContainer>
    );
}
