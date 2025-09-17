// ==========================
// IMPORTAÇÕES DOS MÓDULOS
// ==========================
import Api from "./Api.js";
import { Card } from "./Card.js";
import { setCardEventListeners } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForms.js";

// ==========================
// CONFIGURAÇÃO DA API
// ==========================
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "c2b29e92-9f38-419a-be2d-1ca3d5baf512",
    "Content-Type": "application/json",
  },
});

// =======================================
// GERENCIAMENTO DE USUÁRIO
// =======================================
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

// ==========================
// POPUP DE IMAGEM (visualização)
// ==========================
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

// ===============================================
// POPUP: Editar perfil do usuário
// ===============================================
const editPopup = new PopupWithForm("#editCard", (formData) => {
  api
    .updateUserInfo({
      name: formData.name.trim(),
      about: formData.description.trim(),
    })
    .then((updateUserdata) => {
      userInfo.setUserInfo({
        name: updateUserdata.name,
        description: updateUserdata.about,
      });
      editPopup.close();
    })
    .catch((err) => {
      console.log("Erro ao atualizar o perfil:", err);
      // Aqui você pode exibir uma mensagem de erro para o usuário
    });
});

editPopup.setEventListeners();

// Botão para abrir popup de edição de perfil
const openButton = document.getElementById("open__button_edit");
openButton.addEventListener("click", () => editPopup.open());

// =======================================
// GERENCIAMENTO DE CARDS
// =======================================

// Função para gerar um card individual
function generateCard(data) {
  const card = new Card(data, "#gallery__template", api);
  const cardElement = card.generateCard();
  cardElement.id = data._id; // Define o ID no DOM
  setCardEventListeners(cardElement, data.link, data.name, api, imagePopup); // Eventos (like, deletar, etc.)
  return cardElement;
}

// Instancia Section para renderizar a galeria de cards
const cardSection = new Section(
  {
    renderer: (data) => {
      cardSection.addItem(generateCard(data));
    },
  },
  "#gallery-container"
);

// Requisição inicial: dados do usuário e cards
api.getAppInfo().then(([resultCards, userData]) => {
  userData.description = userData.about;
  userInfo.setUserInfo(userData);           // Atualiza informações do usuário
  cardSection.renderItems(resultCards);     // Renderiza os cards na galeria
  console.log(userData.name, userData.about);
  
});


// ==============================
// POPUP: Adição de novo card
// ==============================
const addPopup = new PopupWithForm("#addCard", (formData) => {
  // DEBUG: Verifique quais campos o formulário está enviando
  console.log("Dados do formulário recebidos:", formData);
  
  // Mapeie os campos do formulário para os campos que a API espera
  // Supondo que seu formulário tenha inputs com name="place" e name="src"
  const newCard = { 
    name: formData.place,    // O campo 'place' do formulário vira 'name' para a API
    link: formData.image       // O campo 'src' do formulário vira 'link' para a API
  };
  
  console.log("Dados enviados para API:", newCard);
  
  // Validação básica
  if (!newCard.name || !newCard.link) {
    console.error("Dados incompletos:", newCard);
    return;
  }
  
  api
    .createCard(newCard)
    .then((createdCard) => {
      console.log("Card criado com sucesso:", createdCard);
      const cardElement = generateCard(createdCard);
      cardSection.addItem(cardElement);
      addPopup.close();
    })
    .catch((err) => {
      console.log("Erro detalhado ao criar card:", err);
      // Tente obter mais detalhes do erro
      if (err.response) {
        err.response.json().then(errorData => {
          console.log("Detalhes do erro da API:", errorData);
        }).catch(parseError => {
          console.log("Erro ao parsear resposta de erro:", parseError);
        });
      }
    });
});
addPopup.setEventListeners();

// Botão para abrir popup de adicionar card
const addButton = document.getElementById("add__button");
addButton.addEventListener("click", () => addPopup.open());

// ==============================
// VALIDAÇÃO DE FORMULÁRIOS
// ==============================
new FormValidator({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".edit__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});