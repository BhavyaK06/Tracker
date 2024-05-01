const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  submissionDate: String,
  assignedTo: String,
  status: { 
    type: String,
    default: "Incomplete" 
  },
  notification:{
  type:Number,
  default:"1"
  },
   comment: String
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
