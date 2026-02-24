# 🏄‍♂️ DevSurf - E-commerce de Surf

O **DevSurf** é uma plataforma de e-commerce moderna e responsiva focada no nicho de surf, desenvolvida com tecnologias web nativas. O projeto simula uma experiência completa de compra, desde a vitrine de produtos até um checkout dinâmico de múltiplos passos.



## 🚀 Funcionalidades

### 🛒 Experiência do Usuário
- **Vitrine Dinâmica:** Listagem de produtos com filtros e sistema de busca em tempo real.
- **Carrinho de Compras:** Adição/remoção de itens, controle de quantidade e cálculo automático de subtotal.
- **Animações Fluidas:** Interface com transições suaves e efeitos de scroll para uma navegação premium.
- **Totalmente Responsivo:** Design adaptado para dispositivos móveis, tablets e desktops.

### 💳 Sistema de Checkout (Multi-step)
- **Passo 1 (Identificação):** Coleta de dados básicos do cliente.
- **Passo 2 (Entrega):** Integração visual para endereço com lógica de frete.
- **Passo 3 (Frete):** Cálculo dinâmico (Padrão vs Expresso) com regra de **Frete Grátis** para compras acima de R$ 299,00.
- **Passo 4 (Pagamento):** Simulação de pagamento via Cartão de Crédito, PIX ou Boleto, incluindo máscaras de entrada (CPF, Cartão, Data).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando o "Vanilla Stack" (sem frameworks pesados) para garantir máxima performance:

- **HTML5:** Estrutura semântica e acessível.
- **CSS3:** Estilização avançada com Variáveis CSS, Flexbox, Grid e Keyframe Animations.
- **JavaScript (ES6+):** Manipulação de DOM, lógica de negócio do carrinho, máscaras de formulário e persistência de dados.
- **Google Fonts:** Tipografia selecionada (Bebas Neue & Inter) para identidade visual forte.

---

## 📂 Estrutura do Projeto

```text
├── index.html          # Página principal / Vitrine
├── checkout.html       # Fluxo de finalização de compra
├── style.css           # Estilos globais e da vitrine
├── checkout.css        # Estilos específicos do processo de pagamento
├── script.js           # Lógica da loja, filtros e carrinho
└── checkout.js         # Lógica do formulário multi-etapas e frete
