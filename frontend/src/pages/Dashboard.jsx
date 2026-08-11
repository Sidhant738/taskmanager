import { useEffect, useMemo, useState } from "react";
import CardArea from "../components/cardArea/CardArea";
import Header from "../components/header/Header";
import useTask from "../hook/useTask";
import Modal from "../components/modal/Modal";
import EditCard from "../components/card/EditCard";
import ViewCard from "../components/card/ViewCard";
import ConfirmCard from "../components/card/confirm";
import "../styles/page/dashboard.css"
export default function Dashboard() {
    const [sortMode, setSortMode] = useState(localStorage.getItem("taskmanagerDefaultSort") || "Newest First");

    const {
        taskTable,
        setTaskTable,
        editTask,
        deleteTask,
        logout,
        addTask
    } = useTask();

    useEffect(() => {
        const onSettingsChanged = () => {
            setSortMode(localStorage.getItem("taskmanagerDefaultSort") || "Newest First");
        };

        window.addEventListener("settingsChanged", onSettingsChanged);
        return () => window.removeEventListener("settingsChanged", onSettingsChanged);
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    function handleClick(taskId) {
        setIsOpen(true);

        if (taskId == null) {
            setSelectedTask(null);
            return;
        }

        const task = taskTable.find(t => t.id === taskId);
        setSelectedTask(task);
    }

    function handleView(task) {
        setSelectedTask(task);
        setIsViewOpen(true);
    }

    function handleDeletePrompt(taskId) {
        setPendingDeleteId(taskId);
        setIsConfirmOpen(true);
    }

    async function handleDeleteConfirmed() {
        if (pendingDeleteId == null) return;
        await deleteTask(pendingDeleteId);
        setPendingDeleteId(null);
        setIsConfirmOpen(false);
    }

    function handleStatechange(taskId) {

        const task = taskTable.find(t => t.id === taskId);

        if (task) {
            editTask({
                ...task,
                completed: !task.completed
            });
        }
    }

    const sortedTasks = useMemo(() => {
        const tasks = [...taskTable];

        if (sortMode === "Oldest First") {
            return tasks.sort((a, b) => a.id - b.id);
        }

        if (sortMode === "Priority") {
            return tasks.sort((a, b) => {
                if (a.completed === b.completed) {
                    return a.title.localeCompare(b.title);
                }
                return a.completed ? 1 : -1;
            });
        }

        return tasks.sort((a, b) => b.id - a.id);
    }, [taskTable, sortMode]);

    return (
        <div className="dashboard">

            <Header logout={logout} />

            <CardArea
                tasktable={sortedTasks}
                settasktable={setTaskTable}
                add={() => handleClick(null)}
                edit={handleClick}
                get={handleView}
                ondelete={handleDeletePrompt}
                onState={handleStatechange}
            />

            {isConfirmOpen && (
                <Modal
                    isOpen={isConfirmOpen}
                    onClose={() => {
                        setIsConfirmOpen(false);
                        setPendingDeleteId(null);
                    }}
                >
                    <ConfirmCard
                        taskTitle={taskTable.find((task) => task.id === pendingDeleteId)?.title}
                        onCancel={() => {
                            setIsConfirmOpen(false);
                            setPendingDeleteId(null);
                        }}
                        onConfirm={handleDeleteConfirmed}
                    />
                </Modal>
            )}

            {isViewOpen && (
                <Modal
                    isOpen={isViewOpen}
                    onClose={() => setIsViewOpen(false)}
                >
                    <ViewCard
                        task={selectedTask}
                        onClose={() => setIsViewOpen(false)}
                    />
                </Modal>
            )}

            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <EditCard
                        task={selectedTask}
                        onCancel={() => setIsOpen(false)}
                        onSave={(taskData) => {

                            if (selectedTask) {
                                editTask(taskData);
                            } else {
                                addTask(taskData);
                            }

                            setIsOpen(false);
                        }}
                    />
                </Modal>
            )}

        </div>
    );
}