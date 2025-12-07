const express = require('express')
const app = express()
const crypto = require('crypto')

require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded())

app.get('/',(req, res)=>{
    res.send("server")
})

let arr = []
app.post('/api/user', (req, res)=> {
    const {name, dob, mobile, email} = req.body
    arr.push({id: crypto.randomUUID(), name, dob, mobile, email})
    res.send(arr)
})

app.get('/api/user', (req, res)=>{
    res.send(arr)
})


app.get('/api/user/:id',(req,res)=>{
    const singleRecord = arr.find(ele => ele.id == req.params.id)
    // res.send({success:true,singleRecord})
     res.send(singleRecord)  
})

app.delete('/api/user/:id', (req, res)=>{
    const {id} = req.params
    const filterData = arr.filter((ele)=>{
        return ele.id !== id
    })
    arr = filterData
    res.send("deleted")
})

app.put('/api/user/:id', (req, res)=>{
    const {id} = req.params
    const {name, dob, mobile, email} = req.body
    const index = arr.findIndex((ele)=>{
        return ele.id === id
    })
    arr.splice(index, 1,{id, name, dob, mobile, email})
    res.send("updated")
})

app.listen(PORT, ()=>{console.log(`listening on http://localhost:${PORT}`)})