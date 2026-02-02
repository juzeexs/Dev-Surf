// ============================================
// DEVSURF E-COMMERCE - SCRIPT PRINCIPAL
// ============================================

// ─────────────────────────────────────────────
// BANCO DE DADOS DE PRODUTOS
// ─────────────────────────────────────────────
const PRODUCTS = {
  1:  { brand:"QUIKSILVER",  name:"Camiseta Comp Logo (Branca)",          price:129.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/402169/Camiseta-Quiksilver-M-C-Comp-Logo-Branco-Branco-P.jpg?v=639015714281370000", description:"Camiseta com estampa frontal, confeccionada em malha 100% algodão.", tags:["camiseta","branca","algodão","básica"] },
  2:  { brand:"HURLEY",      name:"Bermuda Phantom Marinho",              price:299.90, oldPrice:359.90, image:"https://hurley.com.br/cdn/shop/files/HYBM010356_MARINHO_02_2.jpg?v=1757339899", description:"Bermuda de alta performance com secagem rápida, ideal para surf e lazer.", tags:["bermuda","surf","marinho","performance"] },
  3:  { brand:"QUIKSILVER",  name:"Boné Quiksilver Gradient New Wave",    price:349.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/347746/85008d.jpg?v=638944968222730000", description:"Boné fechado e elegante para uso confortável no dia a dia.", tags:["boné","acessório","gradiente"] },
  4:  { brand:"QUIKSILVER",  name:"Moletom Quiksilver Block Company",     price:449.90, image:"https://imgcentauro-a.akamaihd.net/1300x1300/M0Y5VE02A2.jpg", description:"Moletom confortável e versátil que não pode faltar no guarda-roupa.", tags:["moletom","inverno","conforto"] },
  5:  { brand:"OAKLEY",      name:"Óculos Oakley Radar EV",               price:899.90, image:"https://assets2.oakley.com/cdn-record-files-pi/321b72e2-8e98-4183-93ec-b22c0160d590/c2b9a7c5-fa67-4913-a55b-b2a70089be7e/0OO9208__9208G2__PREMIUM__shad__adv2.png?impolicy=OO_ratio&width=3000", description:"O mais famoso óculos Radar EV  excelente opção para você!", tags:["óculos","sol","esporte","premium"] },
  6:  { brand:"HURLEY",      name:"Boné Hurley Aba Curva Over Icon",      price:269.90, image:"https://cdn.awsli.com.br/287/287385/produto/182077670/0-hyac010185_01-i8vsmxjfbqhhkx3_1600x2000-6cf6398e74.jpg", description:"Boné clássico com aba curva e logo bordado frontal.", tags:["boné","clássico","aba curva"] },
  7:  { brand:"QUIKSILVER",  name:"Bermuda Boardshort Swell Marinho",     price:254.90, oldPrice:299.90, image:"https://images.tcdn.com.br/img/img_prod/1111144/arrumar_bermuda_quiksilver_boardshort_swell_marinho_masculina_2475_1_76fcad96fd0a273722ed7f1a80f7794f.jpg", description:"Bermuda híbrida versátil para uso aquático e terrestre.", tags:["bermuda","boardshort","surf","marinho"] },
  8:  { brand:"VOLCOM",      name:"Camiseta Crisp Stone",                 price:169.90, image:"https://volcom.com.br/cdn/shop/files/VLTS01044301.00_02_2.jpg?v=1731935287", description:"Camiseta básica com estampa do logo icônico Volcom Stone.", tags:["camiseta","básica","logo"] },
  9:  { brand:"FREESURF",    name:"Baby Look Moving Feminina",            price:139.90, image:"https://s.freesurf.com.br/product/2025/08/baby-look-moving-feminina-freesurf-squard.jpg", description:"Baby look feminina com modelagem ajustada e estampa exclusiva.", tags:["baby look","feminina","ajustada"] },
  10: { brand:"RIP CURL",    name:"Camiseta Icon Branca",                 price:159.90, image:"https://021club.com.br/wp-content/uploads/2023/11/15234363617_camiseta20rip20curl20icon20filter20tee200141mte.jpg", description:"Camiseta branca com logo clássico Rip Curl no peito.", tags:["camiseta","branca","clássica"] },
  11: { brand:"VANS",        name:"Boné Classic Patch Trucker",           price:149.90, image:"https://secure-static.vans.com.br/medias/sys_master/vans/vans/h89/hbe/h00/h00/12917068365854/Midres-Vans-V4600661340003-01.jpg?w=1920&q=100", description:"Boné trucker com patch clássico da Vans e telinha traseira.", tags:["boné","trucker","patch","vans"] },
  12: { brand:"O'NEILL",     name:"Bermuda Hyperfreak Hydro",             price:209.90, oldPrice:279.90, image:"https://m.media-amazon.com/images/I/71kgYhvf--L._AC_SR736,920_.jpg", description:"Bermuda premium com tecnologia Hyperfreak para máxima flexibilidade.", tags:["bermuda","tecnologia","leve","surf"] },
  13: { brand:"BILLABONG",   name:"Camiseta All Day Wave",                price:149.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/362547/B471A0762_02.00_101.jpg?v=638960511312970000", description:"Camiseta com estampa de onda, perfeita para o dia a dia.", tags:["camiseta","surf","wave","algodão"] },
  14: { brand:"QUIKSILVER",  name:"Mochila Esportiva H02",                price:229.90, image:"https://quiksilver.vtexassets.com/arquivos/ids/410985/Mochila-Quiksilver-Esportiva-Quiksilver-H02-Preto-Preto-U.jpg?v=639051152732370000", description:"Mochila esportiva com múltiplos compartimentos e alças acolchoadas.", tags:["mochila","esportiva","preta","compartimentos"] },
  15: { brand:"HURLEY",      name:"Regata Silk Icon Branca",              price:119.90, image:"https://a-static.mlcdn.com.br/800x800/regata-hurley-icon-masculina/netshoes/d71-3290-014-05/5b8721b686c7069e912e8d917a167a67.jpeg", description:"Regata leve e confortável com estampa em silk screen.", tags:["regata","branca","leve","silk"] },
  16: { brand:"VOLCOM",      name:"Bermuda Lido Solid 20\"",              price:188.90, oldPrice:269.90, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf6tnM-cnZtiVBNhOaSycwcxruCAd1tBySXws6KFMRk1o4O5Qkmxi4tc8&s=10", description:"Bermuda clássica de 20 polegadas com bolsos funcionais.", tags:["bermuda","clássica","bolsos"] },
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

// ─────────────────────────────────────────────
// ESTADO GLOBAL DA APLICAÇÃO
// ─────────────────────────────────────────────
let cart = [];

// ─────────────────────────────────────────────
// UTILIDADES
// ─────────────────────────────────────────────
const fmt = (n) => n.toFixed(2).replace('.', ',');
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ─────────────────────────────────────────────
// RENDERIZAÇÃO DE PRODUTOS
// ─────────────────────────────────────────────
function renderProducts() {
  const grid = $('#productsGrid');
  if (!grid) return;
  
  grid.innerHTML = Object.entries(PRODUCTS).map(([id, product]) => {
    // Badge de desconto ou novidade
    const badge = product.oldPrice ? 
      `<span class="product-badge">-${Math.round((1 - product.price/product.oldPrice) * 100)}%</span>` :
      (parseInt(id) <= 5 ? '<span class="product-badge">Novo</span>' : '');
    
    // Preço antigo (se houver)
    const oldPriceHtml = product.oldPrice ? 
      `<span class="price-old">R$ ${fmt(product.oldPrice)}</span>` : '';
    
    // Cálculo de parcelas
    const installments = Math.min(Math.floor(product.price / 50), 12);
    const installmentValue = product.price / installments;
    
    return `
      <div class="product-card" data-product-id="${id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${badge}
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price">
            ${oldPriceHtml}
            <span class="price-current">R$ ${fmt(product.price)}</span>
          </div>
          <p class="price-installment">ou ${installments}x de R$ ${fmt(installmentValue)} sem juros</p>
          <button class="add-to-cart-btn" data-id="${id}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Adicionar
          </button>
        </div>
      </div>
    `;
  }).join('');
  
  // Vincular eventos após renderizar
  bindProductButtons();
}

// ─────────────────────────────────────────────
// VINCULAR BOTÕES DOS PRODUTOS
// ─────────────────────────────────────────────
function bindProductButtons() {
  $$('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId = btn.getAttribute('data-id');
      if (productId) {
        addToCart(productId);
        
        // Feedback visual no botão
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = 'scale(1)', 150);
      }
    });
  });
}

// ─────────────────────────────────────────────
// ADICIONAR PRODUTO AO CARRINHO
// ─────────────────────────────────────────────
function addToCart(productId) {
  const id = parseInt(productId);
  const product = PRODUCTS[id];
  
  console.log('Adicionando produto:', id, product);
  
  if (!product) {
    console.error('Produto não encontrado:', id);
    return;
  }
  
  const existing = cart.find(item => item.id === id);
  
  if (existing) {
    existing.qty++;
    console.log('Produto já existe, incrementando quantidade:', existing);
  } else {
    cart.push({ id, ...product, qty: 1 });
    console.log('Novo produto adicionado ao carrinho');
  }
  
  console.log('Carrinho atual:', cart);
  
  updateCartCount();
  saveCart();
  showToast(`${product.name} adicionado ao carrinho!`);
}

// ─────────────────────────────────────────────
// ATUALIZAR CONTADOR DO CARRINHO
// ─────────────────────────────────────────────
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = $('#cartCount');
  
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    
    // Animação de bounce
    if (count > 0) {
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => badge.style.transform = 'scale(1)', 200);
    }
  }
}

