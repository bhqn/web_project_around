import { UserInfo } from "./UserInfo.js";
//import { PopupWithImage, PopupWithForm } from "./Popup.js";
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForms.js';

// ----- POPUP DE IMAGEM -----
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();


export function setCardEventListeners(cardElement, link, name) {
  // Abrir popup ao clicar na imagem
  cardElement.querySelector(".gallery__image").addEventListener("click", () => {
    imagePopup.open({ link, name });
  });

  // Remover card
  const removeButton = cardElement.querySelector(".card__button-remove");
  if (removeButton) {
    removeButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }

  // Like
  const likeButton = cardElement.querySelector(".card__button");
  if (likeButton) {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__button--active");
    });
  }
}

// ----- USER INFO -----
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

// Popup de edição do perfil
const editPopup = new PopupWithForm("#editCard", (formData) => {
  userInfo.setUserInfo({
    name: formData.name.trim(),
    description: formData.description.trim(),
  });
  editPopup.close();
});
editPopup.setEventListeners();

// Botão abrir popup de edição
const openButton = document.getElementById("open__button_edit");
openButton.addEventListener("click", () => editPopup.open());

// ----- CRIAR CARDS -----
const galleryContainer = document.querySelector(".gallery");

function createCard({ place, image }) {
  const template = document.getElementById("card-template").content.cloneNode(true);
  const cardElement = template.querySelector(".gallery__item");

  const cardImage = cardElement.querySelector(".gallery__image");
  const cardTitle = cardElement.querySelector(".gallery__title");

  cardImage.src = image;
  cardImage.alt = place;
  cardTitle.textContent = place;

  setCardEventListeners(cardElement, image, place);

  return cardElement;
}

// ----- POPUP DE ADICIONAR CARD -----
const addPopup = new PopupWithForm("#addCard", (formData) => {
  const newCard = createCard(formData);
  galleryContainer.prepend(newCard); // adiciona no topo da lista
  addPopup.close();
});
addPopup.setEventListeners();

// Botão abrir popup de adicionar card
const addButton = document.getElementById("add__button");
addButton.addEventListener("click", () => addPopup.open());


