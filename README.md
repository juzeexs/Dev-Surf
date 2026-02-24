# 🏄‍♂️ DevSurf - E-commerce de Surf

O **DevSurf** é uma plataforma de e-commerce moderna, rápida e totalmente responsiva dedicada ao estilo de vida do surf. O projeto oferece uma experiência de compra completa, simulando desde a escolha de produtos de marcas como Quiksilver e Hurley até a finalização do pagamento.

---

## 🌐 Acesse o Projeto
O site está publicado e pode ser acessado pelo link abaixo:
👉 **[https://devsurf.netlify.app/](https://devsurf.netlify.app/)**

---

## 🚀 Funcionalidades Principais

### 🛍️ Experiência de Loja (Storefront)
- **Catálogo Dinâmico:** Listagem de produtos com preços, descontos e descrições detalhadas.
- **Busca e Filtros:** Sistema de busca em tempo real e filtragem por categorias.
- **Carrinho Inteligente:** Gerenciamento de itens (adicionar, remover, alterar quantidade) com persistência via `localStorage`.
- **Animações de Scroll:** Efeito de entrada suave dos produtos utilizando `Intersection Observer`.

### 💳 Checkout de Alta Performance (Multi-step)
- **Fluxo em 4 Etapas:** Identificação, Endereço, Frete e Pagamento.
- **Validação de Frete:** Lógica de **Frete Grátis** para compras acima de R$ 299,00.
- **Máscaras de Input:** Formatação automática para CPF, Telefone, CEP e Cartão de Crédito.
- **Simulador de Pagamento:** Suporte visual para PIX (com geração de QR Code), Boleto e Cartão (com parcelamento).

---

## 🛠️ Tecnologias e Ferramentas

Para garantir leveza e performance, o projeto foi desenvolvido sem frameworks pesados:

- **Frontend:** HTML5 Semântico e CSS3 (Variáveis, Flexbox, Grid).
- **Lógica:** JavaScript Vanilla (ES6+).
- **Design:** Tipografia via Google Fonts (Bebas Neue & Montserrat).
- **Ícones:** SVG inline e Lucide-style icons para uma interface limpa.

---

## 📂 Organização dos Arquivos

```text
├── index.html          # Home e Vitrine de Produtos
├── checkout.html       # Estrutura do checkout em etapas
├── style.css           # Estilização global e componentes da loja
├── checkout.css        # Estilos específicos do fluxo de pagamento
├── script.js           # Lógica do carrinho, filtros e animações
└── checkout.js         # Inteligência do formulário, frete e máscaras