// ─────────────────────────────────────────────
// SALVAR CARRINHO NO LOCALSTORAGE
// ─────────────────────────────────────────────
function saveCart() {
  localStorage.setItem('devsurf_cart', JSON.stringify(cart));
}

// ─────────────────────────────────────────────
// CARREGAR CARRINHO DO LOCALSTORAGE
// ─────────────────────────────────────────────
function loadCart() {
  const saved = localStorage.getItem('devsurf_cart');
  if (saved) {
    try {
      cart = JSON.parse(saved);
      updateCartCount();
    } catch (e) {
      console.error('Erro ao carregar carrinho:', e);
      cart = [];
    }
  }
}

// ─────────────────────────────────────────────
// RENDERIZAR CARRINHO
// ─────────────────────────────────────────────
function renderCart() {
  const itemsEl = $('#cartItems');
  const emptyEl = $('#cartEmpty');
  const footerEl = $('#cartFooter');
  
  if (!itemsEl || !emptyEl || !footerEl) return;
  
  if (cart.length === 0) {
    emptyEl.style.display = 'flex';
    itemsEl.style.display = 'none';
    footerEl.style.display = 'none';
    return;
  }
  
  emptyEl.style.display = 'none';
  itemsEl.style.display = 'block';
  footerEl.style.display = 'block';
  
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-brand">${item.brand}</p>
        <p class="cart-item-price">R$ ${fmt(item.price)}</p>
      </div>
      <div class="cart-item-actions">
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.qty - 1})">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.qty + 1})">+</button>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})" aria-label="Remover item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  // Atualizar totais
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  $('#cartSubtotal').textContent = `R$ ${fmt(subtotal)}`;
  $('#cartTotal').textContent = `R$ ${fmt(subtotal)}`;
}

