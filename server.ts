import express, { Request, Response } from 'express';
import mysql2 from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const connection = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Até que enfim conectou!!!!!");
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(cors());

app.get('/members', (request: Request, response: Response) => {
    const query = 'SELECT * FROM members';
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        response.send(JSON.stringify(results));
    })
})

app.get('/members/:id', (request: Request, response: Response) => {
    const id = request.params.id;
    const query = `SELECT * FROM members WHERE ID = ${id}`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        response.send(JSON.stringify(results));
    })
})

app.post('/members', (request: Request, response: Response) => {
    const params = request.body;
    const query = `INSERT INTO members SET ?  `;
    connection.query(query, params, function (error, results, fields) {
        if (error) throw error;
        response.end(JSON.stringify(results));
    });
})

app.put('/members/:id', (request: Request, response: Response) => {
    const id = request.params.id;
    const query = 'UPDATE `members` SET `name` = ?, `group` = ? WHERE ID = ' + id;
    connection.query(query, [request.body.name, request.body.group, id], function (error, results, fields) {
        if (error) throw error;
        response.end(JSON.stringify(results));
    });
})

app.delete('/members/:id',(request: Request, response: Response) => {
    const id = request.body.id;
    const query = 'DELETE from `members` WHERE `Id` = ?';
    connection.query(query, id, (error, results, fields) => {
        if (error) throw error;
        response.send('Record has been deleted!')
    })
})


app.listen(port, () => console.log(`Está funcionando na porta ${port}!! Uhu!!!`))