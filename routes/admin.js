const express= require('express');
const adminController = require('../controller/admin');
 
const router = express.Router();
 
router.get('/tasks', adminController.getAllTasks);
router.get('/tasks/:id', adminController.getAllTasksUpdate);
router.post('/tasks', adminController.createTask);
router.put('/tasks/:id', adminController.updateTask);
router.delete('/tasks/:id', adminController.deleteTask);
router.get('/task/:id', adminController.getTasksByUsername);
router.put('/tasks/update-status/:taskId', adminController.updateTaskStatus);
router.get('/search',adminController.searchTasks);
router.put('/tasks/update/:taskId',adminController.updateTaskNotification);
module.exports = router;