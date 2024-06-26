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


//ENDPOINTS 
//Endpoint para pedir las canciones
server.get("/songs", async (req, res) => {
    //nos conectamos a la BD
    const connection = await getDBConnection(); 

    //hacemos las queries; consultamos la base de datos
    const querySongsSQL = "SELECT * FROM song"; 
    const [songsResult] = await connection.query(querySongsSQL); 

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


//Endpoint para añadir una canción nueva
server.post("/songs", async(req, res) => {
    //recogemos los datos que nos ha enviado front con la canción nueva
    //destructuring: creamos un objeto nuevo que tenga toda la información que ha enviado front excepto por el nombre del album y una constante albumId que es el id del album al que pertenece que nos lo ha enviado front (la programadora, no la usuaria)
    //const {albumId, ...newSongTableData} = req.body; 
    //destructuring para que quede más limpia la query
    const {song, music_video, writers, album_id} = req.body;
    console.log('Info que recibimos de front:', req.body);
    console.log('Info que meteremos en tabla song:', song, music_video, writers);
    console.log('Album Id, clave foránea:', album_id); //number 


    //nos conectamos a la base datos
    const connection = await getDBConnection();

    if(!album_id) {
        res.status(400).json({
            status: "error", 
            error: "Please introduce the album of the song"
        });
    } else {
        //hacemos la query a la BD, le envíamos los datos de la canción nueva
        const newSongQuerySQL = "INSERT INTO song (songName, musicVideo, writtenBy, fk_albumId) VALUES (?, ?, ?, ?)";
        const [newSongResult] = await connection.query(newSongQuerySQL, [
            song, 
            music_video,
            writers, 
            album_id, //será la clave foránea
        ]);

        //enviamos la respuesta a frontend
        res.status(201).json({
            success: true, 
            id: newSongResult.insertId, 
        })
    }
});


//Endpoint para modificar una canción 
server.put("/songs/:id", async (req, res) => {
    //recogemos el id que nos envía front por url params
    const song_id = req.params.id; 

    //recogemos los datos que nos envía front por body params
    const modifySongData = req.body; 
    const {song, music_video, writers, album_id} = modifySongData;
    
    //abrimos la conexión con la base de datos
    const connection = await getDBConnection();

    //control de errores
    //si el usuario no envía ningún id
    if(!song_id) {
        res.status(400).json({
            status: "error", 
            error: "Please, send the id of the song you will like to see"
        }); 
    } else {
        //si el usuario no envía ningún id para el album
        if (!album_id) {
            res.status(400).json({
                status: "error", 
                error: "Please, send the id of album"
            });
        } else {

            //controlar el error de que el song_id que envía el usuario no existe en la base de datos
            const songIdCheckQuerySQL = "SELECT * FROM song WHERE songId = ?"; 
            const [songIdCheckResult] = await connection.query(songIdCheckQuerySQL, [song_id]);

            //si no encuentra el song_id en la base de datos, nos devolverá un array vacío 
            if(songIdCheckResult.length === 0) {
                res.status(404).json({
                    status: "error", 
                    error: "No song matches that id"
                }); 
            } else {

                const albumIdCheckQuerySQL = "SELECT * FROM song WHERE fk_albumId = ?"; 
                const [albumIdCheckResult] = await connection.query(albumIdCheckQuerySQL, [album_id]);

                if (albumIdCheckResult.length === 0) {
                    res.status(404).json({
                        status: "error", 
                        error: "There is no album with that id, please send one that exists"
                    }); 
                } else {
                    //hacemos la query a la base datos; actualizamos la canción 
                    const modifySongQuerySQL = "UPDATE song SET songName = ?, musicVideo = ?, writtenBy = ?, fk_albumId = ? WHERE songId = ?";
                    const [modifySongResult] = await connection.query(modifySongQuerySQL, [
                        song, 
                        music_video, 
                        writers, 
                        album_id,
                        song_id
                    ]); 

                    //enviamos la respuesta a front
                    res.status(200).json({
                        success: true, 
                    });
                }
            }
        }
    }
})


//Endpoint para eliminar una canción
server.delete("/songs/:id", async (req, res) => {
    //recogemos el id que nos envía front por url params
    const song_id = req.params.id; 

    //nos conectamos a la base de datos
    const connection = await getDBConnection(); 

    //hacer la query a la base de datos; eliminar una canción 
    const deleteSongQuery = "DELETE FROM song WHERE songId = ?";
    const [deleteSongResult] = await connection.query(deleteSongQuery, [song_id]);

    if(deleteSongResult.affectedRows > 0) {
        res.status(200).json({
            success: true, 
            message: "Song deleted", 
        })
    } else {
        res.status(400).json({
            success: false, 
            message: "The song has NOT been deleted"
        })
    }

})