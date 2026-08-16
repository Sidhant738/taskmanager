package com.backend.taskmanager.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.backend.taskmanager.DTO.TaskDto;
import com.backend.taskmanager.Entity.Task;
import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Repository.TaskRepository;
import com.backend.taskmanager.Repository.UserRepository;
import com.backend.taskmanager.exception.ForbiddenException;
import com.backend.taskmanager.exception.ResourceNotFoundException;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;


    // CREATE TASK
    public TaskDto createTask(TaskDto taskDto) {

        User currentUser = getCurrentUser();

        Task task = new Task();

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setCompleted(taskDto.isCompleted());

        task.setUser(currentUser);

        Task savedTask = taskRepository.save(task);

        return taskToTaskDto(savedTask);
    }


    
    public TaskDto findTaskById(Long taskId) {

        User currentUser = getCurrentUser();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        verifyOwnership(task, currentUser);

        return taskToTaskDto(task);
    }


    public List<TaskDto> findAllTaskByUser() {

        User currentUser = getCurrentUser();

        List<Task> taskList =
                taskRepository.findByUser_UserId(
                        currentUser.getUserId()
                );

        List<TaskDto> taskDtoList = new ArrayList<>();

        for (Task task : taskList) {
            taskDtoList.add(taskToTaskDto(task));
        }

        return taskDtoList;
    }


    public void deleteTask(Long taskId) {

        User currentUser = getCurrentUser();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        verifyOwnership(task, currentUser);

        taskRepository.delete(task);
    }
    public void deleteAllTask() {
        User currentUser = getCurrentUser();
        
         List<Task> taskList =
                taskRepository.findByUser_UserId(
                        currentUser.getUserId()
                );
        for(Task task :taskList){
            deleteTask(task.getId());
        }
        
    }

    
    public TaskDto updateTask(TaskDto taskDto) {

        User currentUser = getCurrentUser();

        Task existingTask = taskRepository.findById(
                taskDto.getId()
        ).orElseThrow(() ->
                new ResourceNotFoundException("Task not found"));

        verifyOwnership(existingTask, currentUser);

        existingTask.setTitle(taskDto.getTitle());
        existingTask.setDescription(taskDto.getDescription());
        existingTask.setCompleted(taskDto.isCompleted());

        Task updatedTask = taskRepository.save(existingTask);

        return taskToTaskDto(updatedTask);
    }



    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();

        return userRepository
                .findByUserName(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }



    private void verifyOwnership(Task task, User currentUser) {

        if (!task.getUser().getUserId()
                .equals(currentUser.getUserId())) {

            throw new ForbiddenException(
                    "You are not authorized to access this task"
            );
        }
    }


    
    private TaskDto taskToTaskDto(Task task) {

        TaskDto taskDto = new TaskDto();

        taskDto.setId(task.getId());
        taskDto.setTitle(task.getTitle());
        taskDto.setDescription(task.getDescription());
        taskDto.setCompleted(task.isCompleted());

        return taskDto;
    }
}