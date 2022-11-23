import express, { json } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
const db = mysql.createConnection({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

app.get("/" , (req,res) =>{
    res.json("hello this is the backend")
})

app.get("/books", (req, res) =>{
    const q = "SELECT * FROM books"
    db.query(q, (err, data) =>{
       if(err) res.json(err)
      return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q ="INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?)"
    const values = [
    req.body.title,    
    req.body.desc,    
    req.body.price,    
    req.body.cover,    
    ]
    db.query(q, [values], (err,data) =>{
        if(err) res.json(err)
        return res.json("Book has been created succesfully")
    })
})

app.delete("/books/:id" ,(req, res) =>{
    const bookId = req.params.id 
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if(err) res.json(err)
        return res.json("Books has been delate succesfully.")
     })
})
app.put("/books/:id" ,(req, res) =>{
    const bookId = req.params.id 
    const q = "UPDATE books SET `title`=?, `desc`=?, `price`=?, `cover`= ? WHERE id = ?"
    const values = [
        req.body.title,    
        req.body.desc,    
        req.body.price,    
        req.body.cover, 
    ]
    db.query(q, [ ...values,bookId], (err, data) => {
        if(err) res.json(err)
        return res.json("Books has been update succesfully.")
     })
})

app.listen(8800, () =>{
    console.log("Connected to backend")
})