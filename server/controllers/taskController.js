import Task from "../models/taskModel.js";

// Create a Task
export const createTask = async (req, res) => {
    try { 
        const task = await Task.create(req.body);
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({msg:error.message});
     
    }
};

//get all Tasks
export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
       
    }

    catch(error){
        res.status(500).json({msg: error.message});
    }
};

//get a single task
export const getTask = async (req, res) => {
    
    try{
        const {id} = req.params
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json('No task with id: ${id}');
        }
        res.status(200).jason(task);   
    }
    catch(error){
        res.status(500).json({msg: error.message});
    }
};    

//Delete task
export const deleteTask = async (req, res) => {
    try{
       const {id} = req.params;
       const task = await Task.findByIdAndDelete(id);
       if (!task) {
        return res.status(404).json('No task with id: ${id}');
    }
    res.status(200).jason(task);   
    

      res.status(200).send("Task deleted");
    } catch (error) {
       res.status(500).json({msg: error.message});

    }
};

// Update a Task
export const updateTask = async (req, res) => {
    try{
        const { id } = req.params
        const task = await Task.findByIdUpdate(
           {_id: id}, req.body, {
          new: true,
          runValidators: true, 
        
        }
        );
        if (!task) {
            return res.status(404).json('No task with id: ${id}');
        }

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message});

    }
};
