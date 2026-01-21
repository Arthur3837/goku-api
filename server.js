const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ status: "API do Goku YouTube", dono: "Arthur3837" });
});

// Rota para pegar informações de um vídeo
app.get('/video', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.json({ erro: "Mande o link do vídeo!" });

    try {
        const info = await ytdl.getInfo(videoUrl);
        res.json({
            titulo: info.videoDetails.title,
            autor: info.videoDetails.author.name,
            visualizacoes: info.videoDetails.viewCount,
            thumb: info.videoDetails.thumbnails[0].url
        });
    } catch (err) {
        res.json({ erro: "Link inválido ou erro no servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});