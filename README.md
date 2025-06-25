# 🌍 Tripleten - Web Project Around  
### 📦 Sprint 7 - Projeto Around  
🔗 [Acesse o projeto](https://bhqn.github.io/web_project_around/)

## 🧠 Descrição

Projeto desenvolvido como parte do curso da **Tripleten**, no módulo de desenvolvimento web, Sprint 7.  
Este projeto é uma galeria interativa onde o usuário pode:

- Editar seu perfil (nome e descrição)
- Curtir e remover cards
- Visualizar imagens em tamanho ampliado (popup)
- Adicionar novas imagens personalizadas por meio de um formulário

## 🛠️ Funcionalidades

### ✅ Edição de Perfil
- O botão de edição abre um formulário.
- Ao enviar, o nome e a descrição do perfil são atualizados na tela.
- O formulário é fechado automaticamente após o envio.

### ✅ Cards de Galeria
- Os cards são gerados dinamicamente a partir do array `initialCards`.
- Cada card contém:
  - Imagem
  - Título
  - Botão de curtir (like)
  - Botão de remoção
- Ao clicar na imagem, um popup é exibido com ela em destaque.

### ✅ Like Interativo
- O botão de like alterna entre os estados ativado/desativado com uma classe CSS (`card__button--active`), que pode alterar ícone ou cor via `mask`.

### ✅ Popup de Imagem
- Ao clicar em uma imagem, é exibido um popup com:
  - A imagem em tamanho maior
  - O nome do local
- Um botão `X` permite fechar o popup.

### ✅ Adição de Novos Cards
- Botão "Adicionar" abre um formulário com inputs:
  - Nome do local
  - URL da imagem
- Ao enviar:
  - O novo card é adicionado ao início da galeria
  - O formulário é fechado
  - Os inputs são limpos

## 📂 Estrutura do Código (principais elementos)

- `initialCards[]`: Array com os dados iniciais da galeria.
- `createGalleryCard()`: Função que gera e insere dinamicamente um card no DOM.
- `form.addEventListener('submit')`: Lida com a edição de perfil.
- `placeForm.addEventListener('submit')`: Lida com a adição de novos cards.
- `likeButton.addEventListener('click')`: Ativa/desativa o botão de curtir.
- `removeButton.addEventListener('click')`: Remove o card.
- `image.addEventListener('click')`: Abre o popup com a imagem ampliada.

## 🧪 Tecnologias Utilizadas

- HTML5
- CSS3 (com uso de `mask` e `hover`)
- JavaScript Vanilla (sem bibliotecas externas)
- GitHub Pages para deploy

## 📌 Deploy

O projeto está hospedado via **GitHub Pages**.  
Acesse em: [https://bhqn.github.io/web_project_around/](https://bhqn.github.io/web_project_around/)

---

## 🙌 Créditos

Este projeto foi desenvolvido como parte do curso da [Tripleten](https://tripleten.com/)  
Aluno: Bernardo Quintanilha  
Sprint 8 - Projeto Around

