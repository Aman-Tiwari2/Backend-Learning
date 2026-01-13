const express = require('express')


const app = express()
app.use(express.json())
let notes = []


// Creating resources to the server level { /notes }

app.post('/notes', (req, res)=> {
    
    notes.push(req.body)
    res.json({
        message: "Notes Added Successfully",
        // notes:notes
    })
})

// For accessing all the value's  { /notes }

app.get('/notes', (req, res)=>{
    res.json({
        notes: notes
    })
})

// For deleting the notes {/notes/:index}

app.delete('/notes/:index', (req, res)=>{
    const index = req.params.index

    delete notes[index]

    res.json({
        message: "Your notes is deleted successfully"
    })
})


// For updating this value we put index and access it with params { /notes/:index }

app.patch('/notes/:index', (req, res) => {

    const index = req.params.index
    const {title , description} = req.body

    notes[index].title = title
    notes[index].description = description

    res.json({
        message: "Your notes updated successfully"
    })
})



app.listen(3000, () => {
    console.log("Port is running successfully on PORT 3000")
})