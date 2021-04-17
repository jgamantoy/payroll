const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "payroll",
})

con.connect(function(err) {
    if (err) throw err;
    console.log("connected")
})
app.use(cors())


app.listen(3001, () => {
    console.log('server is up');
})

app.get('/api/test', (req, res)=> {
    res.send([{
        name: 'Jose',
        age: 23,
    }, {
        name: 'Dude',
        age: 33,
    }])
})