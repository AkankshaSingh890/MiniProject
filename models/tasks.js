const mongoose = require('mongoose')

//tasks db schema
const taskSchema = new mongoose.Schema(
    {
        task_name:{
            type:String,
            trim:true
        },
        description:{
            type:String,
        },
        AssignedTo:{
            type:String,
            trim:true
        },
        status:{
            type:String,
            trim:true
        },
        notification:{
            type:Number,
            trim:true
        },
        comments:{
            type:String,
            trim:true
        }
    },
         {timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
module.exports = mongoose.model("Task",taskSchema)