const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json()); 


app.get('/animes', (req, res) => {
    fs.readFile('./anime.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        const animes = JSON.parse(data);
        res.json(animes);
    });
});


app.get('/animes/:id', (req, res) => {
    const animeId = req.params.id;
    fs.readFile('./anime.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        const animes = JSON.parse(data);
        const anime = animes[animeId];
        if (!anime) {
            return res.status(404).json({ error: 'Anime no encontrado' });
        }
        res.json(anime);
    });
});


app.post('/animes', (req, res) => {
    const newAnime = req.body;
    fs.readFile('./anime.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        const animes = JSON.parse(data);
        const newId = Object.keys(animes).length + 1;
        animes[newId] = newAnime;
        fs.writeFile('./anime.json', JSON.stringify(animes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al escribir el archivo' });
            }
            res.status(201).json(newAnime);
        });
    });
});


app.put('/animes/:id', (req, res) => {
    const animeId = req.params.id;
    const updatedAnime = req.body;
    fs.readFile('./anime.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        const animes = JSON.parse(data);
        if (!animes[animeId]) {
            return res.status(404).json({ error: 'Anime no encontrado' });
        }
        animes[animeId] = updatedAnime;
        fs.writeFile('./anime.json', JSON.stringify(animes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al escribir el archivo' });
            }
            res.json(updatedAnime);
        });
    });
});


app.delete('/animes/:id', (req, res) => {
    const animeId = req.params.id;
    fs.readFile('./anime.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        const animes = JSON.parse(data);
        if (!animes[animeId]) {
            return res.status(404).json({ error: 'Anime no encontrado' });
        }
        delete animes[animeId];
        fs.writeFile('./anime.json', JSON.stringify(animes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al escribir el archivo' });
            }
            res.json({ message: 'Anime eliminado' });
        });
    });
});


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
