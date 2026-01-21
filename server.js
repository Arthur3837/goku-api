const axios = require('axios');

module.exports = {
    nome: ['play', 'play4', 'video', 'musica'],
    async executar(sock, from, msg, args) {
        const query = args.join(" ");
        if (!query) return sock.sendMessage(from, { text: "⚠️ Digite o nome da música!" });

        const texto = (msg.message.conversation || msg.message.extendedTextMessage?.text || "").toLowerCase();
        const ehVideo = texto.startsWith('/play4') || texto.startsWith('/video');

        try {
            const apiUrl = `https://drunk-loutitia-apigoku-de17d414.koyeb.app/play?nome=${encodeURIComponent(query)}`;
            
            // Aumentamos o tempo de espera para 60 segundos (timeout)
            const response = await axios.get(apiUrl, { timeout: 60000 });
            const data = response.data;

            if (data.erro) return sock.sendMessage(from, { text: "❌ Erro na API." });

            const legenda = `✨ *GOKU-API* ✨\n\n📝 *Títulos:* ${data.titulo}\n⏳ *Enviando arquivo...*`;

            await sock.sendMessage(from, { image: { url: data.thumb }, caption: legenda }, { quoted: msg });

            if (ehVideo) {
                await sock.sendMessage(from, { 
                    video: { url: data.download_video }, 
                    mimetype: 'video/mp4',
                    fileName: `${data.titulo}.mp4`
                }, { quoted: msg });
            } else {
                await sock.sendMessage(from, { 
                    audio: { url: data.download_audio }, 
                    mimetype: 'audio/mp4',
                    ptt: false, // Envia como música, não como gravador
                    fileName: `${data.titulo}.mp3`
                }, { quoted: msg });
            }

        } catch (e) {
            console.log(e);
            await sock.sendMessage(from, { text: "❌ Erro ao baixar o arquivo. Tente outra música!" });
        }
    }
};