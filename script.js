const PRODUCTS = {
  1:  { brand:"QUIKSILVER",  name:"Camiseta Comp Logo (Branca)",          price:129.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/402169/Camiseta-Quiksilver-M-C-Comp-Logo-Branco-Branco-P.jpg?v=639015714281370000", description:"Camiseta com estampa frontal, confeccionada em malha 100% algodão.", tags:["camiseta","branca","algodão","básica"] },
  2:  { brand:"HURLEY",      name:"Bermuda Phantom Marinho",              price:299.90, oldPrice:359.90, image:"https://hurley.com.br/cdn/shop/files/HYBM010356_MARINHO_02_2.jpg?v=1757339899", description:"Bermuda de alta performance com secagem rápida, ideal para surf e lazer.", tags:["bermuda","surf","marinho","performance"] },
  3:  { brand:"QUIKSILVER",  name:"Boné Quiksilver Gradient New Wave",    price:349.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/347746/85008d.jpg?v=638944968222730000", description:"Boné fechado e elegante para uso confortável no dia a dia.", tags:["boné","acessório","gradiente"] },
  4:  { brand:"QUIKSILVER",  name:"Moletom Quiksilver Block Company",     price:449.90, image:"https://imgcentauro-a.akamaihd.net/1300x1300/M0Y5VE02A2.jpg", description:"Moletom confortável e versátil que não pode faltar no guarda-roupa.", tags:["moletom","inverno","conforto"] },
  5:  { brand:"OAKLEY",      name:"Óculos Oakley Radar EV",               price:899.90, image:"https://a-static.mlcdn.com.br/420x420/oculos-de-sol-oakley-radar-ev-path-prizm-plr/netshoes/pfn-9105-244-01/43a930de200b5ed7a16107fae190fb56.jpeg", description:"O mais famoso óculos Radar EV  excelente opção para você!", tags:["óculos","sol","esporte","premium"] },
  6:  { brand:"HURLEY",      name:"Boné Hurley Aba Curva Over Icon",      price:269.90, image:"https://cdn.awsli.com.br/287/287385/produto/182077670/0-hyac010185_01-i8vsmxjfbqhhkx3_1600x2000-6cf6398e74.jpg", description:"Boné clássico com aba curva e logo bordado frontal.", tags:["boné","clássico","aba curva"] },
  7:  { brand:"QUIKSILVER",  name:"Bermuda Boardshort Swell Marinho",     price:254.90, oldPrice:299.90, image:"https://images.tcdn.com.br/img/img_prod/1111144/arrumar_bermuda_quiksilver_boardshort_swell_marinho_masculina_2475_1_76fcad96fd0a273722ed7f1a80f7794f.jpg", description:"Bermuda híbrida versátil para uso aquático e terrestre.", tags:["bermuda","boardshort","surf","marinho"] },
  8:  { brand:"VOLCOM",      name:"Camiseta Crisp Stone",                 price:169.90, image:"https://volcom.com.br/cdn/shop/files/VLTS01044301.00_02_2.jpg?v=1731935287", description:"Camiseta básica com estampa do logo icônico Volcom Stone.", tags:["camiseta","básica","logo"] },
  9:  { brand:"FREESURF",    name:"Baby Look Moving Feminina",            price:139.90, image:"https://s.freesurf.com.br/product/2025/08/baby-look-moving-feminina-freesurf-squard.jpg", description:"Baby look feminina com modelagem ajustada e estampa exclusiva.", tags:["baby look","feminina","ajustada"] },
  10: { brand:"RIP CURL",    name:"Camiseta Icon Branca",                 price:159.90, image:"https://021club.com.br/wp-content/uploads/2023/11/15234363617_camiseta20rip20curl20icon20filter20tee200141mte.jpg", description:"Camiseta branca com logo clássico Rip Curl no peito.", tags:["camiseta","branca","clássica"] },
  11: { brand:"VANS",        name:"Boné Classic Patch Trucker",           price:149.90, image:"https://d1yskurxmiki17.cloudfront.net/Custom/Content/Products/56/04/560466_bone-classic-patch-trucker-vans-vn000h2vyb2-398-88_m5_638812231158990773.webp", description:"Boné trucker com patch clássico da Vans e telinha traseira.", tags:["boné","trucker","patch","vans"] },
  12: { brand:"O'NEILL",     name:"Bermuda Hyperfreak Hydro",             price:209.90, oldPrice:279.90, image:"https://m.media-amazon.com/images/I/71kgYhvf--L._AC_SR736,920_.jpg", description:"Bermuda premium com tecnologia Hyperfreak para máxima flexibilidade.", tags:["bermuda","tecnologia","leve","surf"] },
  13: { brand:"BILLABONG",   name:"Camiseta All Day Wave",                price:149.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/362547/B471A0762_02.00_101.jpg?v=638960511312970000", description:"Camiseta com estampa de onda, perfeita para o dia a dia.", tags:["camiseta","surf","wave","algodão"] },
  14: { brand:"QUIKSILVER",  name:"Mochila Esportiva H02",                price:229.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/410986/Mochila-Quiksilver-Esportiva-Quiksilver-H02-Preto-Preto-U.jpg?v=639051152736400000", description:"Mochila esportiva com múltiplos compartimentos e alças acolchoadas.", tags:["mochila","esportiva","preta","compartimentos"] },
  15: { brand:"HURLEY",      name:"Regata Silk Icon Branca",              price:119.90, image:"https://a-static.mlcdn.com.br/800x800/regata-hurley-icon-masculina/netshoes/d71-3290-014-05/5b8721b686c7069e912e8d917a167a67.jpeg", description:"Regata leve e confortável com estampa em silk screen.", tags:["regata","branca","leve","silk"] },
  16: { brand:"VOLCON",      name:"Bermuda Lido Solid 20\"",              price:188.90, oldPrice:269.90, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf6tnM-cnZtiVBNhOaSycwcxruCAd1tBySXws6KFMRk1o4O5Qkmxi4tc8&s=10", description:"Bermuda clássica de 20 polegadas com bolsos funcionais.", tags:["bermuda","clássica","bolsos"] },
  17: { brand:"OAKLEY",      name:"Camiseta Bark New",                    price:179.90, image:"https://static.allianzparqueshop.com.br/produtos/camiseta-oakley-bark-new-tee-masculina/92/D63-4589-192/D63-4589-192_zoom1.jpg?ts=1764065719", description:"Camiseta premium Oakley com estampa moderna e acabamento diferenciado.", tags:["camiseta","premium","moderna","oakley"] },
  18: { brand:"QUIKSILVER",  name:"Boné Quiksilver Diamond",              price:279.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/347762/Q911A0316.RED.jpg?v=638944969642270000", description:"Boné clássico Quiksilver com aba curva e logo brilhante.", tags:["boné","clássico","diamond","aba curva"] },
  19: { brand:"RVCA",        name:"Camiseta Big Logo",                    price:159.90, image:"https://soulfightshop.com.br/wp-content/uploads/2024/06/15277261917_2055638_camiseta-m-c-rvca-city-r471a0430_z5_638442282067911808.jpg", description:"Camiseta statement com logo RVCA em destaque no peito.", tags:["camiseta","logo","rvca"] },
  20: { brand:"QUIKSILVER",  name:"Bermuda Quiksilver Everyday",          price:207.90, oldPrice:259.90, image:"https://tfdbtd.vtexassets.com/arquivos/ids/249793/bermuda-agua-quiksilver-everyday-spray-q491a0431%20-2-.jpg?v=638998557296370000", description:"Bermuda de surf de alta performance com tecnologia de secagem rápida.", tags:["bermuda","surf","performance"] },
  21: { brand:"RIP CURL",    name:"Camiseta Wetty Chest",                 price:169.90, image:"https://images.tcdn.com.br/img/img_prod/481988/camiseta_rip_curl_icon_corp_tee_washed_preto_cte1343_3765_variacao_12809_1_696188f0ee5613c8a5d299fc6c5279f0.jpg", description:"Camiseta inspirada no surf com estampa Wetty no peito.", tags:["camiseta","surf","wetty"] },
  22: { brand:"BILLABONG",   name:"Boné Trucker All Day",                 price:129.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/348464/Bone-Billabong-Essential-Cinza-U.jpg?v=638945206191700000", description:"Boné trucker versátil com logo Billabong e telinha respirável.", tags:["boné","trucker","billabong"] },
  23: { brand:"HURLEY",      name:"Bermuda Phantom Block Party",          price:239.90, image:"https://hurley.com.br/cdn/shop/files/boardshorts-phantom-hurley-preto-18-eco-block-party-1.jpg?v=1745592758", description:"Bermuda Phantom com estampa exclusiva Block Party e stretch 4 vias.", tags:["bermuda","phantom","surf"] },
  24: { brand:"O'NEILL",     name:"Camiseta Circle Surfer",               price:135.90, oldPrice:159.90, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1gQDjFrr5HJ4nNkohtFWFF9DnHzUCOU0k4qQKt6yv58DIV2qAIgUI6eY&s=10", description:"Camiseta com estampa Circle Surfer icônica da O'Neill.", tags:["camiseta","oneill","surf"] },
  25: { brand:"VANS",        name:"Camiseta Classic Logo",                price:149.90, image:"https://imgcentauro-a.akamaihd.net/768x768/97731402.jpg", description:"Camiseta básica Vans com logo clássico estampado no peito.", tags:["camiseta","vans","básica"] }
};

// ─── ESTADO GLOBAL ──────────────────────────────────────────────────────────
let cart = [];
let currentOrder = null;

// ─── UTILIDADES ─────────────────────────────────────────────────────────────
const fmt = (n) => n.toFixed(2).replace('.', ',');
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ─── RENDERIZAR PRODUTOS ────────────────────────────────────────────────────
function renderProducts() {
  const grid = $('#productsGrid');
  if (!grid) return;
  
  grid.innerHTML = Object.entries(PRODUCTS).map(([id, product]) => {
    const badge = product.oldPrice ? 
      `<span class="product-badge sale">-${Math.round((1 - product.price/product.oldPrice) * 100)}%</span>` :
      (parseInt(id) <= 5 ? '<span class="product-badge new">Novo</span>' : '');
    
    const oldPriceHtml = product.oldPrice ? 
      `<span class="price-old">R$ ${fmt(product.oldPrice)}</span>` : '';
    
    const installments = Math.min(Math.floor(product.price / 50), 12);
    const installmentValue = product.price / installments;
    
    return `
      <div class="product-card ${product.oldPrice ? 'sale-card' : ''}" data-product-id="${id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          ${badge}
        </div>
        <div class="product-info">
          <span class="product-brand">${product.brand}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-pricing">
            <div class="product-price">
              ${oldPriceHtml}
              <span class="price-current">R$ ${fmt(product.price)}</span>
            </div>
            <p class="price-installment">ou ${installments}x de R$ ${fmt(installmentValue)} sem juros</p>
          </div>
          <button class="add-to-cart-btn" data-id="${id}">
            Adicionar
          </button>
        </div>
      </div>
    `;
  }).join('');
  
  // IMPORTANTE: Rebind dos event listeners após renderizar
  bindProductCards();
}

// ─── ADICIONAR AO CARRINHO ──────────────────────────────────────────────────
function addToCart(productId) {
  const id = parseInt(productId);
  const product = PRODUCTS[id];
  
  if (!product) {
    console.error('Produto não encontrado:', id);
    return;
  }
  
  const existing = cart.find(item => item.id === id);
  
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, ...product, qty: 1 });
  }
  
  updateCartCount();
  showToast(`${product.name} adicionado ao carrinho!`);
  
  // Salvar no localStorage
  localStorage.setItem('devsurf_cart', JSON.stringify(cart));
}

// ─── ATUALIZAR CONTADOR DO CARRINHO ─────────────────────────────────────────
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = $('#cartCount');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ─── TOAST NOTIFICATION ─────────────────────────────────────────────────────
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'devsurf-toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── BIND PRODUCT CARDS ─────────────────────────────────────────────────────
function bindProductCards() {
  // Remove listeners antigos para evitar duplicação
  const oldBtns = $$('.add-to-cart-btn');
  oldBtns.forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });
  
  // Adiciona novos listeners
  $$('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId = btn.getAttribute('data-id');
      if (productId) {
        addToCart(productId);
      }
    });
  });
}

