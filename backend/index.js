const express = require('express')
const cors = require('cors')
const multer = require('multer')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const PORT = 8880

global.db = require('../backend/db');
dotenv.config();


// express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use('/', express.static(path.join(__dirname, '/')));

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

app.get('/api/image', (req,res) => {

    const id = 1
    const sqlInsert = "SELECT * FROM images WHERE id = ?;"
    connection.query(sqlInsert, [id] , (err, result) => {
        if(err) {
            console.log(err)
            res.send({
                msg: err
            })
        }
        if(result) {
            res.send({
                image: result[0].image
            })
        }
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

app.post('/api/image', upload.single('image'), (req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'});
    } else {
        const image = req.file.filename;
        const id = 1
        const sqlInsert = "UPDATE images SET `image` = ? WHERE id = ?;"
        connection.query(sqlInsert, [image, id] , (err, result) => {
            if(err) {
                console.log(err)
                res.send({
                    msg: err
                })
            }
            if(result) {
                res.send({
                    data: result,
                    msg: 'Your image has been updated'
                })
            }
    })
    }
})

app.delete('/books/:id', (req, res)=> {
    const bookId = req.params.id;
    const q = 'DELETE FROM books WHERE id = ?'

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("book has been deleted successfully")
    })
})

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './');},
        filename: function(req,file,cb){
            const ext = file.mimetype.split('/')[1]
            cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
        }
})
const upload = multer({
    storage: storage
})
app.listen(PORT, () => {
    console.log(`connected to backend port ${PORT}!`)
})
