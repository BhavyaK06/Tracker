const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
   
    username:{
        type:String,
        unique:true,
        required:[true,"Enter User name"]
    },

    password:{
        type:String,
        required:[true,"Enter Password"]
    },

    email:{
        type:String,
        unique:true,
        required:[true,"Enter Email of The User"]
    },
    
    role:{

        type:String,
        default:"user",
        required:[true,"Enter Role"]

    }
},
{
         timestamps:false,
        versionKey:false
     
}


)


const Users=mongoose.model('Users',userSchema);

module.exports=Users;