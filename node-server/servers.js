const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sql, poolPromise} = require('./db.js')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));


app.get("/", (req, res) => {
    res.send("Backend is working");
  });

  
//get a users
// app.get("/api/users/:id", async(req,res) => {
//     try{
//         const {id} = req.params; 
//         if (isNaN(id)){
//            return res.status(400).json({
//                   success:false,
//                    message:"Invalid id"

//             })
//         }
//         const pool = await poolPromise;
//         const result = 
//         await pool
//         .request()
//         .input("id", sql.Int, id)
//         .query("SELECT * FROM [User] WHERE ID = @ID");
//         console.log(result); 

//         if(result.recordset.length === 0){
//             res.status(400).json({
//                 success:true,
//                 message: "User details not found"
//             });
//         }

//         res.status(200).json({
//             success:true,
//             empData:result.recordset[0]
//         });

//     }
//     catch(error){
//         console.log(`Error`, error); 
//         res.status(500).json({
//             success:false,
//             //empData:result.recordset,
//             empData: [],
//             message:"Server error, try again",
//             error: error.message
//         });
//     }

// });