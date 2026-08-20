package com.backend.taskmanager.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend.taskmanager.Entity.Task;
import com.backend.taskmanager.Service.TaskService;
import com.backend.taskmanager.DTO.TaskDto;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public TaskDto createTask(@Valid @RequestBody TaskDto taskDto) {
        return taskService.createTask(taskDto);
    }

    @GetMapping("/{id}")
    public TaskDto getTaskById(@PathVariable Long id) {
        return taskService.findTaskById(id);
    }

    @GetMapping("/userAllTask")
    public List<TaskDto> getAllTaskByUser() {
        return taskService.findAllTaskByUser();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "Task deleted successfully";
    }
    
    @DeleteMapping("/deleteAllTask")
    public String deleteAllTask() {
        taskService.deleteAllTask();
        return "Task deleted successfully";
    }


    @PutMapping("/update")
    public TaskDto updateTask(@Valid @RequestBody TaskDto taskDto) {
        return taskService.updateTask(taskDto);
    }

   
}