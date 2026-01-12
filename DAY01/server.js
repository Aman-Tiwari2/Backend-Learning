const express = require('express')


const app = express()


app.get('/home', (req, res)=>{
    res.send("Welcome to home page")
})

app.get('/about', (req, res)=>{
    res.send("Welcome to About page")
})


app.listen(3000, () => {
    console.log("Port is running successfully on PORT 3000")
})

