const express = require('express');
const path       = require('path');
const bcrypt     = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sql, poolPromise} = require('./db.js')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));


app.get("/", (req, res) => {
    res.send("Backend is working");
  });


app.get('/api', (req, res) => {
  res.send('API is working');
});

app.post('/api/register', async (req, res) => {
  const {
    username,
    password,
    first_name,
    middle_name,
    last_name,
    gender,
    body_weight,
    caffeine_limit,
    date_of_birth
  } = req.body;

  try {

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

  
    const pool = await poolPromise;
    await pool.request()
    .input('username',        sql.NVarChar,  username)
    .input('password_hash',   sql.NVarChar,  password_hash)
    .input('salt',            sql.NVarChar,  salt)
    .input('first_name',      sql.NVarChar,  first_name)
    .input('middle_name',     sql.NVarChar,  middle_name || null)
    .input('last_name',       sql.NVarChar,  last_name)
    .input('gender',          sql.Char,      gender)
    .input('body_weight',     sql.Float,     body_weight)
    .input('caffeine_limit',  sql.Int,       caffeine_limit)
    .input('date_of_birth',   sql.DateTime,  date_of_birth)
    .execute('dbo.sp_create_user');

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    // res.status(500).json({ success: false, message: err.message });
  }
});



app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query(`
        SELECT 
          L.password_hash,
          L.salt
        FROM dbo.Login AS L
        INNER JOIN dbo.[User] AS U
          ON U.id = L.user_id
        WHERE U.username = @username
      `);

    if (result.recordset.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    const { password_hash } = result.recordset[0];
    const match = await bcrypt.compare(password, password_hash);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid Password' });
    }

    
    res.json({ success: true, message: 'Logged in successfully' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      // .json({ success: false, message: 'Server error', error: err.message });
  }
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