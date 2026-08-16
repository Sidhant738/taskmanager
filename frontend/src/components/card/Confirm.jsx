import { useState } from "react";
import CardContainer from "./CardContainer";
import "../../styles/cards/confirm.css";

export default function ConfirmCard({
    typeDelete = false,
    taskTitle,
    onCancel,
    onConfirm
}) {
    const [confirmation, setConfirmation] = useState("");

    function handleConfirm() {
        if (typeDelete && confirmation !== "DELETE") {
            return;
        }

        onConfirm();
    }

    return (
        <CardContainer className="Confirm">
            <h2>Confirm Delete</h2>

            <p>
                Are you sure you want to delete "{taskTitle || "this task"}"?
            </p>

            {typeDelete && (
                <input
                    type="text"
                    placeholder="Type 'DELETE'"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                />
            )}

            <nav>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>

                <button
                    type="button"
                    className="confirm-btn"
                    onClick={handleConfirm}
                >
                    Confirm
                </button>
            </nav>
        </CardContainer>
    );
}