// ─── RENDERIZAR CARRINHO ────────────────────────────────────────────────────
function cartRender() {
  const itemsEl = $('#cartItems');
  const emptyEl = $('#cartEmpty');
  const footerEl = $('#cartFooter');
  
  if (!itemsEl || !emptyEl || !footerEl) return;
  
  if (cart.length === 0) {
    emptyEl.style.display = 'block';
    itemsEl.style.display = 'none';
    footerEl.style.display = 'none';
    return;
  }
  
  emptyEl.style.display = 'none';
  itemsEl.style.display = 'block';
  footerEl.style.display = 'block';
  
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-brand">${item.brand}</p>
        <p class="cart-item-price">R$ ${fmt(item.price)}</p>
      </div>
      <div class="cart-item-actions">
        <div class="qty-control">
          <button class="qty-btn" onclick="cartUpdateQty(${item.id}, ${item.qty - 1})">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="cartUpdateQty(${item.id}, ${item.qty + 1})">+</button>
        </div>
        <button class="remove-item-btn" onclick="cartRemove(${item.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  $('#cartSubtotal').textContent = `R$ ${fmt(subtotal)}`;
  $('#cartTotal').textContent = `R$ ${fmt(subtotal)}`;
}

// ─── ATUALIZAR QUANTIDADE ───────────────────────────────────────────────────
function cartUpdateQty(id, newQty) {
  if (newQty <= 0) {
    cartRemove(id);
    return;
  }
  
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = newQty;
    cartRender();
    updateCartCount();
    localStorage.setItem('devsurf_cart', JSON.stringify(cart));
  }
}

