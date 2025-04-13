const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const usermodel = require('./models/Users')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/CRUD_operation")

app.post('/createUser',(req,res)=>{
    usermodel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.get('/',(req,res)=>{
    usermodel.find({})
    .then(user => res.json(user))
    .catch(err=> res.json(err))
})

app.get('/getuser/:id',(req,res)=>{
    const id = req.params.id
    usermodel.findById({_id:id})
    .then(user=> res.json(user))
    .catch(err=> res.json(err))
})

app.put('/updateuser/:id',(req,res)=>{
    const id = req.params.id
    usermodel.findByIdAndUpdate({_id :id},{
        name : req.body.name,
        email : req.body.email, 
        age :req.body.age})
        .then(user=>res.json(user))
        .catch(err=>res.json(err))
})

app.delete('/deleteuser/:id',(req,res)=>{
    const id = req.params.id;
    usermodel.findByIdAndDelete({_id:id})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
    
})

app.listen('3001',()=>{
    console.log('server is running')
})