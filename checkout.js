let checkoutData = {
  customer: {
    name: '',
    email: '',
    phone: '',
    cpf: ''
  },
  address: {
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  },
  payment: {
    method: 'credit',
    installments: 1,
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  },
  shipping: {
    method: 'standard',
    price: 0
  }
};

let currentStep = 1;
const TOTAL_STEPS = 4;

// ─────────────────────────────────────────────
// VALORES DE FRETE
// ─────────────────────────────────────────────
const SHIPPING_OPTIONS = {
  standard: { name: 'Padrão', days: '5-7 dias úteis', price: 15.90 },
  express: { name: 'Expresso', days: '2-3 dias úteis', price: 29.90 }
};

// Valor mínimo do subtotal para frete grátis
const FREE_SHIPPING_THRESHOLD = 299;

// ─────────────────────────────────────────────
// UTILIDADES
// ─────────────────────────────────────────────
const fmt = (n) => n.toFixed(2).replace('.', ',');
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ─────────────────────────────────────────────
// MÁSCARAS DE ENTRADA
// ─────────────────────────────────────────────
function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function maskPhone(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

function maskCEP(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
}

function maskCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\d+?$/, '$1');
}

function maskCardExpiry(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{2})\d+?$/, '$1');
}

function maskCVV(value) {
  return value.replace(/\D/g, '').slice(0, 4);
}

// ─────────────────────────────────────────────
// VALIDAÇÕES
// ─────────────────────────────────────────────
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(10))) return false;
  
  return true;
}

function validateCEP(cep) {
  return /^\d{5}-?\d{3}$/.test(cep);
}

function validateCardNumber(number) {
  const cleaned = number.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
}

function validateCardExpiry(expiry) {
  const [month, year] = expiry.split('/');
  if (!month || !year) return false;
  
  const m = parseInt(month);
  const y = parseInt('20' + year);
  
  if (m < 1 || m > 12) return false;
  
  const now = new Date();
  const expDate = new Date(y, m - 1);
  
  return expDate > now;
}

function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv);
}

// ─────────────────────────────────────────────
// BUSCAR CEP
// ─────────────────────────────────────────────
async function fetchCEP(cep) {
  const cleanCEP = cep.replace(/\D/g, '');
  
  if (cleanCEP.length !== 8) {
    return null;
  }
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      return null;
    }
    
    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
}

// ─────────────────────────────────────────────
// RENDERIZAR RESUMO DO PEDIDO
// ─────────────────────────────────────────────
function renderOrderSummary() {
  const summaryItems = $('#summaryItems');
  const cart = JSON.parse(localStorage.getItem('devsurf_cart') || '[]');
  
  if (!summaryItems || cart.length === 0) {
    if (summaryItems) {
      summaryItems.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Carrinho vazio</p>';
    }
    return;
  }
  
  summaryItems.innerHTML = cart.map(item => `
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="summary-item-info">
        <h4>${item.name}</h4>
        <p class="summary-item-brand">${item.brand}</p>
        <p class="summary-item-qty">Qtd: ${item.qty}</p>
      </div>
      <div class="summary-item-price">
        R$ ${fmt(item.price * item.qty)}
      </div>
    </div>
  `).join('');
  
  updateTotals();
}