// ─── REMOVER DO CARRINHO ────────────────────────────────────────────────────
function cartRemove(id) {
  cart = cart.filter(item => item.id !== id);
  cartRender();
  updateCartCount();
  localStorage.setItem('devsurf_cart', JSON.stringify(cart));
  showToast('Item removido do carrinho');
}

// ─── ABRIR/FECHAR CARRINHO ──────────────────────────────────────────────────
function cartOpen() {
  const drawer = $('#cartDrawer');
  const overlay = $('#cartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('cart-open');
  }
}

function cartClose() {
  const drawer = $('#cartDrawer');
  const overlay = $('#cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('cart-open');
  }
}

// ─── HEADER SCROLL ──────────────────────────────────────────────────────────
function initHeader() {
  const header = $('#header');
  if (!header) return;
  
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up', 'scroll-down');
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('scroll-down');
      header.classList.remove('scroll-up');
    } else if (currentScroll < lastScroll) {
      header.classList.add('scroll-up');
      header.classList.remove('scroll-down');
    }
    
    lastScroll = currentScroll;
  });
}

// ─── MOBILE MENU ────────────────────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const navMenu = $('#navMenu');
  
  if (!hamburger || !navMenu) return;
  
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
  });
  
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ─── CARROSSEL ──────────────────────────────────────────────────────────────

