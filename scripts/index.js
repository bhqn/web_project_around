
import { Card } from "./Card.js";
import { setCardEventListeners } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";


export const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Instancia Section para a galeria
const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, "#gallery__template");
    const cardElement = card.generateCard();
    setCardEventListeners(cardElement, cardData.link, cardData.name);
    return cardElement;
  }
}, "#gallery-container");

// Renderiza os cards iniciais
cardSection.renderItems();

// Adiciona novo card via formulário
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
    const card = new Card(newCard, "#gallery__template");
    const cardElement = card.generateCard();
    setCardEventListeners(cardElement, link, place);
    cardSection.addItem(cardElement);
    placeInput.value = "";
    srcInput.value = "";
    addCard.style.display = "none";
  }
});

new FormValidator({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".edit__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

