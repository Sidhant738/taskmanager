import CardContainer from "./CardContainer";
import "../../styles/cards/confirm.css";

export default function ConfirmCard({ taskTitle, onCancel, onConfirm }) {
    return (
        <CardContainer className="Confirm">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete "{taskTitle || 'this task'}"?</p>
            <nav>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="button" className="confirm-btn" onClick={onConfirm}>
                    Confirm
                </button>
            </nav>
        </CardContainer>
    );
}