// ─────────────────────────────────────────────
// ATUALIZAR QUANTIDADE DE PRODUTO
// ─────────────────────────────────────────────
function updateQuantity(id, newQty) {
  if (newQty <= 0) {
    removeFromCart(id);
    return;
  }
  
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = newQty;
    renderCart();
    updateCartCount();
    saveCart();
  }
}

// ─────────────────────────────────────────────
// REMOVER PRODUTO DO CARRINHO
// ─────────────────────────────────────────────
function removeFromCart(id) {
  const product = cart.find(item => item.id === id);
  cart = cart.filter(item => item.id !== id);
  
  renderCart();
  updateCartCount();
  saveCart();
  
  if (product) {
    showToast(`${product.name} removido do carrinho`);
  }
}

// ─────────────────────────────────────────────
// ABRIR CARRINHO
// ─────────────────────────────────────────────
function openCart() {
  const drawer = $('#cartDrawer');
  const overlay = $('#cartOverlay');
  
  console.log('Abrindo carrinho...');
  console.log('Drawer encontrado:', drawer);
  console.log('Overlay encontrado:', overlay);
  console.log('Itens no carrinho:', cart.length);
  
  if (drawer && overlay) {
    renderCart();
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('cart-open');
    console.log('Carrinho aberto com sucesso!');
  } else {
    console.error('Elementos do carrinho não encontrados!');
  }
}

