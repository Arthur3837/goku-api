const express = require('express');
const yts = require('yt-search');
const app = express();
const PORT = process.env.PORT || 3000;

// PÁGINA COM A SUA IMAGEM DE FUNDO
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GOKU API - HOME</title>
            <style>
                body, html {
                    height: 100%;
                    margin: 0;
                    font-family: Arial, sans-serif;
                }
                .bg {
                    /* Sua imagem personalizada */
                    background-image: url('https://i.postimg.cc/85zK2gPr/IMG-20260121-WA0105.jpg');
                    height: 100%; 
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .card {
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 25px;
                    text-align: center;
                    border-radius: 15px;
                    border: 2px solid #fff;
                    box-shadow: 0 0 15px rgba(255,255,255,0.3);
                }
                h1 { margin: 0; color: #ff9100; }
                p { margin: 10px 0 0; font-size: 1.1em; }
            </style>
        </head>
        <body>
            <div class="bg">
                <div class="card">
                    <h1>GOKU API</h1>
                    <p>Dono: Arthur3837</p>
                    <p>Status: ONLINE ⚡</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

// COMANDO PLAY (YOUTUBE)
app.get(['/play', '/play4'], async (req, res) => {
    const query = req.query.nome;
    if (!query) return res.json({ erro: "Diga o nome da música ou vídeo!" });

    try {
        const search = await yts(query);
        const video = search.videos[0];
        if (!video) return res.json({ erro: "Nada encontrado." });

        const downloadLinkAudio = `https://api.dreadful-api.site/api/ytdl?url=${video.url}&type=audio`;
        const downloadLinkVideo = `https://api.dreadful-api.site/api/ytdl?url=${video.url}&type=video`;

        res.json({
            titulo: video.title,
            nome_completo: \`\${video.title} - \${video.author.name}\`,
            duracao: video.timestamp,
            views: video.views,
            thumb: video.image,
            download_audio: downloadLinkAudio,
            download_video: downloadLinkVideo,
            status: "Sucesso"
        });
    } catch (e) {
        res.json({ erro: "Erro ao processar busca" });
    }
});

app.listen(PORT, () => {
    console.log("Servidor rodando!");
});