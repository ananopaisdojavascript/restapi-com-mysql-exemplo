import express, { Request, Response } from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Até que enfim conectou!!!!!");
});

function createName(request: Request, response: Response) {
    const params = request.body;

    connection.query('INSERT INTO names SET ?', params, (error, results, fields) => {
        if (error) throw error;
        response.send(JSON.stringify(results));
    })
}

function findAllNames(request: Request, response: Response) {
    connection.query('SELECT * FROM names', (error, results, fields) => {
        if (error) throw error;
        response.send(results);
    })
}

function findOneName(request: Request, response: Response) {
    const id = request.params.id;
    connection.query(`SELECT * FROM names WHERE ID = ${id}`, (error, results, fields) => {
        if (error) throw error;
        response.send(JSON.stringify(results));
    });
}

function updateName(request: Request, response: Response) {
    
    connection.query('UPDATE `names` SET `name` = ?, `group` = ? WHERE ID = ' + request.params.id, 
    [request.body.name, request.body.group, request.params.id], (error, results, fields) => {
        if(error) throw error;
        response.send(JSON.stringify(results));
    })
}

function deleteName(request: Request, response: Response) {
    console.log(request.body);
    connection.query('DELETE FROM `names` WHERE `Id`=?',
        [request.body.id], function (error, results) {
            if (error) throw error;
            response.send('Record has been deleted!');
        });
}

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// Rota para registrar nomes
app.post('/names', createName);

// Rota para obter os nomes
app.get('/names', findAllNames);

// Rota para obter nome por id
app.get('/names/:id', findOneName);

// Rota para atualizar nomes
app.put('/names/:id', updateName);

// Rota para apagar nomes
app.delete('/names/:id', deleteName);

// Comando para rodar o servidor
app.listen(PORT, () => {
    console.log(`Está funcionando na porta ${PORT}`);
})