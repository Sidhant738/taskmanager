import { useMemo, useState } from "react";
import CardArea from "../components/cardArea/CardArea";
import Header from "../components/header/Header";
import useTask from "../hook/useTask";
import Modal from "../components/modal/Modal";
import EditCard from "../components/card/EditCard";
import ViewCard from "../components/card/ViewCard";
import ConfirmCard from "../components/card/Confirm";
import "../styles/page/dashboard.css";

const SORT_NEWEST = "Newest First";
const SORT_OLDEST = "Oldest First";

export default function Dashboard() {
    const savedSort = localStorage.getItem("taskmanagerDefaultSort");

    const [sortMode, setSortMode] = useState(
        savedSort === SORT_OLDEST
            ? SORT_OLDEST
            : SORT_NEWEST
    );

    const {
        taskTable,
        editTask,
        deleteTask,
        logout,
        addTask,
        loading,
        error
    } = useTask();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [actionError, setActionError] = useState("");

    const sortedTasks = useMemo(() => {
        const tasks = [...taskTable];

        return tasks.sort((first, second) => {
            const firstId = Number(first.id);
            const secondId = Number(second.id);

            return sortMode === SORT_OLDEST
                ? firstId - secondId
                : secondId - firstId;
        });
    }, [taskTable, sortMode]);

    function openCreateModal() {
        setSelectedTask(null);
        setActionError("");
        setIsEditOpen(true);
    }

    function openEditModal(taskId) {
        const task = taskTable.find(
            (item) => item.id === taskId
        );

        if (!task) return;

        setSelectedTask(task);
        setActionError("");
        setIsEditOpen(true);
    }

    function closeEditModal() {
        setIsEditOpen(false);
        setSelectedTask(null);
    }

    function openViewModal(task) {
        setSelectedTask(task);
        setIsViewOpen(true);
    }

    function closeViewModal() {
        setIsViewOpen(false);
        setSelectedTask(null);
    }

    function openDeleteModal(taskId) {
        setPendingDeleteId(taskId);
        setIsConfirmOpen(true);
    }

    function closeDeleteModal() {
        setPendingDeleteId(null);
        setIsConfirmOpen(false);
    }

    async function handleDeleteConfirmed() {
        if (pendingDeleteId == null) return;

        try {
            setActionError("");
            await deleteTask(pendingDeleteId);
            closeDeleteModal();
        } catch (err) {
            setActionError(
                err.message || "Failed to delete task"
            );
        }
    }

    async function handleStatusChange(taskId) {
        const task = taskTable.find(
            (item) => item.id === taskId
        );

        if (!task) return;

        try {
            setActionError("");

            await editTask({
                id: task.id,
                title: task.title,
                description: task.description,
                completed: !task.completed
            });
        } catch (err) {
            setActionError(
                err.message || "Failed to update task"
            );
        }
    }

    async function handleSave(taskData) {
        try {
            setActionError("");

            if (selectedTask) {
                await editTask({
                    id: selectedTask.id,
                    title: taskData.title,
                    description: taskData.description,
                    completed: selectedTask.completed
                });
            } else {
                await addTask({
                    title: taskData.title,
                    description: taskData.description,
                    completed: false
                });
            }

            closeEditModal();
        } catch (err) {
            setActionError(
                err.message || "Failed to save task"
            );
        }
    }

    function handleSortChange(event) {
        const value = event.target.value;

        setSortMode(value);
        localStorage.setItem(
            "taskmanagerDefaultSort",
            value
        );
    }

    return (
        <div className="dashboard">
            <Header logout={logout} />

            {(actionError || error) && (
                <p className="error">
                    {actionError || error}
                </p>
            )}

            <div className="dashboard-toolbar">
                <label>
                    Sort:
                    <select
                        value={sortMode}
                        onChange={handleSortChange}
                    >
                        <option value={SORT_NEWEST}>
                            Newest First
                        </option>
                        <option value={SORT_OLDEST}>
                            Oldest First
                        </option>
                    </select>
                </label>
            </div>

            <CardArea
                taskTable={sortedTasks}
                onAdd={openCreateModal}
                onEdit={openEditModal}
                onView={openViewModal}
                onDelete={openDeleteModal}
                onStatusChange={handleStatusChange}
                loading={loading}
            />

            {isConfirmOpen && (
                <Modal
                    isOpen={isConfirmOpen}
                    onClose={closeDeleteModal}
                >
                    <ConfirmCard
                        taskTitle={
                            taskTable.find(
                                (task) =>
                                    task.id === pendingDeleteId
                            )?.title
                        }
                        onCancel={closeDeleteModal}
                        onConfirm={handleDeleteConfirmed}
                    />
                </Modal>
            )}

            {isViewOpen && (
                <Modal
                    isOpen={isViewOpen}
                    onClose={closeViewModal}
                >
                    <ViewCard
                        task={selectedTask}
                        onClose={closeViewModal}
                    />
                </Modal>
            )}

            {isEditOpen && (
                <Modal
                    isOpen={isEditOpen}
                    onClose={closeEditModal}
                >
                    <EditCard
                        task={selectedTask}
                        onCancel={closeEditModal}
                        onSave={handleSave}
                    />
                </Modal>
            )}
        </div>
    );
}
