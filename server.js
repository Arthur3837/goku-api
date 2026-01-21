const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ 
        status: "API do Goku Online!", 
        dono: "Arthur3837",
        mensagem: "Se você está vendo isso, sua API no Render funcionou!" 
    });
});

app.get('/status', (req, res) => {
    res.json({ online: true, servidor: "Render" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});