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
app.post('/api/project/:title', (req, res) => {
    const { team, start_date, end_date, total_cost, member_count } = req.body
    const title = req.params.title
    const newTitle = title.replace(" ", "_")
    const checkForTable = "SELECT * FROM ??"; 
    con.query(checkForTable, [newTitle], (error, result) =>{
        if (error){
            const createTable = `CREATE TABLE ${newTitle} (member_id int, name VARCHAR(255), role VARCHAR(255), pay int, pay_interval VARCHAR(255),PRIMARY KEY (member_id))`
            con.query(createTable, (err, res) => {
                team.forEach((mem) => {
                    console.log(mem)
                    const sqlInsert = `INSERT INTO ${newTitle} (member_id,name,role,pay, pay_interval) VALUES (?,?,?,?,?)`
                    con.query(sqlInsert, [mem.id, mem.name, mem.role, mem.pay, mem.pay_interval])
                })
                const sqlInsert = 'INSERT INTO projects (name,start_date,end_date,total_cost,member_count) VALUE (?,?,?,?,?)'
                con.query(sqlInsert, [title, start_date, end_date, total_cost, member_count])
            })
        }
        if (result) {
            // res.send('TABLE ALREADY EXIST')
        }
    })
    
})

// READ------------------------------------------------

app.get('/api/members', (req, res) => {
    const sqlRetrieve = "SELECT * FROM members";
    con.query(sqlRetrieve, ( err, result) => {
        res.send(result);
    })
})
app.get('/api/members/:project', (req, res) => {
    const project = req.params.project.replace(" ", "_");
    console.log(project)
    const sqlRetrieve = `SELECT * FROM ${project}`;
    con.query(sqlRetrieve, (error, result) => {
        res.send(result)
    })
})
app.get('/api/projects', (req, res) => {
    const sqlRetrieve = "SELECT * FROM projects"
    con.query(sqlRetrieve, ( err, result) => {
        res.send(result);
    }) 
})
app.get('/api/project/:id', (req, res) => {
    const project_id = req.params.id;
    const sqlRetrieve = "SELECT * FROM projects WHERE id = ?";
    con.query(sqlRetrieve, [project_id], (error, result) => {
        res.send(result);
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