// ─────────────────────────────────────────────
// ATUALIZAR TOTAIS
// ─────────────────────────────────────────────
function updateTotals() {
  const cart = JSON.parse(localStorage.getItem('devsurf_cart') || '[]');
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // ── frete grátis quando subtotal >= threshold ──
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = isFreeShipping ? 0 : checkoutData.shipping.price;
  const total = subtotal + shipping;

  // atualizar estado interno
  checkoutData.shipping.price = shipping;

  // ── Resumo lateral ──
  const subtotalEl = $('#summarySubtotal');
  const shippingEl = $('#summaryShipping');
  const totalEl    = $('#summaryTotal');

  if (subtotalEl) subtotalEl.textContent = `R$ ${fmt(subtotal)}`;
  if (shippingEl) {
    if (isFreeShipping) {
      shippingEl.innerHTML = '<span style="color:#16a34a;font-weight:700;">Grátis</span>';
    } else {
      shippingEl.textContent = shipping > 0 ? `R$ ${fmt(shipping)}` : 'A calcular';
    }
  }
  if (totalEl) totalEl.textContent = `R$ ${fmt(total)}`;

  // ── Badge "Frete Grátis" no resumo ──
  const badge = $('#freeShippingBadge');
  if (badge) {
    badge.style.display = isFreeShipping ? 'flex' : 'none';
  }

  // ── Hint no painel de frete (step 2) ──
  const hint = $('#shippingHint');
  if (hint) {
    if (isFreeShipping) {
      hint.style.display   = 'flex';
      hint.style.background = '#f0fdf4';
      hint.style.border     = '1px solid #bbf7d0';
      hint.style.color      = '#16a34a';
      hint.innerHTML = '🎉 Parabéns! Seu pedido tem frete grátis!';
    } else if (subtotal > 0) {
      const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
      hint.style.display   = 'flex';
      hint.style.background = '#fefce8';
      hint.style.border     = '1px solid #fde047';
      hint.style.color      = '#a16207';
      hint.innerHTML = `💡 Adicione mais <strong>R$ ${fmt(remaining)}</strong> ao pedido para ganhar <strong>frete grátis</strong>!`;
    } else {
      hint.style.display = 'none';
    }
  }

  // ── preços nas labels de frete (riscados se grátis) ──
  const stdPrice = $('#shippingPriceStandard');
  const expPrice = $('#shippingPriceExpress');
  if (stdPrice) {
    stdPrice.innerHTML = isFreeShipping
      ? '<span style="text-decoration:line-through;color:#999;font-weight:400;">R$ 15,90</span> <span style="color:#16a34a;font-weight:700;">Grátis</span>'
      : 'R$ 15,90';
  }
  if (expPrice) {
    expPrice.innerHTML = isFreeShipping
      ? '<span style="text-decoration:line-through;color:#999;font-weight:400;">R$ 29,90</span> <span style="color:#16a34a;font-weight:700;">Grátis</span>'
      : 'R$ 29,90';
  }
}

// ─────────────────────────────────────────────
// NAVEGAÇÃO ENTRE STEPS
// ─────────────────────────────────────────────
function goToStep(step) {
  if (step < 1 || step > TOTAL_STEPS) return;
  
  // Validar step atual antes de avançar
  if (step > currentStep && !validateCurrentStep()) {
    return;
  }
  
  // Ocultar step atual
  const currentStepEl = $(`.checkout-step[data-step="${currentStep}"]`);
  if (currentStepEl) {
    currentStepEl.classList.remove('active');
  }
  
  // Mostrar novo step
  currentStep = step;
  const newStepEl = $(`.checkout-step[data-step="${currentStep}"]`);
  if (newStepEl) {
    newStepEl.classList.add('active');
  }
  
  // Atualizar indicador de progresso
  updateProgressIndicator();
  
  // Scroll para o topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Renderizar conteúdo específico do step
  if (currentStep === 3) {
    renderPaymentOptions();
  } else if (currentStep === 4) {
    renderReview();
  }
}

// ─────────────────────────────────────────────
// ATUALIZAR INDICADOR DE PROGRESSO
// ─────────────────────────────────────────────
function updateProgressIndicator() {
  $$('.progress-step').forEach((el, index) => {
    const stepNum = index + 1;
    
    if (stepNum < currentStep) {
      el.classList.add('completed');
      el.classList.remove('active');
    } else if (stepNum === currentStep) {
      el.classList.add('active');
      el.classList.remove('completed');
    } else {
      el.classList.remove('active', 'completed');
    }
  });
  
  // Atualizar barra de progresso
  const progressBar = $('.progress-bar-fill');
  if (progressBar) {
    const percentage = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
    progressBar.style.width = `${percentage}%`;
  }
}

