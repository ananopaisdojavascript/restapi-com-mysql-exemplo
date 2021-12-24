import express, { Request, Response } from 'express';
import mysql from 'mysql';
const app = express();
const port = process.env.PORT || 3000;

app.get('/kgirls', (request: Request, response: Response) => {
    response.send("Olha quem apareceu!!!")
})

app.get('/kgirls/:id', (request: Request, response: Response) => {
    const id = request.params.id;
    response.send("Olha quem apareceu também!!! " + id);
})

app.listen(port, () => {
    console.log("Está funcionando!")
})