const express = require('express');
const yts = require('yt-search');
const app = express();
const PORT = process.env.PORT || 3000;

// PÁGINA INICIAL COM O GOKU
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GOKU API</title>
            <style>
                body, html { height: 100%; margin: 0; font-family: sans-serif; }
                .bg {
                    background-image: url('https://files.catbox.moe/p9oat6.jpg'); /* Link direto da imagem do Goku */
                    height: 100%; 
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .card {
                    background-color: rgba(0, 0, 0, 0.85);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 15px;
                    border: 2px solid #ff9100;
                    box-shadow: 0 0 20px rgba(255, 145, 0, 0.6);
                    width: 85%;
                    max-width: 320px;
                }
                h1 { margin: 0; color: #ff9100; font-size: 24px; text-transform: uppercase; }
                p { margin: 15px 0 0; font-size: 16px; }
                .status { color: #ffff00; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="bg">
                <div class="card">
                    <h1>GOKU API</h1>
                    <p>Dono: <b>Arthur3837</b></p>
                    <p>Status: <span class="status">ONLINE ⚡</span></p>
                    <p style="font-size: 14px; color: #aaa; margin-top: 10px;">Comandos: /play | /play4</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

// COMANDO PLAY
app.get(['/play', '/play4'], async (req, res) => {
    const query = req.query.nome;
    if (!query) return res.json({ erro: "Diga o nome da música!" });
    try {
        const search = await yts(query);
        const video = search.videos[0];
        if (!video) return res.json({ erro: "Nada encontrado." });
        
        res.json({
            titulo: video.title,
            nome_completo: video.title + " - " + video.author.name,
            duracao: video.timestamp,
            views: video.views,
            thumb: video.image,
            download_audio: `https://api.dreadful-api.site/api/ytdl?url=${video.url}&type=audio`,
            download_video: `https://api.dreadful-api.site/api/ytdl?url=${video.url}&type=video`,
            status: "Sucesso"
        });
    } catch (e) {
        res.json({ erro: "Erro na busca" });
    }
});

app.listen(PORT, () => {
    console.log("Servidor rodando!");
});