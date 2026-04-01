// --- FUNÇÃO DO RELÓGIO (MANTIDA) ---
function updateClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.textContent = new Intl.DateTimeFormat('pt-BR', options).format(now) + " BRT";
    }
}
setInterval(updateClock, 1000);
updateClock();

// --- MOVIMENTO PARALLAX DO RODAPÉ (MANTIDO) ---
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const giantText = document.querySelector('.giant-brand-bg');
    if(giantText) {
        giantText.style.transform = `translateX(${moveX}px)`;
}
});

// --- NOVA LÓGICA DA JANELA INTERATIVA (CLIQUE + FECHAMENTO INTELIGENTE) ---
const cards = document.querySelectorAll('.team-card');
const overlay = document.getElementById('bio-overlay');
const modalName = document.getElementById('modal-name');
const modalBio = document.getElementById('modal-bio');
const modalImg = document.getElementById('modal-img');
const body = document.body;

// Função para abrir o modal
cards.forEach(card => {
    // Mudado de 'mouseenter' para 'click'
    card.addEventListener('click', () => {
        // Coleta as informações personalizadas do Card
        const fullName = card.getAttribute('data-full-name');
        const bioText = card.getAttribute('data-bio');
        const imgSrc = card.querySelector('img').src;

        // Alimenta o Modal
        modalName.textContent = fullName;
        modalBio.textContent = bioText;
        modalImg.src = imgSrc;

        // Ativa o Overlay e trava a rolagem do fundo
        overlay.classList.add('active');
        body.classList.add('modal-open');
    });
});

// Função para fechar o modal
function closeModal() {
    overlay.classList.remove('active');
    body.classList.remove('modal-open');
}

// Fecha se clicar no fundo desfocado (fora do conteúdo)
overlay.addEventListener('click', (e) => {
    // Se o alvo do clique for o overlay (fundo) e não o bio-content
    if (e.target === overlay) {
        closeModal();
    }
});

// Fecha se pressionar a tecla 'Esc'
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
    }
});
;

// --- EFEITO MAGNÉTICO Z NO TÍTULO PRINCIPAL (MÓDULO SÊNIOR) ---
const magneticText = document.querySelector('.magnetic-text');

if (magneticText) {
    magneticText.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = magneticText;
        const { offsetX: x, offsetY: y } = e;

        // Calcula a inclinação com base na posição do mouse (máximo 10 graus)
        const moveX = (x / width - 0.5) * 20;
        const moveY = (y / height - 0.5) * 20;

        // Aplica a transformação 3D
        magneticText.style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg) scale(1.02)`;
    });

    magneticText.addEventListener('mouseleave', () => {
        // Reseta a transformação quando o mouse sai
        magneticText.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
}