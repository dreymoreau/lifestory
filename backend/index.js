const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const PORT = 8880

global.db = require('../backend/db');
dotenv.config();


// express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// if there is a auth problem
app.get('/', (req, res) => {
    res.json('hello this is the backend')
})

app.get('/books', (req,res) => {
    const q = 'SELECT * FROM BOOKS'
    db.query(q, (err, data) => {  
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/books', (req,res) => {
    const q = 'INSERT INTO books (`title`, `desc`, `cover`, `date`) VALUES (?)'
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.date
    ]

    db.query(q,[values], (err, data) => {
        if (err) return res.json(err)
        return res.json("book has been created successfully")
    })
})

app.listen(PORT, () => {
    console.log(`connected to backend port ${PORT}!`)
})
