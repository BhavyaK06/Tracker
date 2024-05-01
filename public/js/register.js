function registerUser(){
  var u=document.getElementById("username").value

  var p=document.getElementById("password").value

  var e=document.getElementById("email").value

 

  var newobj={

    username:u,
    password:p,
    email:e,

  }

  var req = new XMLHttpRequest();

  req.open("POST", "http://localhost:5000/register");

  req.setRequestHeader("Content-Type", "application/json");

  req.send(JSON.stringify(newobj));

  req.onreadystatechange = function () {

     if (req.readyState == 4) {

        if (req.status == 201) {
          
          window.location.href="login.html";

        }
     }
     

}
alert("register success");

}