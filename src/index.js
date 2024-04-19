//importamos las librerías que vamos a usar 
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

//creamos el servidor usando librería express
const server = express();

//configuramos el servidor
server.use(cors()); //permita peticiones de fuera
server.use(express.json()); //usar json

//nos conectamos a la base datos
async function getDBConnection() {
    const connection = await mysql.createConnection({
        host: "127.0.0.1", 
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, 
        database: "taylor_swift_db" , 
    });

    //cerramos la conexión 
    connection.connetion(); 

    //devolvemos la conexión 
    return connection;
}

//levantamos la aplicación estableciendo un puerto
const port = process.env.PORT || 5001;
server.listen(port, () => {
    console.log(`Server is listening in port: ${port}`);
});

//IR HACIENDO MUCHOS CONSOLE LOG


//ENDPOINTS 
//Endpoint para pedir las canciones
server.get("/songs", async(req, res) => {
    //nos conectamos a la BD
    const connection = await getDBConnection(); 

    //hacemos las queries; consultamos la base de datos
    const querySQL = "SELECT * FROM song"; 
    const [result] = await connection.query(querySQL); 
    console.log(result)
; 
} )