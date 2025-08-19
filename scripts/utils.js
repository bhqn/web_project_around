import { UserInfo } from "./UserInfo.js";

export function setCardEventListeners(cardElement, link, name) {
  // Evento para abrir o popup ao clicar na imagem
  cardElement.querySelector(".gallery__image").addEventListener("click", () => {
    //const popup = document.querySelector(".popup");
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

// Abre o form
openButton.addEventListener("click", function () {
  editCard.style.display = "block";
});

// Fecha o form
closeButton.addEventListener("click", function () {
  editCard.style.display = "none";
});

// Adiciona o event listener ao formulário
form.addEventListener("submit", handleFormSubmit);

//const closeButtonPopup = document.getElementById("closePopUpButton");
//const openPopup = document.querySelector(".gallery__image");
const popup = document.querySelector(".popup");

//closeButtonPopup.addEventListener("click", function () {
//  popup.style.display = "none";
//});

// abrir add image

const addButton = document.getElementById("add__button");
const addCard = document.getElementById("addCard");
const closeAddButton = document.getElementById("closeAddButton");
//const placeInput = document.querySelector(".form__input-place");
//const srcInput = document.querySelector(".form__input_src");
//const savePlace = document.getElementById("save__place");
//const placeForm = document.getElementById("form__place");

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

// Instanciar Section para a galeria

// Adicionar novo card via formulário usando Section

//parte de USERINFO

// funcoes do userinfo retiradas  mantive apenas  funcoes de tela e ajustes
function handleFormSubmit(evt) {
  evt.preventDefault();

  userInfo.setUserInfo({
    name: inputName.value.trim(),
    description: inputDescription.value.trim(),
  });

  editCard.style.display = "none";
}

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

// Para obter os dados do usuário:
const dados = userInfo.getUserInfo();

// Para atualizar os dados do usuário:
userInfo.setUserInfo({ name: "Jacques Cousteu", description: "Explorador" });
