// ==========================
// IMPORTAÇÕES DOS MÓDULOS
// ==========================
import Api from "./Api.js";
import { Card } from "./Card.js";
import { setCardEventListeners } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";

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

// Requisição inicial: dados do usuário e cards
api.getAppInfo().then(([resultCards, userData]) => {
  userData.description = userData.about;
  userInfo.setUserInfo(userData);           // Atualiza informações do usuário
  cardSection.renderItems(resultCards);     // Renderiza os cards na galeria
  console.log(userData.name, userData.about);
});

// =======================================
// GERENCIAMENTO DE CARDS
// =======================================

// Função para gerar um card individual
function generateCard(data) {
  const card = new Card(data, "#gallery__template", api);
  const cardElement = card.generateCard();
  cardElement.id = data._id; // Define o ID no DOM
  setCardEventListeners(cardElement, data.link, data.name, api); // Eventos (like, deletar, etc.)
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

// Renderiza os cards iniciais (caso não tenha sido feito no getAppInfo)
// cardSection.renderItems(); ← Comentado porque já está sendo feito no getAppInfo

// ==============================
// FORMULÁRIO: Adição de novo card
// ==============================
const placeForm = document.getElementById("form__place");
const placeInput = document.querySelector(".form__input-place");
const srcInput = document.querySelector(".form__input_src");
const addCard = document.getElementById("addCard");

placeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const place = placeInput.value.trim();
  const link = srcInput.value.trim();
  if (place && link) {
    const newCard = { name: place, link };
    api
      .createCard(newCard)
      .then((createdCard) => {
        const cardElement = generateCard(createdCard);
        cardSection.addItem(cardElement); // Adiciona o novo card na galeria
        placeInput.value = "";
        srcInput.value = "";
        addCard.style.display = "none";
      })
      .catch((err) => {
        console.log("Erro ao criar card:", err);
      });
  }
});

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
