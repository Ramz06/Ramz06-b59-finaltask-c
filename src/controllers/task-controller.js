const authValidation = require("../validation/auth-validation")
const {Collection, Tasks} = require("../../models")

const renderTask = async (req, res) => {
    try {
      const id = req.params.id;
  
      const collection = await Collection.findOne({
        where: { id: id }
      });
  
      if (!collection) {
        return res.status(404).send('Collection not found');
      }
  
      const tasks = await Tasks.findAll({
        where: { collections_id: id }
      });

      const isDoneTasks = await Tasks.findAll({
        where: { collections_id: id, is_done: true }
      });
  
      const notDoneTasks = await Tasks.findAll({
        where: { collections_id: id, is_done: false }
      });
  
      if (tasks) {
          res.render('task', { collection, tasks, isDoneTasks, notDoneTasks });
        } else {
          res.render('task', { collection });
      }
    } catch (error) {
      console.error('Error fetching collection or tasks:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  const getTaskId = async (req, res) => {
    const { collectionId, name } = req.query;
    console.log("req.query: ", req.query)
    const task = await Tasks.findOne({
        where: { collections_id: collectionId, name : name }
      });
    console.log({task})
    if (task) {
        res.status(200).json(task.id)
    } else {
        res.status(404).json({error : "task not found"})
    }
}

const addTask = async (req, res) => {
    const {collectionId, name} = req.body
    const user = await authValidation(req.session.user)
    if (!user) {
        return res.status(401).json({ error: "unauthorized" });
      }
  
      const collection = await Collection.findOne({
        where: { id: collectionId },
      });
  
      if (!collection) {
        return res.status(404).json({ error: "collection not found" });
      }
  
      if (user.id !== collection.user_id) {
        return res.status(403).json({ error: "forbidden" });
      }
    const duplicateTask = await Tasks.findOne({
        where: { name: name, collections_id : collectionId }
      });
      if (duplicateTask) {
        return res.status(500).json({error : "the task name has been existing"})
      }
    try {
      const newTask = await Tasks.create({
        name: name, 
        is_done: false, 
        collections_id: collectionId,
      });
  
      res.status(201).json([{msg : "query update successfuly"}])
    } catch (error) {
      console.error('Gagal menambahkan task:', error.message);
    }
}

const changeTaskStatus = async (req, res) => {
try {
  const { id } = req.params; 
  const { collectionId } = req.body
  const user = await authValidation(req.session.user);
  if (!user) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const collection = await Collection.findOne({
    where: { id: collectionId },
  });

  if (!collection) {
    return res.status(404).json({ error: "collection not found" });
  }

  if (user.id !== collection.user_id) {
    return res.status(403).json({ error: "forbidden" });
  }

  const task = await Tasks.findOne({
    where: { id: id, collections_id : collectionId }
  });

  if (!task) {
    return res.status(404).send('Task not found');
  }

  // Toggle the is_done value
  task.is_done = !task.is_done;

  // Save the updated task
  await task.save();

  res.status(200).json({
    message: 'Task status updated successfully',
    task: task,
  });
} catch (error) {
  console.error('Error updating task status:', error.message);
  res.status(500).send('Internal Server Error');
}
};


const taskController = {
    renderTask,
    getTaskId,
    addTask,
    changeTaskStatus
}

module.exports = taskController