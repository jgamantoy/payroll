const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "payroll"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("connected")
})
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3001, () => {
    console.log('server is up');
})

// CREATE --------------------------------------------
app.post('/api/members', (req, res) => {
    console.log(req)
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const sqlInsert = "INSERT INTO members (name,contact,email) VALUES (?,?,?)";
    con.query(sqlInsert, [name,contact,email], (err, result) => {})
})

// READ------------------------------------------------
app.get('/api/members', (req, res) => {
    const sqlRetrieve = "SELECT * FROM members";
    con.query(sqlRetrieve, ( err, result) => {
        res.send(result)
    })
})

// UPDATE ----------------------------------------------
app.put('/api/update/:id', (req, res) => {
    const memberId = req.params.id;
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const sqlUpdate = "UPDATE members SET name = ?, contact = ?, email = ? WHERE id = ? "
    con.query(sqlUpdate, [name, contact, email, memberId], (err, result)=>{})
})

// DELETE ---------------------------------------------
app.delete('/api/delete/:id', (req, res) => {
    const memberId = req.params.id
    const sqlDelete = "DELETE FROM members WHERE id = ?"
    con.query(sqlDelete, [memberId], (err, result) =>{console.log(err)})
})

