const express = require('express');
const yts = require('yt-search');
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/play', async (req, res) => {
    const query = req.query.nome;
    if (!query) return res.json({ erro: "Diga o nome da música!" });

    try {
        const search = await yts(query);
        const video = search.videos[0];
        if (!video) return res.json({ erro: "Nada encontrado" });

        // MOTOR DE DOWNLOAD EXTERNO ULTRA RÁPIDO
        const downloadUrl = `https://api.zenkey.my.id/api/download/ytmp3?url=${video.url}&apikey=zenkey`;

        res.json({
            status: "Sucesso",
            titulo: video.title,
            duracao: video.timestamp,
            views: video.views,
            thumb: video.image,
            canal: video.author.name,
            download_audio: downloadUrl
        });
    } catch (e) {
        res.json({ erro: "Erro ao processar busca" });
    }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Servidor Goku-API rodando na porta ${PORT}`));