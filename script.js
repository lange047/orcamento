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


// --- CONFIGURAÇÃO DO BANCO DE DADOS (FIREBASE) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Tuas credenciais oficiais geradas pelo Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA4SyNtJWOJ3dBN27-oXCAAkN_j8ckV4EU",
    authDomain: "lange-reparos.firebaseapp.com",
    projectId: "lange-reparos",
    storageBucket: "lange-reparos.appspot.com",
    messagingSenderId: "912772177169",
    appId: "1:912772177169:web:301d5a20322996872a80b0"
};

// Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colecaoFeedbacks = collection(db, "feedbacks");

const containerCards = document.querySelector('.cards-feedbacks');
const formFeedback = document.getElementById('formFeedback');

// --- CARREGAR FEEDBACKS DO BANCO PARA TODOS OS CLIENTES VEREM ---
const q = query(colecaoFeedbacks, orderBy("data", "desc"));
onSnapshot(q, (snapshot) => {
    // Remove os comentários antigos da tela para não duplicar
    const cardsDinamicos = containerCards.querySelectorAll('.card-dinamico');
    cardsDinamicos.forEach(card => card.remove());

    snapshot.forEach((doc) => {
        const fb = doc.data();
        
        const card = document.createElement('div');
        card.className = 'card card-dinamico';
        card.innerHTML = `
            <p class="estrelas">${fb.estrelas}</p>
            <p class="depoimento">"${fb.texto}"</p>
            <h4 class="cliente">${fb.nome}</h4>
        `;
        containerCards.appendChild(card);
    });
});

// --- ENVIAR NOVO FEEDBACK PARA O BANCO DE DADOS ---
formFeedback.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const nomeFeedback = document.getElementById('feedNome').value.trim();
    const starsSelecionadas = document.getElementById('feedEstrelas').value;
    const textoFeedback = document.getElementById('feedTexto').value.trim();

    try {
        // Envia direto para a nuvem global
        await addDoc(colecaoFeedbacks, {
            nome: nomeFeedback,
            estrelas: starsSelecionadas,
            texto: textoFeedback,
            data: new Date()
        });

        formFeedback.reset();
        alert("Obrigado pela tua avaliação! Ela foi publicada e está visível para todos os clientes.");
    } catch (erro) {
        console.error("Erro ao salvar no banco: ", erro);
        alert("Ops, erro ao salvar o teu comentário. Tenta novamente!");
    }
});