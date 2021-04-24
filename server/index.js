const express = require('express');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const moment = require('moment')

const app = express();
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "payroll"
})

const calcPayDates = (startDate, endDate, interval) => {
    let paydays = []
    let dayOne = moment(startDate).format("YYYY-MM-DD");
    let dayTwo = moment(endDate).format("YYYY-MM-DD")

    while(moment(dayOne).isBefore(dayTwo)){
        dayOne = moment(dayOne).add(1, interval)
        paydays.push(moment(dayOne).format("YYYY-MM-DD"))
        // THIS CREATES AN ARRAY OF ALL THE PAY DAYS
    }
    return paydays
}

//---------------------------------------------------------------------------------

con.connect(function(err) {
    if (err) throw err;
    console.log("connected")
})
app.use(cors());
app.use(express.json())
app.use(fileupload())
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3001, () => {
    console.log('server is up');
})

// CREATE --------------------------------------------

app.post('/api/members', (req, res) => {
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const payMethod = req.body.payMethod
    const sqlInsert = "INSERT INTO members (name,contact,email, pay_method) VALUES (?,?,?,?)";
    con.query(sqlInsert, [name,contact,email,payMethod], (err, result) => {})
})
app.post('/api/project/:title', (req, res) => {
    const { team, start_date, end_date, total_cost, member_count } = req.body
    const title = req.params.title
    const newTitle = title.split(' ').join('_')
    const checkForTable = "SELECT * FROM ??"; 
    
    con.query(checkForTable, [newTitle], (error, result) =>{
        if (error){
            const createTable = `CREATE TABLE ${newTitle} (member_id int, name VARCHAR(255), role VARCHAR(255), pay int, pay_interval VARCHAR(255),PRIMARY KEY (member_id))`
            con.query(createTable, (err, res) => {
                team.forEach((mem) => {
                    console.log(mem)
                    const paydays = calcPayDates(start_date, end_date, mem.pay_interval);
                    console.log(paydays)
                    const sqlInsert = `INSERT INTO ${newTitle} (member_id,name,role,pay, pay_interval) VALUES (?,?,?,?,?)`
                    con.query(sqlInsert, [mem.id, mem.name, mem.role, mem.pay, mem.pay_interval])
                    paydays.forEach((day) => {
                        console.log(day)
                        const payAmount = mem.pay / paydays.length
                        const sqlInsertPay = 'INSERT INTO transactions (member_id, name, project_name, pay_date, pay_amount, status, transaction_no) VALUES (?,?,?,?,?,?,?)'
                        con.query(sqlInsertPay, [mem.id, mem.name, title, day, payAmount.toFixed(2), 'unpayed', '-'], (err, res) => {
                            if (err) {
                                console.log(`trans er ${err}`)
                            }
                        })
                    })
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
    const project = req.params.project.split(' ').join('_')
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
app.get('/api/transactions', (req, res) => {
    const sqlRetrieve = "SELECT * FROM transactions";
    con.query(sqlRetrieve, (error, result) => {
        res.send(result);
    })
})
// UPDATE ----------------------------------------------
app.put('/api/update/:id', (req, res) => {
    const memberId = req.params.id;
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const pay_method = req.body.payMethod;
    const sqlUpdate = "UPDATE members SET name = ?, contact = ?, email = ? , pay_method = ? WHERE id = ? "
    con.query(sqlUpdate, [name, contact, email, pay_method, memberId], (err, result)=>{})
})
app.put('/api/update/transactions/:id', (req, res) => {
    const transID = req.params.id
    console.log(transID)
    const transCode = req.body.transCode;
    const sqlUpdate = "UPDATE transactions SET status = ?, transaction_no = ? WHERE trans_id = ?";
    con.query(sqlUpdate, ['payed',transCode, transID] , (err, result) => {
        if (err){            
            console.log(err)
        } 
        if (result) {
            console.log(result)
        }


    })
})
// DELETE ---------------------------------------------
app.delete('/api/delete/:id', (req, res) => {
    const memberId = req.params.id
    const sqlDelete = "DELETE FROM members WHERE id = ?"
    con.query(sqlDelete, [memberId], (err, result) =>{console.log(err)})
})