// ─────────────────────────────────────────────
// VALIDAR STEP ATUAL
// ─────────────────────────────────────────────
function validateCurrentStep() {
  switch (currentStep) {
    case 1:
      return validatePersonalData();
    case 2:
      return validateAddressData();
    case 3:
      return validatePaymentData();
    default:
      return true;
  }
}

// ─────────────────────────────────────────────
// VALIDAR DADOS PESSOAIS
// ─────────────────────────────────────────────
function validatePersonalData() {
  const name = $('#customerName')?.value.trim();
  const email = $('#customerEmail')?.value.trim();
  const phone = $('#customerPhone')?.value.trim();
  const cpf = $('#customerCPF')?.value.trim();
  
  let isValid = true;
  let errors = [];
  
  if (!name || name.length < 3) {
    errors.push('Nome completo é obrigatório');
    markFieldError('#customerName');
    isValid = false;
  } else {
    markFieldValid('#customerName');
  }
  
  if (!email || !validateEmail(email)) {
    errors.push('E-mail válido é obrigatório');
    markFieldError('#customerEmail');
    isValid = false;
  } else {
    markFieldValid('#customerEmail');
  }
  
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    errors.push('Telefone válido é obrigatório');
    markFieldError('#customerPhone');
    isValid = false;
  } else {
    markFieldValid('#customerPhone');
  }
  
  if (!cpf || !validateCPF(cpf)) {
    errors.push('CPF válido é obrigatório');
    markFieldError('#customerCPF');
    isValid = false;
  } else {
    markFieldValid('#customerCPF');
  }
  
  if (!isValid) {
    showToast(errors[0], 'error');
  } else {
    checkoutData.customer = { name, email, phone, cpf };
  }
  
  return isValid;
}

// ─────────────────────────────────────────────
// VALIDAR DADOS DE ENDEREÇO
// ─────────────────────────────────────────────
function validateAddressData() {
  const cep = $('#addressCEP')?.value.trim();
  const street = $('#addressStreet')?.value.trim();
  const number = $('#addressNumber')?.value.trim();
  const neighborhood = $('#addressNeighborhood')?.value.trim();
  const city = $('#addressCity')?.value.trim();
  const state = $('#addressState')?.value.trim();
  
  let isValid = true;
  let errors = [];
  
  if (!cep || !validateCEP(cep)) {
    errors.push('CEP válido é obrigatório');
    markFieldError('#addressCEP');
    isValid = false;
  } else {
    markFieldValid('#addressCEP');
  }
  
  if (!street) {
    errors.push('Endereço é obrigatório');
    markFieldError('#addressStreet');
    isValid = false;
  } else {
    markFieldValid('#addressStreet');
  }
  
  if (!number) {
    errors.push('Número é obrigatório');
    markFieldError('#addressNumber');
    isValid = false;
  } else {
    markFieldValid('#addressNumber');
  }
  
  if (!neighborhood) {
    errors.push('Bairro é obrigatório');
    markFieldError('#addressNeighborhood');
    isValid = false;
  } else {
    markFieldValid('#addressNeighborhood');
  }
  
  if (!city) {
    errors.push('Cidade é obrigatória');
    markFieldError('#addressCity');
    isValid = false;
  } else {
    markFieldValid('#addressCity');
  }
  
  if (!state) {
    errors.push('Estado é obrigatório');
    markFieldError('#addressState');
    isValid = false;
  } else {
    markFieldValid('#addressState');
  }
  
  if (!isValid) {
    showToast(errors[0], 'error');
  } else {
    checkoutData.address = {
      cep,
      street,
      number,
      complement: $('#addressComplement')?.value.trim() || '',
      neighborhood,
      city,
      state
    };
  }
  
  return isValid;
}

