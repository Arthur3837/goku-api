const express = require('express');
const yts = require('yt-search');
const axios = require('axios');
const app = express();

// O Koyeb usa a porta 8080 por padrão
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("GOKU-API ONLINE NO KOYEB! 🚀");
});

app.get('/play', async (req, res) => {
    const query = req.query.nome;
    if (!query) return res.json({ erro: "Diga o nome da música!" });

    try {
        const search = await yts(query);
        const video = search.videos[0];
        if (!video) return res.json({ erro: "Nada encontrado." });

        const urlYt = video.url;

        // Enviando os dados para o seu Bot
        res.json({
            titulo: video.title,
            nome_completo: video.title + " - " + video.author.name,
            duracao: video.timestamp,
            views: video.views,
            thumb: video.image,
            // Motor principal e backup
            download_audio: `https://api.dreadful-api.site/api/ytdl?url=${urlYt}&type=audio`,
            download_video: `https://api.dreadful-api.site/api/ytdl?url=${urlYt}&type=video`,
            status: "Sucesso"
        });
    } catch (e) {
        res.json({ erro: "Erro ao processar busca" });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});