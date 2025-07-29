import { Card } from "./card.js";

export function setCardEventListeners(cardElement, link, name) {
  // Evento para abrir o popup ao clicar na imagem
  cardElement.querySelector(".gallery__image").addEventListener("click", () => {
    const popup = document.querySelector(".popup");
    const popupImage = document.querySelector(".popup__image");
    const popupTitle = document.querySelector(".popup__title");
    const closeButtonPopup = document.getElementById("closePopUpButton");

    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
    popup.style.display = "block";

    if (closeButtonPopup) {
      closeButtonPopup.onclick = () => {
        popup.style.display = "none";
      };
    }
  });

  // Evento para remover o card ao clicar no botão de remover
  const removeButton = cardElement.querySelector(".card__button-remove");
  if (removeButton) {
    removeButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }

  // Evento para curtir/descurtir o card
  const likeButton = cardElement.querySelector(".card__button");
  if (likeButton) {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__button--active");
    });
  }
}

export function openModal(modal) {
  modal.style.display = "block";
}

export function closeModal(modal) {
  modal.style.display = "none";
}

const openButton = document.getElementById("open__button_edit");
const editCard = document.getElementById("editCard");
const closeButton = document.getElementById("buttonclose");
const inputName = document.querySelector(".form__input_name");
const inputDescription = document.querySelector(".form__input_description");
const form = document.querySelector(".form");

// Elementos onde os valores serão exibidos
const displayName = document.querySelector(".profile__name");
const displayDescription = document.querySelector(".profile__description");

// Abre o form
openButton.addEventListener("click", function () {
  editCard.style.display = "block";
});

// Fecha o form
closeButton.addEventListener("click", function () {
  editCard.style.display = "none";
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  // Atualiza os elementos de exibição com os valores dos inputs
  displayName.textContent = inputName.value;
  displayDescription.textContent = inputDescription.value;

  // Fecha o formulário após o envio
  editCard.style.display = "none";
}

// Adiciona o event listener ao formulário
form.addEventListener("submit", handleFormSubmit);

const closeButtonPopup = document.getElementById("closePopUpButton");
const openPopup = document.querySelector(".gallery__image");
const popup = document.querySelector(".popup");

closeButtonPopup.addEventListener("click", function () {
  popup.style.display = "none";
});

// abrir add image

const addButton = document.getElementById("add__button");
const addCard = document.getElementById("addCard");
const closeAddButton = document.getElementById("closeAddButton");
const placeInput = document.querySelector(".form__input-place");
const srcInput = document.querySelector(".form__input_src");
const savePlace = document.getElementById("save__place");
const placeForm = document.getElementById("form__place");

//abrir card
addButton.addEventListener("click", function () {
  addCard.style.display = "block";
});

// fechar card
closeAddButton.addEventListener("click", function () {
  addCard.style.display = "none";
});

// adicionar card via formualario
// evento de salvar formulario

const galleryContainer = document.getElementById("gallery-container");

placeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const place = placeInput.value.trim();
  const link = srcInput.value.trim();

  if (place && link) {
    const newCard = { name: place, link };
    const card = new Card(newCard, "#gallery__template");
    const cardElement = card.generateCard();
    setCardEventListeners(cardElement, link, place);
    galleryContainer.prepend(cardElement);

    placeInput.value = "";
    srcInput.value = "";
    addCard.style.display = "none";
  }
});
