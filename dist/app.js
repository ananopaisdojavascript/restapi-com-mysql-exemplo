"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
var corsOptions = {
    origin: "http://localhost:3001"
};
// Rota para obter os nomes
app.get('/names', function (request, response) {
    response.json({
        message: "Hey!!!"
    });
});
// Fazer o "parse" das requisições do Content-Type - application/json
app.use(express_1.default.json());
// Fazer o "parse" das requisições do Content-Type - application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
// Rota para obter o nome pelo id
app.get('/names/:id', function (request, response) {
    response.json({
        messsage: "Hello, hello, hello!"
    });
});
// Comando para rodar o servidor
app.listen(port, function () {
    console.log("Está funcionando!!");
});
//# sourceMappingURL=app.js.map