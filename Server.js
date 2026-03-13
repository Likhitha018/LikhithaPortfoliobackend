const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// MySQL connection
const db = mysql.createConnection(
"mysql://root:qrQEJvFvJvVXVUiMsgEfZFJLGuMdeOyx@yamabiko.proxy.rlwy.net:32643/railway"
)

db.connect((err)=>{
if(err){
console.log("Database connection failed",err)
}
else{
console.log("Connected to Railway")
}
})

// API to save contact form
app.post("/contact",(req,res)=>{

const {name,email,message} = req.body

const sql = "INSERT INTO contacts (name,email,message) VALUES (?,?,?)"

db.query(sql,[name,email,message],(err,result)=>{
if(err){
res.status(500).send(err)
}else{
res.send("Message saved successfully")
}
})

})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})