// ─────────────────────────────────────────────
// VALIDAR DADOS DE PAGAMENTO
// ─────────────────────────────────────────────
function validatePaymentData() {
  const method = checkoutData.payment.method;
  
  // PIX e Boleto não precisam de validação adicional
  if (method === 'pix' || method === 'boleto') {
    return true;
  }
  
  // Validar cartão
  const cardNumber = $('#cardNumber')?.value.trim();
  const cardName = $('#cardName')?.value.trim();
  const cardExpiry = $('#cardExpiry')?.value.trim();
  const cardCvv = $('#cardCVV')?.value.trim();
  
  let isValid = true;
  let errors = [];
  
  if (!cardNumber || !validateCardNumber(cardNumber)) {
    errors.push('Número do cartão inválido');
    markFieldError('#cardNumber');
    isValid = false;
  } else {
    markFieldValid('#cardNumber');
  }
  
  if (!cardName || cardName.length < 3) {
    errors.push('Nome no cartão é obrigatório');
    markFieldError('#cardName');
    isValid = false;
  } else {
    markFieldValid('#cardName');
  }
  
  if (!cardExpiry || !validateCardExpiry(cardExpiry)) {
    errors.push('Data de validade inválida');
    markFieldError('#cardExpiry');
    isValid = false;
  } else {
    markFieldValid('#cardExpiry');
  }
  
  if (!cardCvv || !validateCVV(cardCvv)) {
    errors.push('CVV inválido');
    markFieldError('#cardCVV');
    isValid = false;
  } else {
    markFieldValid('#cardCVV');
  }
  
  if (!isValid) {
    showToast(errors[0], 'error');
  } else {
    checkoutData.payment.cardNumber = cardNumber;
    checkoutData.payment.cardName = cardName;
    checkoutData.payment.cardExpiry = cardExpiry;
    checkoutData.payment.cardCvv = cardCvv;
  }
  
  return isValid;
}

// ─────────────────────────────────────────────
// MARCAR CAMPO COM ERRO
// ─────────────────────────────────────────────
function markFieldError(selector) {
  const field = $(selector);
  if (field) {
    field.classList.add('error');
    field.classList.remove('valid');
  }
}

// ─────────────────────────────────────────────
// MARCAR CAMPO VÁLIDO
// ─────────────────────────────────────────────
function markFieldValid(selector) {
  const field = $(selector);
  if (field) {
    field.classList.remove('error');
    field.classList.add('valid');
  }
}

// ─────────────────────────────────────────────
// RENDERIZAR OPÇÕES DE PAGAMENTO
// ─────────────────────────────────────────────
function renderPaymentOptions() {
  const method = checkoutData.payment.method;
  
  // Mostrar/ocultar campos de cartão
  const cardFields = $('#cardFields');
  const pixInfo = $('#pixInfo');
  const boletoInfo = $('#boletoInfo');
  const installmentsField = $('#installmentsField');
  
  if (cardFields) cardFields.style.display = (method === 'credit' || method === 'debit') ? 'block' : 'none';
  if (pixInfo) pixInfo.style.display = method === 'pix' ? 'block' : 'none';
  if (boletoInfo) boletoInfo.style.display = method === 'boleto' ? 'block' : 'none';
  if (installmentsField) installmentsField.style.display = method === 'credit' ? 'block' : 'none';
}

