import express, { Request, Response } from 'express';
import mysql from 'mysql';
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("Até que enfim conectou!!!!!");
});


// Registrar nomes
function createName(request: Request, response: Response) {
    const params = request.body;

    connection.query('INSERT INTO members SET ?', params, (error, results, fields) => {
        if (error) throw error;
        response.send(JSON.stringify(results));
    })
}

// Obter nomes
function findAllNames(request: Request, response: Response) {
    connection.query('SELECT * FROM members', (error, results, fields) => {
        if (error) throw error;
        response.send(results);
    })
}

// Obter nome pelo id
function findOneName(request: Request, response: Response) {
    const id = request.params.id;
    connection.query(`SELECT * FROM members WHERE ID = ${id}`, (error, results, fields) => {
        if (error) throw error;
        response.send(JSON.stringify(results));
    });
}

// Atualizar um nome
function updateName(request: Request, response: Response) {
    
    connection.query('UPDATE `members` SET `name` = ?, `group` = ? WHERE ID = ' + request.params.id, 
    [request.body.name, request.body.group, request.params.id], (error, results, fields) => {
        if(error) throw error;
        response.send(JSON.stringify(results));
    })
}

// Eliminar um nome
function deleteName(request: Request, response: Response) {
    console.log(request.body);
    connection.query('DELETE FROM `members` WHERE `Id`=?',
        [request.body.id], function (error, results) {
            if (error) throw error;
            response.send('Record has been deleted!');
        });
}

// Rota para registrar nomes
app.post('/members', createName);

// Rota para obter os nomes
app.get('/members', findAllNames);

// Rota para obter nome por id
app.get('/members/:id', findOneName);

// Rota para atualizar nomes
app.put('/members/:id', updateName);

// Rota para apagar nomes
app.delete('/members/:id', deleteName);


app.listen(port, () => console.log(`Está funcionando na porta ${port}!! Uhu!!!`))