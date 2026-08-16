import { useState } from "react";
import TaskCard from "../card/TaskCard";
import EmptyCard from "../card/EmptyCard";
import "../../styles/cardarea/cardarea.css";

export default function CardArea({
    taskTable,
    onAdd,
    onDelete,
    onEdit,
    onView,
    onStatusChange,
    loading
}) {
    const [search, setSearch] = useState("");

    const filteredTasks = taskTable.filter((task) =>
        (task.title || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="cardarea">
            <div className="search-container">
                <div className="search-box">
                    <span className="search-icon"></span>

                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search tasks by title"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />
                </div>
            </div>

            <div className="task-container">
                <EmptyCard onClick={onAdd} />

                {loading ? (
                    <p>Loading tasks...</p>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onStatusChange={onStatusChange}
                            onClick={() => onView(task)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
