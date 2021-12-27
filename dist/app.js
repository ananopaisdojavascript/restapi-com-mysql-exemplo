"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mysql_1 = __importDefault(require("mysql"));
var body_parser_1 = __importDefault(require("body-parser"));
require('dotenv').config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 8000;
var connection = mysql_1.default.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB
});
connection.connect(function (err) {
    if (err)
        throw err;
    console.log("Até que enfim conectou!!!!!");
});
function createName(request, response) {
    var params = request.body;
    connection.query('INSERT INTO names SET ?', params, function (error, results, fields) {
        if (error)
            throw error;
        response.send(JSON.stringify(results));
    });
}
function findAllNames(request, response) {
    connection.query('SELECT * FROM names', function (error, results, fields) {
        if (error)
            throw error;
        response.send(results);
    });
}
function findOneName(request, response) {
    var id = request.params.id;
    connection.query("SELECT * FROM names WHERE ID = ".concat(id), function (error, results, fields) {
        if (error)
            throw error;
        response.send(JSON.stringify(results));
    });
}
function updateName(request, response) {
    connection.query('UPDATE `names` SET `name` = ?, `group` = ? WHERE ID = ' + request.params.id, [request.body.name, request.body.group, request.params.id], function (error, results, fields) {
        if (error)
            throw error;
        response.send(JSON.stringify(results));
    });
}
function deleteName(request, response) {
    console.log(request.body);
    connection.query('DELETE FROM `names` WHERE `Id`=?', [request.body.id], function (error, results) {
        if (error)
            throw error;
        response.send('Record has been deleted!');
    });
}
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(__dirname + '/dist/projectName'));
app.get('/*', function (request, response) {
    response.sendFile(__dirname + '/dist/projectName/index.html');
});
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
app.listen(PORT, function () {
    console.log("Est\u00E1 funcionando na porta ".concat(PORT));
});
//# sourceMappingURL=app.js.map