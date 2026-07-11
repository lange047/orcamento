document.addEventListener("DOMContentLoaded", function() {
    const botao = document.getElementById("btnEnviar");

    botao.addEventListener("click", function() {
        // --- INSIRA SEU NÚMERO AQUI (Apenas números: Código do país + DDD + Número) ---
        const meuNumero = "5547988516005"; 

        // Capturando os inputs do HTML
        const nome = document.getElementById("nome").value.trim();
        const aparelho = document.getElementById("aparelho").value.trim();
        const defeito = document.getElementById("defeito").value.trim();

        // Validação básica para não enviar campos vazios
        if (nome === "" || aparelho === "" || defeito === "") {
            alert("Por favor, preencha todos os campos antes de continuar!");
            return;
        }

      // Procure por esse bloco no seu script.js e mude a última linha:
        const mensagem = `*Solicitação de Pré-Orçamento* 🛠️%0A%0A` +
                 `*Cliente:* ${nome}%0A` +
                 `*Aparelho:* ${aparelho}%0A` +
                 `*Defeito relatado:* ${defeito}%0A%0A` +
                 `_Aguardando o envio das fotos do aparelho para avaliação, caso for possivel!_`; // <- Nova frase aqui!

        // Criando a URL final do link do WhatsApp
        const urlFinal = `https://wa.me/${meuNumero}?text=${mensagem}`;

        // Abre a janela do WhatsApp em uma nova aba
        window.open(urlFinal, "_blank");
    });
});