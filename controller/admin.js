const Task =require('../model/admin');
const Users=require('../model/user');
 
exports.getAllTasksUpdate = (req, res) => {
  const id=req.params.id;
  Task.find({_id:id})
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


exports.getAllTasks = (req, res) => {

  Task.find({})
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
 

exports.createTask = (req, res) => {
  const newTask = new Task(req.body);
  newTask.save()
    .then(task => {
      res.json(task);
    })
    .catch(error => {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
 
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
 
  Task.findByIdAndUpdate(taskId, updatedTask, { new: true })
    .then(task => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    })
    .catch(error => {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
 
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
 
  Task.findByIdAndRemove(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


exports.getTasksByUsername = (req, res) => {
  const userId = req.params.id;
  console.log("usid",userId);
  Users.findById(userId)
    .then(user => {
      if (!user) {
        console.error('User not found');
        return res.status(404).json({ error: 'User not found' });
      }
 
      const username = user.username;
 
      return Task.find({ assignedTo: username });
    })
    .then(tasks => {
      res.json({ tasks });
    })
    .catch(err => {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


exports.updateTaskStatus = (req, res) => {
  const taskId = req.params.taskId;
  const newStatus = req.body.status;
 
  Task.findByIdAndUpdate(taskId, { status: newStatus }, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
 
      res.json({ message: 'Status updated successfully', task: updatedTask });
    })
    .catch(error => {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};



exports.getCompletedTasks = (req, res) => {
  Task.find({ status: 'Completed' })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error fetching completed tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


exports.getCurrentTasks = (req, res) => {
  Task.find({ status: 'In Progress' })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error fetching completed tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};




exports.searchTasks = (req, res) => {
  const query = req.query.query;
 
  const searchRegex = new RegExp(query, 'i');
 
  Task.find({
    $or: [
      { title: searchRegex },
      { assignedTo: searchRegex }
    ]
  })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      console.error('Error searching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};





exports.updateTaskNotification = (req, res) => {
  const taskId = req.params.taskId;
  const newStatus = req.body.notification;
  console.log("newStatus",newStatus);
 
  Task.findByIdAndUpdate(taskId, { notification: newStatus }, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
 
      res.json({ message: 'Status updated successfully', task: updatedTask });
    })
    .catch(error => {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};