function initCarousel() {
  const track = $('.carousel-track');
  const slides = $$('.carousel-slide');
  const dots = $$('.dot');
  
  if (!track || !slides.length) return;

  let index = 0;

  // Função única para mudar o slide
  const goTo = (newIndex) => {
    // Lógica circular (vai do último para o primeiro e vice-versa)
    index = (newIndex + slides.length) % slides.length;
    
    // Atualiza o Visual
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Atualiza os dots (se existirem)
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };

  // Event Listeners Dinâmicos
  $('#nextBtn')?.addEventListener('click', () => goTo(index + 1));
  $('#prevBtn')?.addEventListener('click', () => goTo(index - 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto-play simplificado
  setInterval(() => goTo(index + 1), 5000);
}



// ─── BUSCA DE PRODUTOS ──────────────────────────────────────────────────────
function initSearch() {
  const searchInput = $('#product-search');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const cards = $$('.product-card');
    
    cards.forEach(card => {
      const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
      const brand = card.querySelector('.product-brand')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
      
      const match = name.includes(term) || brand.includes(term) || desc.includes(term);
      card.style.display = match ? 'flex' : 'none';
    });
  });
}

// ─── SCROLL TO TOP ──────────────────────────────────────────────────────────
function initScrollTop() {
  const btn = $('#scrollToTop');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function initFooter() {
  const form = $('#newsletterForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    showToast(`Obrigado! ${email} foi cadastrado na newsletter.`);
    form.reset();
  });
}

