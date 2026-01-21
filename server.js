const express = require('express');
const yts = require('yt-search');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ 
        status: "Goku API YouTube Online", 
        dono: "Arthur3837",
        comandos: ["/play?nome=", "/play4?nome="] 
    });
});

// Rota para Áudio (/play) e Vídeo (/play4)
app.get(['/play', '/play4'], async (req, res) => {
    const query = req.query.nome;
    if (!query) return res.json({ erro: "Diga o nome da música ou vídeo!" });

    try {
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) return res.json({ erro: "Nada encontrado." });

        // Usando uma API externa de download para garantir que funcione no Render
        const downloadLinkAudio = `https://api.dreadful-api.site/api/ytdl?url=${video.url}&type=audio`;
        const downloadLinkVideo = `https://api.dreadful-api.site/api/ytdl?url=${video.url}&type=video`;

        res.json({
            titulo: video.title,
            nome_completo: `${video.title} - ${video.author.name}`,
            canal: video.author.name,
            duracao: video.timestamp,
            views: video.views,
            thumb: video.image,
            link_original: video.url,
            download_audio: downloadLinkAudio,
            download_video: downloadLinkVideo,
            status: "Sucesso"
        });
    } catch (e) {
        res.json({ erro: "Erro ao processar busca", detalhes: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`API Completa rodando na porta ${PORT}`);
});