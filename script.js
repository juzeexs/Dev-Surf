// script.js

let livros = [];
let carrinho = [];
let paginaAtual = 'home';
let tema = 'default';
let fonteGrande = false;
let metodoPagamento = 'cartao';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    buscarLivros('popular fiction');
    atualizarContadorCarrinho();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Navegação
function navegarPara(pagina) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pagina).classList.add('active');
    paginaAtual = pagina;
    window.scrollTo(0, 0);
    
    if (pagina === 'catalogo') renderizarLivros(livros, 'livros-catalogo');
    if (pagina === 'carrinho') renderizarCarrinho();
    if (pagina === 'checkout') renderizarCheckout();
}

// Buscar Livros
async function buscarLivros(query) {
    mostrarEsqueletos();
    try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=24`);
        const data = await res.json();
        livros = data.docs?.map(item => ({
            id: `ol-${item.key.replace('/works/', '')}`,
            titulo: item.title || 'Título não disponível',
            autor: item.author_name?.[0] || 'Autor desconhecido',
            preco: parseFloat((Math.random() * 50 + 20).toFixed(2)),
            precoPromocional: parseFloat((Math.random() * 30 + 15).toFixed(2)),
            imagem: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : '',
            descricao: item.first_sentence || 'Descrição não disponível.',
            genero: item.subject?.[0] || 'Geral',
            rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
            idadeRecomendada: Math.floor(Math.random() * 10) + 8
        })).filter(l => l.imagem) || [];
        
        renderizarLivros(livros.slice(0, 8), 'livros-home');
        renderizarLivros(livros, 'livros-catalogo');
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
    }
}

function handleSearch(e) {
    if (e.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        if (query) {
            navegarPara('catalogo');
            buscarLivros(query);
        }
    }
}

// Renderizar
function mostrarEsqueletos() {
    const html = Array(8).fill('<div class="skeleton"></div>').join('');
    document.getElementById('livros-home').innerHTML = html;
    document.getElementById('livros-catalogo').innerHTML = html;
}

function renderizarLivros(lista, containerId) {
    const container = document.getElementById(containerId);
    if (lista.length === 0) {
        container.innerHTML = '<p class="empty-cart">Nenhum livro encontrado</p>';
        return;
    }
    
    container.innerHTML = lista.map(livro => `
        <div class="card" onclick="verDetalhes('${livro.id}')">
            <img src="${livro.imagem}" alt="${livro.titulo}">
            <div class="card-body">
                <h4>${livro.titulo}</h4>
                <p class="card-author">${livro.autor}</p>
                <div class="stars">${renderStars(livro.rating)}</div>
                <div class="price-container">
                    <span class="price-old">R$ ${livro.preco.toFixed(2)}</span>
                    <span class="price-new">R$ ${livro.precoPromocional.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary" onclick="event.stopPropagation(); adicionarCarrinho('${livro.id}')">
                    Adicionar
                </button>
            </div>
        </div>
    `).join('');
}

function verDetalhes(id) {
    const livro = livros.find(l => l.id === id);
    if (!livro) return;
    
    const ageColor = getAgeColor(livro.idadeRecomendada);
    document.getElementById('produto-detalhes').innerHTML = `
        <img src="${livro.imagem}" alt="${livro.titulo}" class="produto-img">
        <div class="produto-info">
            <h1>${livro.titulo}</h1>
            <h3 class="produto-autor">${livro.autor}</h3>
            <div class="stars">${renderStars(livro.rating)}</div>
            <div class="age-badge" style="background: ${ageColor}">
                +${livro.idadeRecomendada}
            </div>
            <div class="produto-preco">R$ ${livro.precoPromocional.toFixed(2)}</div>
            <p class="produto-desc">${livro.descricao}</p>
            <div class="btn-group">
                <button class="btn btn-primary" onclick="adicionarCarrinho('${livro.id}')">
                    🛒 Adicionar ao Carrinho
                </button>
                <button class="btn btn-secondary" onclick="navegarPara('catalogo')">
                    ← Voltar
                </button>
            </div>
        </div>
    `;
    navegarPara('produto');
}

function renderizarCarrinho() {
    const container = document.getElementById('carrinho-items');
    const totalContainer = document.getElementById('carrinho-total');
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p class="empty-cart">Carrinho vazio</p>';
        totalContainer.innerHTML = '';
        return;
    }
    
    const total = carrinho.reduce((acc, item) => acc + item.precoPromocional * item.quantidade, 0);
    
    container.innerHTML = carrinho.map(item => `
        <div class="carrinho-item">
            <img src="${item.imagem}" alt="${item.titulo}">
            <div class="carrinho-item-info">
                <h4>${item.titulo}</h4>
                <p class="carrinho-item-autor">${item.autor}</p>
                <p>R$ ${item.precoPromocional.toFixed(2)} x ${item.quantidade}</p>
            </div>
            <button class="btn-remove" onclick="removerCarrinho('${item.id}')">🗑️</button>
        </div>
    `).join('');
    
    totalContainer.innerHTML = `
        Total: <span class="total-price">R$ ${total.toFixed(2)}</span>
    `;
}

function renderizarCheckout() {
    selecionarPagamento(metodoPagamento);
}

// Carrinho
function adicionarCarrinho(id) {
    const livro = livros.find(l => l.id === id);
    if (!livro) return;
    
    const existe = carrinho.find(i => i.id === id);
    if (existe) {
        existe.quantidade++;
    } else {
        carrinho.push({...livro, quantidade: 1});
    }
    
    atualizarContadorCarrinho();
    mostrarToast('Adicionado!', `${livro.titulo} foi adicionado ao carrinho`);
}

function removerCarrinho(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    atualizarContadorCarrinho();
    renderizarCarrinho();
    mostrarToast('Removido', 'Item removido do carrinho');
}

function atualizarContadorCarrinho() {
    const count = document.getElementById('cart-count');
    if (carrinho.length > 0) {
        count.textContent = `(${carrinho.length})`;
    } else {
        count.textContent = '';
    }
}

// Checkout
function selecionarPagamento(metodo) {
    metodoPagamento = metodo;
    
    document.querySelectorAll('.btn-payment').forEach(btn => {
        btn.classList.remove('active');
    });
    event?.target.classList.add('active');
    
    const container = document.getElementById('payment-form');
    
    if (metodo === 'cartao') {
        container.innerHTML = `
            <input class="input" placeholder="Nome no cartão" />
            <input class="input" placeholder="Número do cartão" />
            <div class="form-row">
                <input class="input" placeholder="Validade" />
                <input class="input" placeholder="CVV" />
            </div>
        `;
    } else if (metodo === 'pix') {
        const total = carrinho.reduce((acc, item) => acc + item.precoPromocional * item.quantidade, 0);
        container.innerHTML = `
            <div class="pix-container">
                <div class="qr-code">QR Code PIX</div>
                <p>Total: R$ ${total.toFixed(2)}</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="pix-container">
                <p>O boleto será gerado após a confirmação do endereço.</p>
            </div>
        `;
    }
}

function finalizarCompra() {
    mostrarToast('Compra Finalizada!', 'Obrigado pela sua compra!');
    carrinho = [];
    atualizarContadorCarrinho();
    navegarPara('home');
}

// UI
function mostrarToast(titulo, mensagem) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-title').textContent = titulo;
    document.getElementById('toast-message').textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
}

function toggleConfig() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
}

function mudarTema(novoTema) {
    document.body.className = novoTema === 'default' ? '' : `${novoTema}-theme`;
    if (fonteGrande) document.body.classList.add('large-font');
    tema = novoTema;
}

function toggleFonte() {
    fonteGrande = !fonteGrande;
    document.body.classList.toggle('large-font');
}

function assinarNewsletter() {
    const input = document.getElementById('newsletter-input');
    const email = input.value.trim();
    if (email && email.includes('@')) {
        mostrarToast('Sucesso!', 'Assinatura realizada com sucesso!');
        input.value = '';
    } else {
        mostrarToast('Erro', 'Digite um e-mail válido');
    }
}

// Helpers
function renderStars(rating) {
    let html = '';
    for (let i = 0; i < 5; i++) {
        html += `<span class="star ${i < Math.floor(rating) ? '' : 'empty'}">★</span>`;
    }
    return html;
}

function getAgeColor(age) {
    if (age < 10) return '#37a70a';
    if (age < 12) return '#a06e00';
    if (age < 14) return '#b22222';
    if (age < 16) return '#8b0000';
    return '#000000';
}

function toggleMenu() {
    const nav = document.getElementById('navContent');
    nav.classList.toggle('active');
}