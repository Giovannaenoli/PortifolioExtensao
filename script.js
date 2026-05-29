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
if (cards.length > 0 && overlay) {
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Coleta as informações personalizadas do Card
            const fullName = card.getAttribute('data-full-name');
            const bioText = card.getAttribute('data-bio');
            const imgEl = card.querySelector('img');
            const imgSrc = imgEl ? imgEl.src : '';

            // Alimenta o Modal
            if (modalName) modalName.textContent = fullName;
            if (modalBio) modalBio.textContent = bioText;
            if (modalImg) modalImg.src = imgSrc;

            // Ativa o Overlay e trava a rolagem do fundo
            overlay.classList.add('active');
            body.classList.add('modal-open');
        });
    });
}

// Função para fechar o modal
function closeModal() {
    if (overlay) {
        overlay.classList.remove('active');
    }
    body.classList.remove('modal-open');
}

// Fecha se clicar no fundo desfocado (fora do conteúdo)
if (overlay) {
    overlay.addEventListener('click', (e) => {
        // Se o alvo do clique for o overlay (fundo) e não o bio-content
        if (e.target === overlay) {
            closeModal();
        }
    });
}

// Fecha se pressionar a tecla 'Esc'
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
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

// --- LÓGICA DO MENU HAMBURGER MOBILE ---
const menuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}