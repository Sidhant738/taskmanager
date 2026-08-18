import { useEffect, useState } from "react";
import { 
    taskCreate,
    taskDelete,
    taskGet,
    taskGetAll,
    taskUpdate
} from "../services/TaskService";

export default function useTask() {
    const [taskTable, setTaskTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadInitialTasks() {
            try {
                const tasks = await taskGetAll();

                if (active) {
                    setTaskTable(
                        Array.isArray(tasks) ? tasks : []
                    );
                    setError("");
                }
            } catch (err) {
                if (active) {
                    setError(
                        err.message || "Failed to load tasks"
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadInitialTasks();

        return () => {
            active = false;
        };
    }, []);

    async function loadTask() {
        setLoading(true);
        setError("");

        try {
            const tasks = await taskGetAll();

            setTaskTable(
                Array.isArray(tasks) ? tasks : []
            );

            return tasks;
        } catch (err) {
            setError(
                err.message || "Failed to load tasks"
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function addTask(taskData) {
        setError("");

        try {
            const createdTask = await taskCreate(taskData);

            setTaskTable((previousTasks) => [
                ...previousTasks,
                createdTask
            ]);

            return createdTask;
        } catch (err) {
            setError(
                err.message || "Failed to create task"
            );
            throw err;
        }
    }

    async function editTask(taskData) {
        setError("");

        try {
            const updatedTask = await taskUpdate(taskData);

            setTaskTable((previousTasks) =>
                previousTasks.map((task) =>
                    task.id === updatedTask.id
                        ? updatedTask
                        : task
                )
            );

            return updatedTask;
        } catch (err) {
            setError(
                err.message || "Failed to update task"
            );
            throw err;
        }
    }

    async function getTask(taskId) {
        setError("");

        try {
            return await taskGet(taskId);
        } catch (err) {
            setError(
                err.message || "Failed to get task"
            );
            throw err;
        }
    }

    async function deleteTask(taskId) {
        setError("");

        try {
            await taskDelete(taskId);

            setTaskTable((previousTasks) =>
                previousTasks.filter(
                    (task) => task.id !== taskId
                )
            );
        } catch (err) {
            setError(
                err.message || "Failed to delete task"
            );
            throw err;
        }
    }

    function logout() {
        localStorage.removeItem("userToken");
    }

    return {
        taskTable,
        setTaskTable,
        loading,
        error,
        loadTask,
        addTask,
        editTask,
        getTask,
        deleteTask,
        logout
    };
}