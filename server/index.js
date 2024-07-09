const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Todos/todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get' , (req ,res) =>{
     TodoModel.find().then(response => res.json(response)).catch(err => res.json(err))
})

app.post('/connection', (req, res) => {
    // const task = req.body;
    TodoModel.create(
        req.body
    ).then(response => res.json(response)).catch(err => res.json(err))
})

app.delete('/userdelete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete(
        {_id :id }
    ).then(response => res.json(response)).catch(err => res.json(err))

      
    // console.log(id);
})

app.listen(8080, () => {
    console.log("Hello Gurpreet");
})