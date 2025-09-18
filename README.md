🌍 Tripleten - Web Project Around
📦 Sprint 12 - Projeto Around (com Classes e API)
🔗 Acesse o projeto: Projeto Around

🧠 Descrição

Projeto desenvolvido como parte do curso da Tripleten, no módulo de desenvolvimento web, atualizado até a Sprint 12.
O projeto é uma galeria interativa que permite ao usuário editar seu perfil, curtir/remover imagens, visualizar fotos em tamanho ampliado e adicionar novas imagens com validação de formulário.

A partir da Sprint 10, o código foi refatorado utilizando classes JavaScript para promover uma estrutura mais modular, reutilizável e orientada a objetos.
Na Sprint 12, o projeto foi atualizado para puxar os dados da API, tornando a galeria dinâmica e sincronizada com um backend.

🛠️ Funcionalidades
✅ Edição de Perfil

O botão de edição abre um formulário.

Ao enviar, o nome e a descrição do perfil são atualizados dinamicamente.

O formulário é validado e fechado após envio com sucesso.

Dados do usuário agora são carregados da API, garantindo persistência.

✅ Cards de Galeria

Os cards são gerados dinamicamente a partir da classe Card.

Cada instância de Card possui:

Imagem com clique ampliável

Título do local

Botão de curtir (like)

Botão de remoção

Os cards agora são carregados da API e qualquer alteração é refletida no backend.

✅ Like Interativo

O botão de like alterna entre os estados ativo/inativo.

A classe card__button--active é aplicada para alterar visualmente o botão (via CSS).

Likes são sincronizados com a API.

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

O novo card é enviado para a API, garantindo persistência

✅ Validação de Formulários

A validação dos formulários é realizada por meio da classe FormValidator.

A classe verifica:

Campos vazios

Tamanho mínimo e máximo

URLs válidas

Erros são exibidos dinamicamente com mensagens claras e acessíveis.

📦 Estrutura Modular

Card: Classe que representa cada card da galeria, encapsulando criação, eventos e comportamento.

FormValidator: Classe reutilizável para validação de formulários, com suporte a múltiplos formulários no projeto.

Api: Nova classe responsável por buscar, criar, atualizar e remover dados do backend.

utils.js: Contém funções auxiliares para manipulação de DOM e eventos.

initialCards[]: Array inicial removido — agora os cards vêm da API.

📂 Principais Arquivos
WEB_PROJECT_AROUND/
├── index.html                     ← Página principal
├── README.md                       ← Documentação do projeto
├── package.json                    ← Dependências e scripts do projeto
├── package-lock.json               ← Registro exato das versões das dependências
├── favicon.ico                     ← Ícone do site
├── .editorconfig                   ← Configurações do editor
├── .gitignore                      ← Arquivos ignorados pelo Git
├── .prettierignore                 ← Arquivos ignorados pelo Prettier
├── blocks/                         ← Componentes ou blocos de layout (HTML/CSS)
├── fonts/                          ← Fontes utilizadas no projeto
├── images/                         ← Imagens estáticas
├── node_modules/                   ← Dependências instaladas via npm
├── pages/                          ← Páginas adicionais (se houver)
├── scripts/                        ← Scripts JavaScript
│   ├── Api.js                      ← Classe Api para comunicação com backend
│   ├── Card.js                     ← Classe Card para gerenciar os cards da galeria
│   ├── FormValidator.js            ← Classe FormValidator para validação de formulários
│   ├── index.js                     ← Script principal, inicializa o projeto
│   ├── Popup.js                     ← Classe base para popups
│   ├── PopupWithForms.js            ← Popup para formulários
│   ├── PopupWithImage.js            ← Popup para imagens ampliadas
│   ├── Section.js                   ← Classe Section para renderizar listas/cards
│   ├── UserInfo.js                  ← Classe UserInfo para perfil do usuário
│   └── utils.js                     ← Funções auxiliares de DOM e eventos
└── vendor/                          ← Bibliotecas de terceiros (se houver)


🧪 Tecnologias Utilizadas

HTML5

CSS3 (flexbox, hover, mask-image)

JavaScript (ES6+): Classes, Módulos, Template Literals

Git e GitHub

GitHub Pages para deploy

API REST para persistência de dados

🚀 Deploy

O projeto está publicado via GitHub Pages:
🔗 https://bhqn.github.io/web_project_around/

🙌 Créditos

Projeto desenvolvido no curso da Tripleten
Aluno: Bernardo Quintanilha
Sprint atual: Sprint 12 – Refatoração com Classes e Integração com API