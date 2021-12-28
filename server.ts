import express, { Request, Response } from 'express';
import mysql2 from 'mysql2';
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

app.get('/members', (request: Request, response: Response) => {
    const query = 'SELECT * FROM members';
    connection.query(query, (error, results, fields) => {
        if(error) throw error;
        response.send(JSON.stringify(results));
    })
})

app.listen(port, () => console.log(`Está funcionando na porta ${port}!! Uhu!!!`))