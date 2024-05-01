const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const adminRoutes = require('./routes/admin');


const userRoutes=require('./routes/user')
app.use('/',express.static('./public'))


app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());


app.use(userRoutes);
app.use('/admin', adminRoutes);


mongoose.connect("mongodb://0.0.0.0:27017/TaskTracking1")
.then(()=>{
    console.log("MongoDB Connection Success");
    app.listen(5000,()=>{
        console.log("Node listening to port 5000");
    })
}
).catch(()=>{
    console.log("MongoDB Connection Failed");
})

module.exports=app;

