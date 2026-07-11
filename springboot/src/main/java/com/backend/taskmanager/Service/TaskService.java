package com.backend.taskmanager.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.taskmanager.Entity.Task;
import com.backend.taskmanager.Repository.TaskRepository;
import com.backend.taskmanager.DTO.Taskdto;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Taskdto taskDto) {
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.isStatus());
        task.setUserId(taskDto.getUserId());
        return taskRepository.save(task);
    }

    public Task findTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public List<Task> findAllTaskByUser(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found");
        }

        taskRepository.deleteById(id);
    }

    public Task updateTask(Task task) {

        Task existingTask = findTaskById(task.getId());

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.isStatus());

        return taskRepository.save(existingTask);
    }
}