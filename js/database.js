const API_URL = "https://script.google.com/macros/s/AKfycbwsRSV97VjCFCUY3w9lcqO9eVXoPVnjVPryL6qazdJAe2PXrM5k4QPgdzTADHKAzlAQ/exec";

async function salvarResultado(nome, acertos) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify({ nome, acertos })
        });
        console.log("📤 Enviado:", nome, acertos);
        return true;
    } catch (error) {
        console.error("❌ Erro:", error);
        return false;
    }
}