// ─────────────────────────────────────────────
// RENDERIZAR REVISÃO
// ─────────────────────────────────────────────
function renderReview() {
  // Dados pessoais
  const reviewName = $('#reviewName');
  const reviewEmail = $('#reviewEmail');
  const reviewPhone = $('#reviewPhone');
  const reviewCPF = $('#reviewCPF');
  
  if (reviewName) reviewName.textContent = checkoutData.customer.name;
  if (reviewEmail) reviewEmail.textContent = checkoutData.customer.email;
  if (reviewPhone) reviewPhone.textContent = checkoutData.customer.phone;
  if (reviewCPF) reviewCPF.textContent = checkoutData.customer.cpf;
  
  // Endereço
  const addr = checkoutData.address;
  const reviewAddress = $('#reviewAddress');
  if (reviewAddress) {
    reviewAddress.innerHTML = `
      ${addr.street}, ${addr.number}${addr.complement ? ' - ' + addr.complement : ''}<br>
      ${addr.neighborhood}, ${addr.city} - ${addr.state}<br>
      CEP: ${addr.cep}
    `;
  }
  
  // Frete
  const shipping = SHIPPING_OPTIONS[checkoutData.shipping.method];
  const cart = JSON.parse(localStorage.getItem('devsurf_cart') || '[]');
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const reviewShipping = $('#reviewShipping');
  if (reviewShipping) {
    if (isFreeShipping) {
      reviewShipping.innerHTML = `${shipping.name} (${shipping.days}) - <span style="color:#16a34a;font-weight:700;">Grátis</span>`;
    } else {
      reviewShipping.textContent = `${shipping.name} (${shipping.days}) - R$ ${fmt(shipping.price)}`;
    }
  }
  
  // Pagamento
  let paymentText = '';
  switch (checkoutData.payment.method) {
    case 'credit':
      const installments = checkoutData.payment.installments;
      const totalWithShipping = subtotal + (isFreeShipping ? 0 : shipping.price);
      const installmentValue = totalWithShipping / installments;
      paymentText = `Cartão de Crédito - ${installments}x de R$ ${fmt(installmentValue)}`;
      break;
    case 'debit':
      paymentText = 'Cartão de Débito';
      break;
    case 'pix':
      paymentText = 'PIX';
      break;
    case 'boleto':
      paymentText = 'Boleto Bancário';
      break;
  }
  const reviewPayment = $('#reviewPayment');
  if (reviewPayment) {
    reviewPayment.textContent = paymentText;
  }
}

// ─────────────────────────────────────────────
// FINALIZAR PEDIDO
// ─────────────────────────────────────────────
async function finishOrder() {
  const btn = $('#finishOrderBtn');
  if (!btn) return;
  
  // Desabilitar botão e mostrar loading
  btn.disabled = true;
  btn.innerHTML = `
    <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
      <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"></path>
    </svg>
    Processando...
  `;
  
  // Simular processamento
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Obter carrinho antes de limpar
  const cart = JSON.parse(localStorage.getItem('devsurf_cart') || '[]');
  
  // Salvar pedido no histórico
  const order = {
    id: Date.now(),
    date: new Date().toISOString(),
    customer: checkoutData.customer,
    address: checkoutData.address,
    payment: {
      method: checkoutData.payment.method,
      installments: checkoutData.payment.installments
    },
    shipping: checkoutData.shipping,
    items: cart,
    status: 'confirmed'
  };
  
  const orders = JSON.parse(localStorage.getItem('devsurf_orders') || '[]');
  orders.push(order);
  localStorage.setItem('devsurf_orders', JSON.stringify(orders));
  
  // Limpar carrinho
  localStorage.removeItem('devsurf_cart');
  
  // Mostrar confirmação
  showSuccessScreen(order);
}

