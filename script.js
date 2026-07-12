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


// --- FUNÇÃO DO FEEDBACK COM PERSISTÊNCIA E EDIÇÃO ---

const containerCards = document.querySelector('.cards-feedbacks');
const formFeedback = document.getElementById('formFeedback');
const botaoSubmit = formFeedback.querySelector('.btn-feedback');

// Variável para controlar se estamos editando um comentário existente (guarda o ID dele)
let idEdicaoEmAndamento = null;

// Função para gerar um ID único para cada comentário
function gerarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Função auxiliar para criar e injetar o card de feedback na tela HTML
function renderizarCardNaTela(fb) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', fb.id); // Guardamos o ID no HTML para saber qual editar depois

    card.innerHTML = `
        <p class="estrelas">${fb.estrelas}</p>
        <p class="depoimento">"${fb.texto}"</p>
        <h4 class="cliente">${fb.nome}</h4>
        <button class="btn-editar-feedback" onclick="prepararEdicao('${fb.id}')" style="margin-top: 10px; background: none; border: none; color: #6b21a8; cursor: pointer; font-size: 0.9em; font-weight: bold; text-decoration: underline;">
            Editar ✏️
        </button>
    `;
    containerCards.appendChild(card);
}

// Carrega avaliações salvas no navegador quando der F5
function carregarFeedbacksSalvos() {
    const feedbacksSalvos = localStorage.getItem('feedbacksLangeReparos');
    if (feedbacksSalvos) {
        const listaFeedbacks = JSON.parse(feedbacksSalvos);
        listaFeedbacks.forEach(function(fb) {
            renderizarCardNaTela(fb);
        });
    }
}

// Executa ao carregar a página
carregarFeedbacksSalvos();

// Função acionada ao clicar no botão "Editar" de um card
window.prepararEdicao = function(id) {
    const bancoAtual = localStorage.getItem('feedbacksLangeReparos');
    if (!bancoAtual) return;

    const listaFeedbacks = JSON.parse(bancoAtual);
    // Procura o comentário correto na lista usando o ID
    const feedbackParaEditar = listaFeedbacks.find(fb => fb.id === id);

    if (feedbackParaEditar) {
        // Joga os valores de volta nos campos do formulário para o cliente alterar
        document.getElementById('feedNome').value = feedbackParaEditar.nome;
        document.getElementById('feedEstrelas').value = feedbackParaEditar.estrelas;
        document.getElementById('feedTexto').value = feedbackParaEditar.texto;

        // Ativa o modo de edição salvando o ID do registro e mudando o texto do botão
        idEdicaoEmAndamento = id;
        botaoSubmit.textContent = "Salvar Alterações 💾";
        
        // Rola a tela suavemente até o formulário de feedback
        formFeedback.scrollIntoView({ behavior: 'smooth' });
    }
};

// Evento de envio do formulário de Feedback (Criar ou Salvar Alteração)
formFeedback.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nomeFeedback = document.getElementById('feedNome').value.trim();
    const starsSelecionadas = document.getElementById('feedEstrelas').value;
    const textoFeedback = document.getElementById('feedTexto').value.trim();

    const bancoAtual = localStorage.getItem('feedbacksLangeReparos');
    let listaFeedbacks = bancoAtual ? JSON.parse(bancoAtual) : [];

    if (idEdicaoEmAndamento) {
        // --- MODO: SALVAR ALTERAÇÃO EM COMENTÁRIO EXISTENTE ---
        
        // Atualiza os dados dentro do array do LocalStorage
        listaFeedbacks = listaFeedbacks.map(fb => {
            if (fb.id === idEdicaoEmAndamento) {
                return {
                    id: fb.id,
                    nome: nomeFeedback,
                    estrelas: starsSelecionadas,
                    texto: textoFeedback
                };
            }
            return fb;
        });

        localStorage.setItem('feedbacksLangeReparos', JSON.stringify(listaFeedbacks));

        // Atualiza visualmente o card na tela sem precisar dar F5
        const cardNoHtml = containerCards.querySelector(`[data-id="${idEdicaoEmAndamento}"]`);
        if (cardNoHtml) {
            cardNoHtml.querySelector('.estrelas').textContent = starsSelecionadas;
            cardNoHtml.querySelector('.depoimento').textContent = `"${textoFeedback}"`;
            cardNoHtml.querySelector('.cliente').textContent = nomeFeedback;
        }

        alert("Seu comentário foi atualizado com sucesso!");
        
        // Desativa o modo edição voltando o botão ao normal
        idEdicaoEmAndamento = null;
        botaoSubmit.textContent = "Publicar Avaliação";

    } else {
        // --- MODO: CRIAR NOVO COMENTÁRIO ---
        
        const novoFeedback = {
            id: gerarIdUnico(), // Cada novo comentário ganha sua própria identidade única
            nome: nomeFeedback,
            estrelas: starsSelecionadas,
            texto: textoFeedback
        };

        listaFeedbacks.push(novoFeedback);
        localStorage.setItem('feedbacksLangeReparos', JSON.stringify(listaFeedbacks));

        // Renderiza o novo card na tela imediatamente
        renderizarCardNaTela(novoFeedback);

        alert("Obrigado pela sua avaliação! Ela já apareceu no site.");
    }

    // Reseta os campos do formulário limpos
    formFeedback.reset();
});