// ─── INJETAR ESTILOS DO CARRINHO ────────────────────────────────────────────
function injectStyles() {
  const css = `
  .devsurf-toast { position:fixed;bottom:30px;right:30px;background:#000;color:#fff;padding:16px 24px;border-radius:12px;display:flex;align-items:center;gap:12px;font-size:.9rem;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,.3);z-index:10000;opacity:0;transform:translateY(20px);transition:all .3s cubic-bezier(0.68,-0.55,0.265,1.55); }
  .devsurf-toast.show { opacity:1;transform:translateY(0); }
  .devsurf-toast svg { flex-shrink:0;color:#00d4ff; }
  
  #cartOverlay { position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:999;opacity:0;visibility:hidden;transition:all .3s; }
  #cartOverlay.active { opacity:1;visibility:visible; }
  
  #cartDrawer { position:fixed;top:0;right:0;width:100%;max-width:450px;height:100%;background:#fff;box-shadow:-4px 0 20px rgba(0,0,0,.1);z-index:1000;transform:translateX(100%);transition:transform .3s cubic-bezier(0.68,-0.55,0.265,1.55);display:flex;flex-direction:column; }
  #cartDrawer.active { transform:translateX(0); }
  
  .cart-header { display:flex;align-items:center;justify-content:space-between;padding:24px;border-bottom:1px solid #eee; }
  .cart-header h2 { font-size:1.5rem;font-weight:700; }
  .close-cart-btn { width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:none;background:#f5f5f5;border-radius:50%;cursor:pointer;transition:all .2s; }
  .close-cart-btn:hover { background:#e0e0e0;transform:rotate(90deg); }
  
  .cart-body { flex:1;overflow-y:auto;padding:20px; }
  .cart-empty { text-align:center;padding:60px 20px; }
  .cart-empty svg { color:#ccc;margin-bottom:16px; }
  .cart-empty p { color:#999;font-size:.95rem; }
  
  .cart-item { display:flex;gap:16px;padding:16px;background:#f9f9f9;border-radius:12px;margin-bottom:12px; }
  .cart-item img { width:80px;height:80px;object-fit:cover;border-radius:8px;flex-shrink:0; }
  .cart-item-info { flex:1; }
  .cart-item-info h4 { font-size:.9rem;font-weight:600;margin-bottom:4px; }
  .cart-item-brand { font-size:.75rem;color:#999;margin-bottom:8px; }
  .cart-item-price { font-size:.95rem;font-weight:700; }
  .cart-item-actions { display:flex;flex-direction:column;gap:8px;align-items:flex-end; }
  .qty-control { display:flex;align-items:center;gap:8px;background:#fff;border-radius:8px;padding:4px; }
  .qty-btn { width:28px;height:28px;border:none;background:#000;color:#fff;border-radius:6px;cursor:pointer;font-size:1rem;font-weight:600; }
  .qty-btn:hover { background:#333; }
  .qty-control span { min-width:30px;text-align:center;font-weight:600; }
  .remove-item-btn { width:36px;height:36px;border:none;background:#ff4444;color:#fff;border-radius:8px;cursor:pointer; }
  .remove-item-btn:hover { background:#cc0000; }
  
  .cart-footer { border-top:1px solid #eee;padding:20px; }
  .cart-totals { margin-bottom:20px; }
  .cart-total-row { display:flex;justify-content:space-between;margin-bottom:8px; }
  .cart-total-row.total { font-size:1.2rem;font-weight:700;padding-top:12px;border-top:1px solid #eee; }
  .checkout-btn { width:100%;padding:16px;background:#000;color:#fff;border:none;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer; }
  .checkout-btn:hover { background:#333; }
  
  body.cart-open { overflow:hidden; }
  `;
  
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

// ─── INJETAR HTML DO CARRINHO ───────────────────────────────────────────────
function injectCheckoutHTML() {
  const html = `
    <div id="cartOverlay"></div>
    <div id="cartDrawer">
      <div class="cart-header">
        <h2>Carrinho</h2>
        <button class="close-cart-btn" id="closeCartBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="cart-body">
        <div class="cart-empty" id="cartEmpty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Seu carrinho está vazio</p>
        </div>
        <div id="cartItems" style="display:none;"></div>
      </div>
      <div class="cart-footer" id="cartFooter" style="display:none;">
        <div class="cart-totals">
          <div class="cart-total-row">
            <span>Subtotal:</span>
            <span id="cartSubtotal">R$ 0,00</span>
          </div>
          <div class="cart-total-row total">
            <span>Total:</span>
            <span id="cartTotal">R$ 0,00</span>
          </div>
        </div>
        <button class="checkout-btn" onclick="showToast('Checkout em desenvolvimento!')">
          Finalizar Compra
        </button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', html);
  
  // Event listeners
  $('#cartOverlay')?.addEventListener('click', cartClose);
  $('#closeCartBtn')?.addEventListener('click', cartClose);
}

// ─── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Carregar carrinho do localStorage
  const saved = localStorage.getItem('devsurf_cart');
  if (saved) {
    try {
      cart = JSON.parse(saved);
      updateCartCount();
    } catch (e) {
      console.error('Erro ao carregar carrinho:', e);
    }
  }
  
  injectStyles();
  injectCheckoutHTML();
  initHeader();
  initMobileMenu();
  initCarousel();
  initScrollTop();
  initFooter();
  
  // Renderizar produtos
  renderProducts();
  
  // Busca
  initSearch();
  
  // Botão do carrinho
  $('#cartBtn')?.addEventListener('click', () => {
    cartRender();
    cartOpen();
  });
  
  console.log('🏄 DevSurf - E-commerce Carregado!');
});