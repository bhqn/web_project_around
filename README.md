🌍 Tripleten - Web Project Around
📦 Sprint 10 - Projeto Around (com Classes)
🔗 Acesse o projeto

🧠 Descrição
Projeto desenvolvido como parte do curso da Tripleten, no módulo de desenvolvimento web, atualizado até a Sprint 10.
O projeto é uma galeria interativa que permite ao usuário editar seu perfil, curtir/remover imagens, visualizar fotos em tamanho ampliado e adicionar novas imagens com validação de formulário.

A partir da Sprint 10, o código foi refatorado utilizando classes JavaScript para promover uma estrutura mais modular, reutilizável e orientada a objetos.

🛠️ Funcionalidades
✅ Edição de Perfil
O botão de edição abre um formulário.

Ao enviar, o nome e a descrição do perfil são atualizados dinamicamente.

O formulário é validado e fechado após envio com sucesso.

✅ Cards de Galeria
Os cards são gerados dinamicamente a partir de uma classe Card.

Cada instância de Card possui:

Imagem com clique ampliável

Título do local

Botão de curtir (like)

Botão de remoção

✅ Like Interativo
O botão de like alterna entre os estados ativo/inativo.

A classe card__button--active é aplicada para alterar visualmente o botão (via CSS).

✅ Popup de Imagem
Clicar em uma imagem de um card abre um popup modal com:

Imagem em alta resolução

Nome do local

Botão de fechar

✅ Adição de Novos Cards
Botão "Adicionar" abre um formulário com inputs:

Nome do local

URL da imagem

Ao enviar:

Um novo card é adicionado ao início da galeria

O formulário é validado e fechado

Os campos são resetados

✅ Validação de Formulários
A validação dos formulários agora é realizada por meio da classe FormValidator.

A classe verifica:

Campos vazios

Tamanho mínimo e máximo

URLs válidas

Erros são exibidos dinamicamente com mensagens claras e acessíveis.

📦 Estrutura Modular
Card: Classe que representa cada card da galeria, encapsulando criação, eventos e comportamento.

FormValidator: Classe reutilizável para validação de formulários, com suporte a múltiplos formulários no projeto.

initialCards[]: Array com os dados iniciais da galeria.

utils.js: Contém funções auxiliares para manipulação de DOM e eventos.

📂 Principais Arquivos
pgsql
Copiar
Editar
├── index.html
├── index.js
├── card.js             ← Classe Card
├── formValidator.js    ← Classe FormValidator
├── utils.js
├── styles/
│   └── style.css
└── assets/
🧪 Tecnologias Utilizadas
HTML5

CSS3

mask-image, hover, flexbox

JavaScript (ES6+)

Classes, Módulos, Template Literals

Git e GitHub

GitHub Pages para deploy

🚀 Deploy
O projeto está publicado via GitHub Pages:
🔗 https://bhqn.github.io/web_project_around/

🙌 Créditos
Projeto desenvolvido no curso da Tripleten
Aluno: Bernardo Quintanilha
Sprint atual: Sprint 10 - Refatoração com Classes