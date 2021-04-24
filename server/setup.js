const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
})
const setUpTables = () => {
  //CREATE TABLES
      //MEMBERS
    con.query(`CREATE TABLE payroll.members (
      id int(255) NOT NULL,
      name varchar(255) NOT NULL,
      contact varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      pay_method varchar(255) NOT NULL)
      ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
      //PROJECTS
    con.query(`CREATE TABLE payroll.projects (
      id int(255) NOT NULL,
      name varchar(255) NOT NULL,
      start_date date NOT NULL,
      end_date date NOT NULL,
      total_cost int(255) NOT NULL,
      member_count int(255) NOT NULL)
      ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
      //TRANSACTIONS
    con.query(`CREATE TABLE payroll.transactions (
      trans_id int(255) NOT NULL,
      member_id int(255) NOT NULL,
      name varchar(255) NOT NULL,
      project_name varchar(255) NOT NULL,
      pay_date varchar(255) NOT NULL,
      pay_amount int(255) NOT NULL,
      status varchar(255) NOT NULL,
      transaction_no varchar(255) NOT NULL) 
      ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
    con.query(`ALTER TABLE payroll.members ADD PRIMARY KEY (id);`)
    con.query(`ALTER TABLE payroll.projects ADD PRIMARY KEY (id);`)
    con.query(`ALTER TABLE payroll.transactions ADD PRIMARY KEY (trans_id);`)
    con.query(`ALTER TABLE payroll.members MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;`)
    con.query(`ALTER TABLE payroll.projects MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;`)
    con.query(`ALTER TABLE payroll.transactions MODIFY trans_id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;`)
}

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query('USE payroll', (err, res) => {
    if (err) {
      con.query("CREATE DATABASE payroll",  (err, result) => {
        if (err) throw err;
        console.log('DATABASE CREATED')
        setUpTables()
      });
    }
    else {
      console.log('DB ALREADY EXISTS')
      setUpTables()
    }
  })

});




