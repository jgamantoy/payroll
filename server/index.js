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
app.post('/api/project', (req, res) => {
    const title = req.body.title;
    const team = req.body.team;
    const checkForTable = "SHOW TABLES LIKE ?"
    con.query(checkForTable, [req.body.title], (err, result) => {
        if (err){
            console.log(err)
        } else {
            // if (result.length === 0){
                const createTable = `CREATE TABLE ${title}(id int, name VARCHAR(255), role VARCHAR(255), pay int)`
                con.query(createTable, (e, r) => {  
                    team.forEach((mem) => {
                        const sqlInsert = `INSERT INTO ${title} (id,name,role,pay) VALUES (?,?,?,?)`
                        con.query(sqlInsert, [mem.id, mem.name, mem.role,  mem.pay])
                    })
                })
            // }

        }
    })
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

