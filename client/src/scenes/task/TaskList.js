import axios from "axios";
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify"; 
import { Box, Container, Typography } from "@mui/material"; // Import MUI components
import { theme } from "../../theme"; // Import the theme file
import Task from "./Task";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    completed: false
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5001/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  // Other functions for createTask, deleteTask, updateTask, markAsComplete, setToComplete

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const cTask = tasks.filter((task) => task.completed === true);
    setCompletedTasks(cTask);
  }, [tasks]);

  return (
    <Container maxWidth="md" style={{ marginTop: theme.spacing(4) }}>
      <Typography variant="h2" align="center">Task Manager</Typography>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        // Pass other props as needed
      />
      {tasks.length > 0 && (
        <Box display="flex" justifyContent="space-between" py={2}>
          <Typography><b>Total Tasks:</b> {tasks.length}</Typography>
          <Typography><b>Completed Tasks:</b> {completedTasks.length}</Typography>
        </Box>
      )}
      <hr />
      {!isLoading && tasks.length === 0 ? (
        <Typography variant="body1" align="center" py={2}>No Task added. Please add a Task</Typography>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          {tasks.map((task, index) => (
            <Task
              key={task._id}
              task={task}
              index={index}
              // Pass other props as needed
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default TaskList;