// ─────────────────────────────────────────────
// FECHAR CARRINHO
// ─────────────────────────────────────────────
function closeCart() {
  const drawer = $('#cartDrawer');
  const overlay = $('#cartOverlay');
  
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('cart-open');
  }
}

// ─────────────────────────────────────────────
// NOTIFICAÇÃO TOAST
// ─────────────────────────────────────────────
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'devsurf-toast';
  toast.innerHTML = `
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  stroke="white" 
  style="width: 24px; height: 24px;"
>
  <path 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    stroke-width="2" 
    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  />
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

// ─────────────────────────────────────────────
// HEADER COM SCROLL
// ─────────────────────────────────────────────
function initHeader() {
  const header = $('#header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scrolled');
      return;
    }
    
    header.classList.add('scrolled');
    
    // Ocultar/mostrar header no scroll
    if (currentScroll > lastScroll && currentScroll > 150) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
}

// ─────────────────────────────────────────────
// MENU MOBILE
// ─────────────────────────────────────────────
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
  
  // Fechar menu ao clicar em um link
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Marcar link ativo
  const sections = $$('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    $$('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ─────────────────────────────────────────────
// CARROSSEL DE IMAGENS
// ─────────────────────────────────────────────
function initCarousel() {
  const track = $('.carousel-track');
  const slides = Array.from($$('.carousel-slide'));
  const dots = $$('.dot');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  
  if (!track || !slides.length) return;

  let index = 0;
  let autoplayInterval;

  // Ir para slide específico
  const goToSlide = (newIndex) => {
    index = (newIndex + slides.length) % slides.length;
    
    track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Atualizar dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    resetAutoplay();
  };

  // Autoplay
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      goToSlide(index + 1);
    }, 5000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  // Navegação por botões
  nextBtn?.addEventListener('click', () => goToSlide(index + 1));
  prevBtn?.addEventListener('click', () => goToSlide(index - 1));

  // Navegação por dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Iniciar autoplay
  startAutoplay();
}

// ─────────────────────────────────────────────
// BUSCA DE PRODUTOS
// ─────────────────────────────────────────────
function initSearch() {
  const searchInput = $('#product-search');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const cards = $$('.product-card');
    
    let visibleCount = 0;
    
    cards.forEach(card => {
      const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
      const id = card.getAttribute('data-product-id');
      const product = PRODUCTS[id];
      
      let match = name.includes(term);
      
      // Buscar também em tags e brand
      if (product) {
        match = match || 
                product.brand.toLowerCase().includes(term) ||
                product.tags.some(tag => tag.includes(term));
      }
      
      if (match) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Mostrar mensagem se não houver resultados
    const grid = $('#productsGrid');
    let noResults = $('#noResults');
    
    if (visibleCount === 0 && term) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.id = 'noResults';
        noResults.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: var(--gray-color);';
        noResults.innerHTML = `
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; opacity: 0.3;">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Nenhum produto encontrado</p>
          <p style="font-size: 0.9rem;">Tente buscar com outros termos</p>
        `;
        grid.appendChild(noResults);
      }
      noResults.style.display = 'block';
    } else if (noResults) {
      noResults.style.display = 'none';
    }
  });
}

// ─────────────────────────────────────────────
// BOTÃO VOLTAR AO TOPO
// ─────────────────────────────────────────────
function initScrollToTop() {
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
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  });
}

// ─────────────────────────────────────────────
// NEWSLETTER
// ─────────────────────────────────────────────
function initNewsletter() {
  const form = $('.news-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
      showToast(`Obrigado! ${email} foi cadastrado na newsletter.`);
      form.reset();
    }
  });
}

// ─────────────────────────────────────────────
// INJETAR ESTILOS DO CARRINHO E TOAST
// ─────────────────────────────────────────────
function injectStyles() {
  const css = `
    /* Toast Notification */
    .devsurf-toast {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #000;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.9rem;
      font-weight: 600;
      z-index: 10000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .devsurf-toast.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .devsurf-toast svg {
      flex-shrink: 0;
      color: #00d4ff;
    }
    
    /* Cart Drawer Styles */
    .cart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 2px solid #f0f0f0;
      background: #fff;
      position: sticky;
      top: 0;
      z-index: 10;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .cart-header h2 {
      font-size: 1.4rem;
      font-weight: 700;
      font-family: 'Bebas Neue', sans-serif;
      letter-spacing: 1.5px;
      color: #1a1a1a;
    }
    
    .close-cart-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: #f5f5f5;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    
    .close-cart-btn:hover {
      background: #e0e0e0;
      transform: rotate(90deg);
    }
    
    .cart-body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px;
      background: #fafafa;
      /* Scrollbar personalizada */
      scrollbar-width: thin;
      scrollbar-color: #ccc #f0f0f0;
    }
    
    .cart-body::-webkit-scrollbar {
      width: 8px;
    }
    
    .cart-body::-webkit-scrollbar-track {
      background: #f0f0f0;
    }
    
    .cart-body::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
    
    .cart-body::-webkit-scrollbar-thumb:hover {
      background: #999;
    }
    
    .cart-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px 20px;
      height: 100%;
      min-height: 300px;
    }
    
    .cart-empty svg {
      color: #ccc;
      margin-bottom: 16px;
    }
    
    .cart-empty p {
      color: #999;
      font-size: 0.95rem;
    }
    
    #cartItems {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-bottom: 20px;
    }
    
    .cart-item {
      display: grid;
      grid-template-columns: 90px 1fr auto;
      gap: 12px;
      padding: 12px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
      align-items: center;
      transition: box-shadow 0.2s;
    }
    
    .cart-item:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .cart-item img {
      width: 90px;
      height: 90px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }
    
    .cart-item-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      padding-right: 8px;
    }
    
    .cart-item-info h4 {
      font-size: 0.9rem;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 0;
    }
    
    .cart-item-brand {
      font-size: 0.7rem;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
      margin: 0;
    }
    
    .cart-item-price {
      font-size: 1rem;
      font-weight: 700;
      color: #000;
      margin: 4px 0 0 0;
    }
    
    .cart-item-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-end;
      flex-shrink: 0;
    }
    
    .qty-control {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #f5f5f5;
      border-radius: 8px;
      padding: 4px 6px;
    }
    
    .qty-btn {
      width: 26px;
      height: 26px;
      border: none;
      background: #000;
      color: #fff;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      line-height: 1;
    }
    
    .qty-btn:hover {
      background: #333;
    }
    
    .qty-btn:active {
      transform: scale(0.95);
    }
    
    .qty-control span {
      min-width: 24px;
      text-align: center;
      font-weight: 600;
      font-size: 0.85rem;
      color: #333;
    }
    
    .remove-item-btn {
      width: 32px;
      height: 32px;
      border: none;
      background: #ff4444;
      color: #fff;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      padding: 0;
    }
    
    .remove-item-btn:hover {
      background: #cc0000;
      transform: scale(1.05);
    }
    
    .remove-item-btn:active {
      transform: scale(0.95);
    }
    
    .cart-footer {
      border-top: 2px solid #f0f0f0;
      padding: 20px;
      background: #fff;
      position: sticky;
      bottom: 0;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .cart-totals {
      margin-bottom: 16px;
    }
    
    .cart-total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 0.9rem;
      color: #666;
    }
    
    .cart-total-row.total {
      font-size: 1.3rem;
      font-weight: 700;
      padding-top: 12px;
      border-top: 2px solid #f0f0f0;
      margin-top: 8px;
      color: #000;
    }
    
    .checkout-btn {
      width: 100%;
      padding: 16px;
      background: #000;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.2s;
    }
    
    .checkout-btn:hover {
      background: #333;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .checkout-btn:active {
      transform: translateY(0);
    }
    
    /* Tablets */
    @media (max-width: 992px) {
      .cart-item {
        grid-template-columns: 80px 1fr auto;
        gap: 10px;
      }
      
      .cart-item img {
        width: 80px;
        height: 80px;
      }
      
      .cart-item-info h4 {
        font-size: 0.85rem;
      }
      
      .cart-item-price {
        font-size: 0.95rem;
      }
    }
    
    /* Mobile */
    @media (max-width: 768px) {
      .devsurf-toast {
        bottom: 20px;
        right: 20px;
        left: 20px;
        font-size: 0.85rem;
        padding: 12px 16px;
      }
      
      #cartDrawer {
        max-width: 100%;
      }
      
      .cart-header {
        padding: 16px 20px;
      }
      
      .cart-header h2 {
        font-size: 1.3rem;
      }
      
      .cart-body {
        padding: 12px;
      }
      
      .cart-item {
        grid-template-columns: 70px 1fr;
        grid-template-rows: auto auto;
        gap: 10px;
      }
      
      .cart-item img {
        width: 70px;
        height: 70px;
        grid-row: 1 / 3;
      }
      
      .cart-item-info {
        grid-column: 2;
        grid-row: 1;
        padding-right: 0;
      }
      
      .cart-item-info h4 {
        font-size: 0.85rem;
        -webkit-line-clamp: 2;
      }
      
      .cart-item-brand {
        font-size: 0.65rem;
      }
      
      .cart-item-price {
        font-size: 0.9rem;
      }
      
      .cart-item-actions {
        grid-column: 2;
        grid-row: 2;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      
      .qty-control {
        gap: 8px;
        padding: 4px 8px;
      }
      
      .qty-btn {
        width: 28px;
        height: 28px;
      }
      
      .qty-control span {
        min-width: 28px;
        font-size: 0.9rem;
      }
      
      .cart-footer {
        padding: 16px;
      }
      
      .cart-total-row {
        font-size: 0.85rem;
      }
      
      .cart-total-row.total {
        font-size: 1.2rem;
      }
      
      .checkout-btn {
        padding: 14px;
        font-size: 0.9rem;
      }
    }
    
    /* Mobile muito pequeno */
    @media (max-width: 480px) {
      .cart-item {
        grid-template-columns: 60px 1fr;
        padding: 10px;
      }
      
      .cart-item img {
        width: 60px;
        height: 60px;
      }
      
      .cart-item-info h4 {
        font-size: 0.8rem;
      }
      
      .cart-item-brand {
        font-size: 0.6rem;
      }
      
      .cart-item-price {
        font-size: 0.85rem;
      }
      
      .qty-btn {
        width: 26px;
        height: 26px;
        font-size: 0.85rem;
      }
      
      .remove-item-btn {
        width: 30px;
        height: 30px;
      }
      
      .remove-item-btn svg {
        width: 16px;
        height: 16px;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────
// INJETAR HTML DO CARRINHO
// ─────────────────────────────────────────────
function injectCartHTML() {
  // Verifica se já existe para não duplicar
  if ($('#cartDrawer')) return;
  
  const html = `
    <!-- Overlay do Carrinho -->
    <div id="cartOverlay"></div>
    
    <!-- Drawer do Carrinho -->
    <div id="cartDrawer">
      <div class="cart-header">
        <h2>SEU CARRINHO</h2>
        <button class="close-cart-btn" id="closeCartBtn" aria-label="Fechar carrinho">
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
        <div id="cartItems"></div>
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
        <a href="checkout.html" class="checkout-btn" style="text-decoration: none; display: inline-block; text-align: center;">
  Continuar
</a>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', html);
  
  // Event listeners do carrinho
  const overlay = $('#cartOverlay');
  const closeBtn = $('#closeCartBtn');
  
  if (overlay) {
    overlay.addEventListener('click', closeCart);
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCart);
  }
}

// ─────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏄 DevSurf - E-commerce inicializando...');
  
  // Carregar carrinho salvo
  loadCart();
  console.log('Carrinho carregado:', cart);
  
  // Injetar estilos e HTML do carrinho
  injectStyles();
  console.log('Estilos injetados');
  
  injectCartHTML();
  console.log('HTML do carrinho injetado');
  
  // Verificar se elementos foram criados
  console.log('Verificando elementos do carrinho:');
  console.log('- cartDrawer:', $('#cartDrawer'));
  console.log('- cartOverlay:', $('#cartOverlay'));
  console.log('- cartItems:', $('#cartItems'));
  console.log('- cartEmpty:', $('#cartEmpty'));
  console.log('- cartFooter:', $('#cartFooter'));
  
  // Inicializar componentes
  initHeader();
  initMobileMenu();
  initCarousel();
  initSearch();
  initScrollToTop();
  initNewsletter();
  
  // Renderizar produtos
  renderProducts();
  console.log('Produtos renderizados');
  
  // Botão abrir carrinho
  const cartBtn = $('#cartBtn');
  console.log('Botão do carrinho:', cartBtn);
  
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      console.log('Botão do carrinho clicado!');
      openCart();
    });
  } else {
    console.error('Botão do carrinho não encontrado!');
  }
  
  console.log('✅ DevSurf - E-commerce carregado com sucesso!');
});