// ─────────────────────────────────────────────
// MOSTRAR TELA DE SUCESSO
// ─────────────────────────────────────────────
function showSuccessScreen(order) {
  const checkoutContent = $('.checkout-container');
  if (!checkoutContent) return;
  
  const paymentInfo = checkoutData.payment.method === 'pix' ? 
    `
      <div class="success-pix">
        <h3>Pagamento via PIX</h3>
        <div class="pix-qrcode">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT40QruIjkJOb2gAp21E3UVciFQt-unMlHX2Q&usqp=CAU">
        </div>
        <p class="pix-code">PIX Copia e Cola:</p>
        <div class="pix-code-box">
          <code>00020126580014BR.GOV.BCB.PIX0136${order.id}5204000053039865802BR5925DEVSURF COMERCIO ELETRON6014RIO DE JANEIRO62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}</code>
          <button class="copy-pix-btn" onclick="copyPixCode()">
            Copiar
          </button>
        </div>
        <p class="pix-expiry">Código válido por 30 minutos</p>
      </div>
    ` : 
    checkoutData.payment.method === 'boleto' ?
    `
      <div class="success-boleto">
        <h3>Boleto Bancário</h3>
        <p>O boleto foi gerado e enviado para seu e-mail.</p>
        <button class="download-boleto-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Baixar Boleto
        </button>
        <p class="boleto-expiry">Vencimento: ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}</p>
      </div>
    ` : '';
  
checkoutContent.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      
      <h1>Pedido Confirmado!</h1>
      <p class="order-number">Pedido #${order.id}</p>
      
      <div class="success-message">
        <p>Obrigado pela sua compra, ${checkoutData.customer.name.split(' ')[0]}! 🎉</p>
        <p>Enviamos a confirmação para <strong>${checkoutData.customer.email}</strong></p>
      </div>
      
      ${paymentInfo}
      
      <div class="success-actions">
        <a href="index.html" class="btn-primary">
          Voltar para Home
        </a>
        <button class="btn-secondary" onclick="window.print()">
          Imprimir Pedido
        </button>
      </div>
      
      <div class="success-footer">
        <p>Acompanhe seu pedido pelo e-mail ou entre em contato conosco</p>
        <p><strong>SAC:</strong> (21) 3000-0000 | <strong>WhatsApp:</strong> (21) 99999-9999</p>
      </div>
    </div>
  `;
  }

// ─────────────────────────────────────────────
// COPIAR CÓDIGO PIX
// ─────────────────────────────────────────────
function copyPixCode() {
  const code = document.querySelector('.pix-code-box code')?.textContent;
  if (!code) return;
  
  navigator.clipboard.writeText(code).then(() => {
    showToast('Código PIX copiado!', 'success');
  }).catch(() => {
    showToast('Erro ao copiar código', 'error');
  });
}

// ─────────────────────────────────────────────
// NOTIFICAÇÃO TOAST
// ─────────────────────────────────────────────
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `devsurf-toast ${type}`;
  
  const icon = type === 'success' ? 
    `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>` :
    `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>`;
  
  toast.innerHTML = `${icon}<span>${message}</span>`;
  
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏄 DevSurf Checkout - Inicializando...');
  
  // Verificar se há itens no carrinho
  const cart = JSON.parse(localStorage.getItem('devsurf_cart') || '[]');
  if (cart.length === 0) {
    window.location.href = 'index.html';
    return;
  }
  
  // Renderizar resumo do pedido
  renderOrderSummary();
  
  // Atualizar indicador de progresso
  updateProgressIndicator();
  
  // ─────────────────────────────────────────────
  // EVENT LISTENERS - DADOS PESSOAIS
  // ─────────────────────────────────────────────
  const customerName = $('#customerName');
  const customerEmail = $('#customerEmail');
  const customerPhone = $('#customerPhone');
  const customerCPF = $('#customerCPF');
  
  if (customerPhone) {
    customerPhone.addEventListener('input', (e) => {
      e.target.value = maskPhone(e.target.value);
    });
  }
  
  if (customerCPF) {
    customerCPF.addEventListener('input', (e) => {
      e.target.value = maskCPF(e.target.value);
    });
    
    customerCPF.addEventListener('blur', (e) => {
      if (e.target.value && !validateCPF(e.target.value)) {
        markFieldError('#customerCPF');
        showToast('CPF inválido', 'error');
      } else {
        markFieldValid('#customerCPF');
      }
    });
  }
  
  if (customerEmail) {
    customerEmail.addEventListener('blur', (e) => {
      if (e.target.value && !validateEmail(e.target.value)) {
        markFieldError('#customerEmail');
        showToast('E-mail inválido', 'error');
      } else {
        markFieldValid('#customerEmail');
      }
    });
  }
  
  // ─────────────────────────────────────────────
  // EVENT LISTENERS - ENDEREÇO
  // ─────────────────────────────────────────────
  const addressCEP = $('#addressCEP');
  
  if (addressCEP) {
    addressCEP.addEventListener('input', (e) => {
      e.target.value = maskCEP(e.target.value);
    });
    
    addressCEP.addEventListener('blur', async (e) => {
      const cep = e.target.value;
      
      if (validateCEP(cep)) {
        showToast('Buscando endereço...', 'info');
        
        const data = await fetchCEP(cep);
        
        if (data) {
          const addressStreet = $('#addressStreet');
          const addressNeighborhood = $('#addressNeighborhood');
          const addressCity = $('#addressCity');
          const addressState = $('#addressState');
          
          if (addressStreet) addressStreet.value = data.street;
          if (addressNeighborhood) addressNeighborhood.value = data.neighborhood;
          if (addressCity) addressCity.value = data.city;
          if (addressState) addressState.value = data.state;
          
          markFieldValid('#addressCEP');
          showToast('Endereço encontrado!', 'success');
          
          // Focar no campo número
          $('#addressNumber')?.focus();
        } else {
          markFieldError('#addressCEP');
          showToast('CEP não encontrado', 'error');
        }
      }
    });
  }
  
  // ─────────────────────────────────────────────
  // EVENT LISTENERS - FRETE
  // ─────────────────────────────────────────────
  $$('input[name="shipping"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      checkoutData.shipping.method = e.target.value;
      // guarda o preço base; updateTotals vai zerá-lo se subtotal >= threshold
      checkoutData.shipping.price = SHIPPING_OPTIONS[e.target.value].price;
      updateTotals();
    });
  });
  
  // Definir frete padrão e calcular totais pela primeira vez
  checkoutData.shipping.method = 'standard';
  checkoutData.shipping.price  = SHIPPING_OPTIONS.standard.price;
  updateTotals();
  
  // ─────────────────────────────────────────────
  // EVENT LISTENERS - PAGAMENTO
  // ─────────────────────────────────────────────
  $$('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      checkoutData.payment.method = e.target.value;
      renderPaymentOptions();
    });
  });
  
  const cardNumber = $('#cardNumber');
  const cardExpiry = $('#cardExpiry');
  const cardCVV = $('#cardCVV');
  const installments = $('#installments');
  
  if (cardNumber) {
    cardNumber.addEventListener('input', (e) => {
      e.target.value = maskCardNumber(e.target.value);
    });
  }
  
  if (cardExpiry) {
    cardExpiry.addEventListener('input', (e) => {
      e.target.value = maskCardExpiry(e.target.value);
    });
  }
  
  if (cardCVV) {
    cardCVV.addEventListener('input', (e) => {
      e.target.value = maskCVV(e.target.value);
    });
  }
  
  if (installments) {
    installments.addEventListener('change', (e) => {
      checkoutData.payment.installments = parseInt(e.target.value);
    });
  }
  
  // ─────────────────────────────────────────────
  // EVENT LISTENERS - NAVEGAÇÃO
  // ─────────────────────────────────────────────
  const nextStep1 = $('#nextStep1');
  const nextStep2 = $('#nextStep2');
  const nextStep3 = $('#nextStep3');
  const prevStep2 = $('#prevStep2');
  const prevStep3 = $('#prevStep3');
  const prevStep4 = $('#prevStep4');
  const finishBtn = $('#finishOrderBtn');
  
  if (nextStep1) nextStep1.addEventListener('click', () => goToStep(2));
  if (nextStep2) nextStep2.addEventListener('click', () => goToStep(3));
  if (nextStep3) nextStep3.addEventListener('click', () => goToStep(4));
  
  if (prevStep2) prevStep2.addEventListener('click', () => goToStep(1));
  if (prevStep3) prevStep3.addEventListener('click', () => goToStep(2));
  if (prevStep4) prevStep4.addEventListener('click', () => goToStep(3));
  
  if (finishBtn) finishBtn.addEventListener('click', finishOrder);
  
  console.log('✅ DevSurf Checkout - Carregado com sucesso!');
});