document.addEventListener('DOMContentLoaded', function () {
  fetchTasks();
  getusersList();
 
  const createTaskLink = document.getElementById('createTaskLink');
  const Alltask1 = document.getElementById('Alltask');
  const searchTaskLink = document.getElementById('searchButton');
  const createTaskFormCancel = document.getElementById('createTaskFormCancel'); 
  createTaskFormCancel.addEventListener('click', hideCreateTaskForm);
 
  function searchTasks() {
    const searchInput = document.getElementById('searchInput').value;
 
    fetch(`/admin/search?query=${searchInput}`)
      .then(response => response.json())
      .then(tasks => displayTasks(tasks))
      .catch(error => console.error('Error searching tasks:', error));
  }

  createTaskLink.addEventListener('click', showCreateTaskForm);
  searchTaskLink.addEventListener('click', searchTasks);
  Alltask1.addEventListener('click',showalltask);

 
  
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('editButton')) {
      const taskId = event.target.getAttribute('data-taskid');
      editTask(taskId);
    }
 
    if (event.target.classList.contains('deleteButton')) {
      const taskId = event.target.getAttribute('data-taskid');
      deleteTask(taskId);
    }
  });
 
  
  function fetchTasks() {
    fetch('/admin/tasks')
      .then(response => response.json())
      .then(tasks => displayTasks(tasks))
      .catch(error => console.error('Error fetching tasks:', error));
  }
 
 
  function displayTasks(tasks) {
    const taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = '';
 
    
    const headers = ['title', 'description','assignedTo','submissionDate','status','comment'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    headerRow.innerHTML += '<th>Actions</th>';
    taskTable.appendChild(headerRow);
 
    tasks.forEach(task => {
      const tr = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = task[header];
        tr.appendChild(td);
      });
 
      
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'editButton';
      editButton.setAttribute('data-taskid', task._id);
 
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'deleteButton';
      deleteButton.setAttribute('data-taskid', task._id);
 
      const tdActions = document.createElement('td');
      tdActions.appendChild(editButton);
      tdActions.appendChild(deleteButton);
      tr.appendChild(tdActions);
 
      taskTable.appendChild(tr);
    });
  }

  function showCreateTaskForm() {
    const createTaskForm = document.getElementById('createTaskForm');
    createTaskForm.style.display = 'block';
 
    
    const createTaskFormSubmit = document.getElementById('createTaskFormSubmit');
    createTaskFormSubmit.addEventListener('click', submitTaskForm);
  }
 
  
  function submitTaskForm() {
    const taskForm = document.getElementById('taskForm');
    const formData = new FormData(taskForm);
    
 console.log("fx",Object.fromEntries(formData));
    fetch('/admin/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then(response => response.json())
      .then(() => {
        hideCreateTaskForm();
        fetchTasks();
      })
      .catch(error => console.error('Error creating task:', error));
  }
 
  
  function hideCreateTaskForm() {
    const createTaskForm = document.getElementById('createTaskForm');
    createTaskForm.style.display = 'none';
  }
 

  function getusersList(){

  
    const url = "http://localhost:5000/users";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let length = data.length;
        console.log(length);
        let content =`<select name='assignedTo' id='assignedTo' required><option> Select User </option>`;
        for (i = 0; i < length; i++) {
          content += `<option value="${data[i].username}" data-extra="${data[i].username}">${data[i].username}</option>`;
        }
     
        document.getElementById("assignedTo").innerHTML = content;
      })
    .catch((error) => {
        console.log(error.message);
    });

  }

  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', logout);
 
  
  function logout() {
  window.location.href = 'index.html';
  }
  
  function showSearchForm() {
    
    console.log('Show search form');
  }

  function showalltask(){
    location.reload();
  }
 
  
function editTask(taskId) {
  
  let editfrm= document.getElementById("editTaskForm");
  editfrm.style.display="block";
  
  let url="http://localhost:5000/admin/tasks/"+taskId
  fetch(url)
    .then(response => response.json())
    .then(task => {
      console.log(task);
      
      document.getElementById('editTaskId').value = task[0]._id;
      document.getElementById('editTaskTitle').value = task[0].title;
      document.getElementById('editTaskDescription').value = task[0].description;
      document.getElementById('editTaskDueDate').value = task[0].submissionDate;
      document.getElementById('editTaskAssignedTo').value = task[0].assignedTo;
      document.getElementById('editTaskComment').value = task[0].comment;
 
      
      document.getElementById('editTaskForm').style.display = 'block';
    })
    .catch(error => console.error('Error fetching task details for edit:', error));
}

const updatedata = document.getElementById('update1');
updatedata.addEventListener('click', updateTask);

function updateTask() {
  
  const taskId = document.getElementById('editTaskId').value;
  const title = document.getElementById('editTaskTitle').value;
  const description = document.getElementById('editTaskDescription').value;
  const dueDate = document.getElementById('editTaskDueDate').value;
  const assignedTo = document.getElementById('editTaskAssignedTo').value;
  const comment = document.getElementById('editTaskComment').value;

  const updatedTask = {
    title: title,
   description: description,
   submissionDate: dueDate,
    assignedTo: assignedTo,
    comment:comment
  };
 
  
  fetch(`/admin/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  })
    .then(response => response.json())
    .then(updatedTask => {
      console.log(`Updated task: ${JSON.stringify(updatedTask)}`);
      fetchTasks(); 
      document.getElementById('editTaskForm').style.display = 'none';
    })
    .catch(error => console.error(error));
}
 
function cancelUpdateTask() {
  document.getElementById('editTaskForm').style.display = 'none';

  }
 
  function deleteTask(taskId) {
    fetch(`/admin/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        fetchTasks();
      })
      .catch(error => console.error('Error deleting task:', error));
  }
});