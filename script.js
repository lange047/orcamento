document.getElementById('btnEnviar').addEventListener('click', function() {
    // Captura os valores dos campos do formulário
    const nome = document.getElementById('idNome').value.trim();
    const aparelho = document.getElementById('idAparelho').value.trim();
    const defeito = document.getElementById('idDefeito').value.trim();

    // Validação simples: não deixa enviar se houver campos vazios
    if (nome === "" || aparelho === "" || defeito === "") {
        alert("Por favor, preencha todos os campos antes de enviar!");
        return;
    }

    // Monta a mensagem formatada para o seu WhatsApp
    const numeroTelefone = "5547988516005";
    const textoMensagem = `Olá, me chamo ${nome}!\nGostaria de um orçamento para o meu aparelho: *${aparelho}*.\n\n*Defeito relatado:*\n${defeito}`;
    
    // Codifica o texto para o formato de link do navegador
    const mensagemFormatada = encodeURIComponent(textoMensagem);

    // Cria o link final e redireciona o usuário
    const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${mensagemFormatada}`;
    window.open(urlWhatsApp, '_blank');
});