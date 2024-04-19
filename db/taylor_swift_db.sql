CREATE DATABASE taylor_swift_db;
USE taylor_swift_db;

CREATE TABLE song (
	songId int auto_increment primary key,
    songName VARCHAR (100) not null, 
    musicVideo VARCHAR (45),
    writtenBy VARCHAR (100)
);

INSERT INTO song (songName, musicVideo, writtenBy)
VALUES ("Cruel Summer", "no", "Taylor Swift, Jack Antonoff and St. Vincent");

INSERT INTO song (songName, musicVideo, writtenBy)
VALUES ("I Forgot That You Existed", "no", "Taylor Swift, Louis Bell and Frank Dukes");

INSERT INTO song (songName, musicVideo, writtenBy)
VALUES ("Bejeweled", "yes", "Taylor Swift and Jack Antonoff");

INSERT INTO song (songName, musicVideo, writtenBy)
VALUES ("I Did Something Bad", "no", "Taylor Swift, Shellback and Max Martin");


CREATE TABLE album (
	albumId int auto_increment primary key,
    albumName VARCHAR (45) not null, 
    cover LONGTEXT, 
    genre VARCHAR (100),
    releaseDate DATE
);

INSERT INTO album (albumName, cover, genre, releaseDate)
VALUES ("Lover", "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Taylor_Swift_-_Lover.png/220px-Taylor_Swift_-_Lover.png", "Electropop, pop, rock and synth-pop", "2019-08-23");

INSERT INTO album (albumName, cover, genre, releaseDate)
VALUES ("Midnights", "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png", "Synth-pop, electropop, dream pop and bedroom pop", "2022-10-21");

INSERT INTO album (albumName, cover, genre, releaseDate)
VALUES ("Reputation", "https://m.media-amazon.com/images/I/91VnI1TRpxL._UF894,1000_QL80_.jpg", "Electropop, pop and synth-pop", "2017-11-10");

INSERT INTO album (albumName, cover, genre, releaseDate)
VALUES ("1989", "https://pbs.twimg.com/media/F3S1iBPboAA0tXz?format=jpg&name=4096x4096", "Electropop, pop and synth-pop", "2014-10-27");

UPDATE song SET fk_albumId = 1 WHERE songId = 1;
UPDATE song SET fk_albumId = 1 WHERE songId = 2;
UPDATE song SET fk_albumId = 2 WHERE songId = 3;
UPDATE song SET fk_albumId = 3 WHERE songId = 4;

SELECT * FROM song WHERE songId = 2;
