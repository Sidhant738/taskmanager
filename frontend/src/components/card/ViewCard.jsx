import CardContainer from "./CardContainer";
import "../../styles/cards/viewcard.css";

export default function ViewCard({ task, onClose }) {

    if (!task) return null;

    return (

        <CardContainer className="View">

            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <button onClick={onClose}>
                Close
            </button>

        </CardContainer>

    );
}