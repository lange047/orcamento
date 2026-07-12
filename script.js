// --- FUNÇÃO DO PRÉ-ORÇAMENTO (WHATSAPP) ---
document.getElementById('btnEnviar').addEventListener('click', function() {
    const nome = document.getElementById('idNome').value.trim();
    const aparelho = document.getElementById('idAparelho').value.trim();
    const defeito = document.getElementById('idDefeito').value.trim();

    if (nome === "" || aparelho === "" || defeito === "") {
        alert("Por favor, preencha todos os campos antes de enviar!");
        return;
    }

    const numeroTelefone = "5547988516005";
    const textoMensagem = `Olá, me chamo ${nome}!\nGostaria de um orçamento para o meu aparelho: *${aparelho}*.\n\n*Defeito relatado:*\n${defeito}`;
    const mensagemFormatada = encodeURIComponent(textoMensagem);
    const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${mensagemFormatada}`;
    window.open(urlWhatsApp, '_blank');
});


// --- FUNÇÃO DO FEEDBACK DIRETO NO SITE ---
document.getElementById('formFeedback').addEventListener('submit', function(evento) {
    // Impede a página de recarregar sumindo com os dados
    evento.preventDefault();

    // Captura os dados digitados
    const nomeFeedback = document.getElementById('feedNome').value.trim();
    const estrelasSelecionadas = document.getElementById('feedEstrelas').value;
    const textoFeedback = document.getElementById('feedTexto').value.trim();

    // Seleciona a div onde ficam os cards de depoimentos
    const containerCards = document.querySelector('.cards-feedbacks');

    // Cria o elemento do novo card
    const novoCard = document.createElement('div');
    novoCard.className = 'card';

    // Monta a estrutura interna igual aos depoimentos fixos
    novoCard.innerHTML = `
        <p class="estrelas">${estrelasSelecionadas}</p>
        <p class="depoimento">"${textoFeedback}"</p>
        <h4 class="cliente">${nomeFeedback}</h4>
    `;

    // Insere o card na tela
    containerCards.appendChild(novoCard);

    // Reseta o formulário de feedback
    document.getElementById('formFeedback').reset();

    alert("Obrigado pela sua avaliação! Ela já apareceu no site.");
});