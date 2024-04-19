//importamos las librerías que vamos a usar 
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

//para usar y configurar variables de entorno
require("dotenv").config();

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
    connection.connect(); 

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
server.get("/songs", async (req, res) => {
    //nos conectamos a la BD
    const connection = await getDBConnection(); 

    //hacemos las queries; consultamos la base de datos
    const querySongsSQL = "SELECT * FROM song"; 
    const [songsResult] = await connection.query(querySongsSQL); 
    //console.log(songsResult); 

    //cerramos la conexión
    connection.end();

    //envío la respuesta
    res.json({
        info: {count: songsResult.length}, //saber el nº elementos 
        result: songsResult, 
    });
});

//Endpoint para pedir los álbums
server.get("/albums", async (req, res) => {
    //nos conectamos a la BD
    const connection = await getDBConnection(); 

    //hacemos las queries; consultamos la base de datos
    const queryAlbumsSQL = "SELECT * FROM album"; 
    const [albumsResult] = await connection.query(queryAlbumsSQL); 
    //console.log(albumsResult); 

    //cerramos la conexión
    connection.end();

    //envío la respuesta
    res.json({
        info: {count: albumsResult.length}, 
        result: albumsResult, 
    });
});

//Endpoint para obtener una sóla canción a través de su id 
server.get("/songs/:id", async (req, res) => {
    //recogemos el id que nos envía front por url params
    const song_id = req.params.id; 

    //nos conectamos a la base de datos
    const connection = await getDBConnection();

    //hacemos el query a la base datos, que nos muestre la canción que se corresponda con el id que le hemos pasado
    const querySongIdSQL = "SELECT * FROM song WHERE songId = ?"; 
    const [songIdResult] = await connection.query(querySongIdSQL, [song_id]);
    console.log(songIdResult);

    //cerramos la conexión con la base datos
    connection.end(); 

    //devolvemos la respuesta
    //si se introduce un id que no existe, nos devuelve un error
    if(songIdResult.length === 0) {
        res.status(404).json({
            error: "There is no song with that id",
        });
    } else {
        res.status(200).json({
            success: true, 
            result: songIdResult,
        })
    }
});