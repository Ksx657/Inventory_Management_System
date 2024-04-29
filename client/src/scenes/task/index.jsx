// components/Tasks.js
import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/tasks');
        setTasks(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCompletion = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:5001/tasks/${taskId}`, { isCompleted: true });
      if (response.status === 200) {
        setTasks(tasks.map(task => {
          if (task._id === taskId) {
            return { ...task, isCompleted: true };
          }
          return task;
        }));
      }
    } catch (error) {
      console.error('Error marking task as done:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/tasks/${taskId}`);
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>

      <Link to="/addtask">
        <Button variant="contained" sx={{ mb: 2 }}>+ Add Task</Button>
      </Link>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.isCompleted ? 'Completed' : 'Pending'}</TableCell>
                  <TableCell>
                    {!task.isCompleted && (
                      <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleTaskCompletion(task._id)}>Mark as Done</Button>
                    )}
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteTask(task._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Task;
