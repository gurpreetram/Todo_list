
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task:String,
    email:String,
    age:Number,
    done :{
        type : Boolean,
        default :true
    }

})

const TodoModel = mongoose.model("todos" , TodoSchema) 
module.exports = TodoModel