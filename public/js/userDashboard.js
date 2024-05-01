document.addEventListener('DOMContentLoaded', function () {
    fetchdata();
    
    function fetchdata() {
        let uid = localStorage.getItem("username");
        console.log(uid);
        const url ="http://localhost:5000/admin/task/"+uid;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tasks = data.tasks;
                const tableBody = document.getElementById('taskTableBody');
                tasks.forEach(task => {
                    if(task.notification=="1"){
                        var val1="You have assigned to new Task: "+task.title;
                        
                        showNotification("Notification:", val1 ,task._id);
                    }
                   
                    const row = tableBody.insertRow();
                    row.insertCell(0).innerText = task.title;
                    row.insertCell(1).innerText = task.description;
                    row.insertCell(2).innerText = task.submissionDate;
                    row.insertCell(3).innerText = task.comment;
                    row.insertCell(4).innerText = task.status;
          const statusCell = row.insertCell(4);
          const statusSelect = document.createElement('select');
          statusSelect.innerHTML = `
<option value="Incomplete">Incomplete</option>
<option value="In Progress">In Progress</option>
<option value="Completed">Completed</option>`;
          statusSelect.value = task.status;
         
          statusSelect.addEventListener('change', () => {
            updateStatus(task._id, statusSelect.value);
          });
          statusCell.appendChild(statusSelect);
        });
      })
      .catch(error => console.error('Error fetching tasks:', error));
 
    function updateStatus(taskId, newStatus) {
      fetch(`admin/tasks/update-status/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Status updated successfully:', data);
        })
        .catch(error => console.error('Error updating status:', error));
    }
           
      }
})
 
  function checkNotifications(taskId) {
          let newStatus=0;
          console.log("check",taskId);
          fetch(`admin/tasks/update/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notification:newStatus}),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Status updated successfully:', data);
          })
         .catch(error => console.error('Error fetching user details:', error));
  }

   
  function showNotification(title, message,taskid) {
    const notificationPopup = document.getElementById('notificationPopup');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificat = document.getElementById('OK');
    notificat.addEventListener('click', () => {
      checkNotifications(taskid);
      closeNotification();
    });
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
 
    notificationPopup.style.display = 'block';
 
   
  }
 
  function closeNotification() {
    const notificationPopup = document.getElementById('notificationPopup');
    
    notificationPopup.style.display = 'none';
  }
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', logout);
 
  function logout() {
    window.location.href = 'index.html';
  }

  