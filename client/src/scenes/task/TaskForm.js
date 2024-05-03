import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const TaskForm = ({ getTasks }) => {
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Input field cannot be empty");
      return;
    }
    try {
      await axios.post(`http://localhost:5001/tasks`, { name });
      toast.success("Task added successfully");
      setName("");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="task-form" onSubmit={createTask}>
      <input
        type="text"
        placeholder="Add a task"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;

