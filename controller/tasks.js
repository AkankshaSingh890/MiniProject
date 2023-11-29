const task = require('../models/tasks');

//query to create tasks
exports.createTask = async (req,res)=>{
    try{
        const addTask = await task.create(req.body)
        console.log("Task Added Successfully");
        res.status(200).json(addTask)
    }
    catch(error){
        console.error("Error")
        res.status(500).send("Error")
    }
}

//query to get all tasks
exports.getAllTask = async(req,res)=>{
    try{
        const getTask = await task.find({})
        res.send(getTask)
    }
    catch(err){
    console.error('Error getting Task', err);
    res.status(500).send('Error getting Task');
  } 
}

//query to update particular tasks
exports.updateTask = async (req, res) => {
  const cId = req.params._id;
  const updatedTask = req.body;
    console.log(updatedTask);
  try{
    const options={new:true}
    const updateByid= await task.findByIdAndUpdate(cId,updatedTask,options);
    res.send({message:"Task Updated successfully",updatedvalues:updateByid})
  }catch(err){
    console.error('Error updating Task', err);
      res.status(500).send('Error updating Task');
  }
};

//query to delete particular tasks
exports.deleteTask = async (req, res) => {
  const taskId = req.params._id;
  try{
    const taskByid= await task.findByIdAndDelete(taskId);
     res.send({message:'Task deleted successfully',deletePayment:taskByid});
  }catch(err){
    console.error('Error deleting Task', err);
    res.status(500).send('Error deleting task');
  } 
};