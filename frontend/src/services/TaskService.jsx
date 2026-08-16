import { apiFetch } from "../security/apifetch";
import { checkResponse } from "./apiHelper";

async function taskCreate(taskData) {
    const response = await apiFetch("/task/create", {
        method: "POST",
        body: JSON.stringify(taskData)
    });

    await checkResponse(response, "Failed to create task");
    return response.json();
}

async function taskGet(taskId) {
    const response = await apiFetch(`/task/${taskId}`, {
        method: "GET"
    });

    await checkResponse(response, "Failed to get task");
    return response.json();
}

async function taskGetAll() {
    const response = await apiFetch("/task/userAllTask", {
        method: "GET"
    });

    await checkResponse(response, "Failed to get task list");
    return response.json();
}

async function taskDelete(taskId) {
    const response = await apiFetch(`/task/delete/${taskId}`, {
        method: "DELETE"
    });

    await checkResponse(response, "Failed to delete task");
    return response.text();
}

async function deleteAllTask() {
    const response = await apiFetch("/task/deleteAllTask", {
        method: "DELETE"
    });

    await checkResponse(response, "Failed to delete all tasks");
    return response.text();
}

async function taskUpdate(taskData) {
    const response = await apiFetch("/task/update", {
        method: "PUT",
        body: JSON.stringify(taskData)
    });

    await checkResponse(response, "Failed to update task");
    return response.json();
}

export {
    taskCreate,
    taskGet,
    taskGetAll,
    taskDelete,
    deleteAllTask,
    taskUpdate
};
