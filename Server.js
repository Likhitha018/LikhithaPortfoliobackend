const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection(process.env.DATABASE_URL)

db.connect((err)=>{
if(err){
console.log("Database connection failed",err)
}else{
console.log("Connected to Railway")
}
})

app.post("/contact",(req,res)=>{

const {name,email,message} = req.body

const sql = "INSERT INTO contact (name,email,message) VALUES (?,?,?)"

db.query(sql,[name,email,message],(err,result)=>{
if(err){
res.status(500).send(err)
}else{
res.send("Message saved successfully")
}
})

})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
console.log("Server running")
})