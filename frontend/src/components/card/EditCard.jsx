import { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import "../../styles/cards/editcard.css";

export default function EditCard({
    task,
    onCancel,
    onSave
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setTitle(task?.title ?? "");
        setDescription(task?.description ?? "");
    }, [task]);

    function handleSubmit(event) {
        event.preventDefault();

        const cleanTitle = title.trim();
        const cleanDescription = description.trim();

        if (!cleanTitle || !cleanDescription) {
            return;
        }

        onSave({
            title: cleanTitle,
            description: cleanDescription
        });
    }

    return (
        <CardContainer className="Edit">
            <form onSubmit={handleSubmit}>
                <label htmlFor="task-title">
                    Title
                </label>

                <input
                    id="task-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    maxLength={255}
                    required
                />

                <label htmlFor="task-description">
                    Description
                </label>

                <textarea
                    id="task-description"
                    rows="5"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    maxLength={1000}
                    required
                />

                <nav>
                    <button
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button type="submit">
                        Save
                    </button>
                </nav>
            </form>
        </CardContainer>
    );
}
