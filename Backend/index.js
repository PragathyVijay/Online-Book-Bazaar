const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
app.use(cors())
app.use(express.json())
const db=mysql.createConnection({
    host : '****',
    user: '****',
    password :'****',
    database :'student'
})

app.post('/create',(req,res) => {
    const uname = req.body.uname
    const pass = req.body.pass
    db.query(
        'insert into student.signup (uname, pass) values (?,?)',
         [uname,pass],(err, result)=>{
            if (err){
                 console.log(err)
            }else {
                res.send('Values Inserted')
            }
        }
    )
})

app.post('/login', (req, res) => {
    const uname = req.body.uname;
    const pass = req.body.pass;

    db.query(
        'SELECT * FROM student.signup WHERE uname = ? AND pass = ?',
        [uname, pass],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                if (result.length > 0) {
                    res.status(200).send('Login Successful');
                } else {
                    res.status(401).send('Invalid credentials');
                }
            }
        }
    );
});

app.get('/books', (req, res) => {
    db.query('SELECT bid, bname, bauthor, burl, bprice FROM student.books', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result);
        }
    });
});

app.listen(3001,()=>{
console.log('Backend server is running')
})
