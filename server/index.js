const express = require ('express');
const cors = require ("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());



const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "kay"
});


// app.post("/api/insert",(req,res)=>{
//   const Username=req.body.Username
//   const Password = req.body.Password
//   const sqlInsert = "INSERT INTO kain (Username,Password) VALUES (?,?)"
//   db.query(sqlInsert,[Username,Password],(err,result)=>{
//       console.log(result)
//   });
// });


app.post('/signup',(req,res)=>{
  const sql = "INSERT INTO dev (`name`, `email`,`password`) VALUES (?)"
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ]
  db.query(sql, [values],(err,result)=>{
    if(err) {
      console.log(err)
    }
    return res.json(result);    
  });
});



app.post('/login', (req,res)=>{
    const sql = "SELECT * FROM dev WHERE `email` = ? AND `password` = ?";
    const email = req.body.email
    const password = req.body.password
    db.query(sql, [email,password], (err,result)=>{
      if(err){
        console.log(err)
      }
      if(result.length > 0){
          return res.json("success");
      }else{
        return res.json("failed");
      }
    })
})


app.get ("/home", (req,res) =>{
   res.send("Tell me something that i dont know")
});


app.listen ("3005", (req,res)=> {
  console.log("listening on port 3005");
})