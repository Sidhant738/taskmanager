import { useState } from "react";
import TaskCard from "../card/TaskCard";
import EmptyCard from "../card/EmptyCard";
import "../../styles/cardarea/cardarea.css";

export default function CardArea({
    tasktable,
    settasktable,
    add,
    ondelete,
    get,
    edit,
    onState
}) {

    const [search, setsearch] = useState("");

    const filtertask = tasktable.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
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
                        onChange={(e) => setsearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="task-container">

                <EmptyCard onClick={add} />

                {filtertask.map(task => (

                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={ondelete}
                        onEdit={edit}
                        onState={onState}
                        status={task.completed}
                        onClick={() => get(task)}
                    />

                ))}

            </div>

        </div>
    );
}