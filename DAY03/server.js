const express = require('express')
const connectDB = require('./src/db/db')
const noteModel = require('./src/models/note.model')
require("dotenv").config();




const app = express()
app.use(express.json())
connectDB()


// CREATE Notes In Notes Database

app.post('/notes', async (req, res)=> {
    
    const {title, description} = req.body
    
    await noteModel.create({
        title, description
    })


    res.json({
        message:"Successfully Created"
    })
})



// GET Data from notes Database

app.get('/notes', async (req, res)=>{

    const notes = await noteModel.find()

    res.json({
        message:"Notes Fetched Successfully",
        notes: notes
    })
})



// DELETE data from database

app.delete('/notes/:id', async (req, res)=>{
    const noteId = req.params.id
    
    await noteModel.findOneAndDelete({
        _id : noteId
    })

    res.json({
        message:"Note Deleted Successfully"
    })
})


// UPDATING data from database

app.patch('/notes/:id', async (req, res) => {

    const noteID = req.params.id
    const { title , description} = req.body

    await noteModel.findOneAndUpdate({
        _id : noteID,
    },{
        title: title,
        description: description
    })

    res.json({
        message:"Update Notes Successfully"
    })

})



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})