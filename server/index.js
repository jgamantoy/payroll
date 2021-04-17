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

app.post('/api/members', (req, res) => {
    console.log(req)
    const name = req.body.name;
    const contact = req.body.contact;
    const address = req.body.address;
    const sqlInsert = "INSERT INTO members (name,contact,address) VALUES (?,?,?)";
    con.query(sqlInsert, [name,contact,address], (err,result) => {console.log(err)})
})