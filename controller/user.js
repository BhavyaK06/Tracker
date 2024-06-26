var jwt=require('jsonwebtoken');
const Users=require('../model/user');
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


const JWT_SECRET = '482d0829e5856b8340k3945p7487c5485x0940z';
  exports.logout = async (req, res) => {
      
      res.redirect('/index.html')

  };

  exports.login = async (req, res, next) => {
    const { username,password,email } = req.body;
    try {
     
      const usernamecheck = await Users.findOne({ username }).lean();
      const useremail=await Users.findOne({ email }).lean();

      if(!usernamecheck && !useremail){
        return res.status(404).send("Invalid credentials");
      }
      if(usernamecheck.role=="admin"){
        console.log("Entered user name");
        const user=usernamecheck;
        if(password!=user.password)
        {
          return res.status(400).send("Invalid password");
        }
  
        const token = sign({ user }, "secret", { expiresIn: 360000 });
        return res.status(200).json({ token, user: { ...user, password: null } ,role:user.role ,username:user._id });
      }
      else if(usernamecheck)
      {
        console.log("Entered user name");
        const user=usernamecheck;
        if (await bcrypt.compare(password, user.password)) {
      
          const token = jwt.sign(
            {
              id: user._id,
              username: user.username
            },
            JWT_SECRET
          )
          return res.status(200).json({ token, user: { ...user, password: null } ,role:user.role ,username:user._id });
        }
      
        res.json({ status: 'error', error: 'Invalid username/password' })
   
      }

      else if(useremail)
      {
        console.log("Entered user email");
        const user=useremail;
        if (await bcrypt.compare(password, user.password)) {
      
          const token = jwt.sign(
            {
              id: user._id,
              username: user.username
            },
            JWT_SECRET
          )
          return res.status(200).json({ token, user: { ...user, password: null } ,role:user.role ,username:user._id });
        }
      
        res.json({ status: 'error', error: 'Invalid username/password' })
   
      }
      
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
  

 exports.getAllUsers=(req, res) => {

  Users.find({})
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

  exports.register = async (req, res, next) => {
    const { username, password :plainTextPassword , email } = req.body;
    console.log(username,plainTextPassword, email);
    if(!username || !plainTextPassword ||!email )
      return res.status(400).send("Please fill in all the required fields!")
      const password = await bcrypt.hash(plainTextPassword, 10)
    try {
      const userObj = { username,password ,email };
     
      const user = await new Users(userObj).save();
      const token = sign({ userObj }, JWT_SECRET, { expiresIn: 360000 });
      return res
        .status(201)
        .json({ token, user: { ...user._doc, password: null }});
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };


  exports.checkUser=async (req,res,next)=>{
    
    res.status(200).send({message:"hi"})

  }