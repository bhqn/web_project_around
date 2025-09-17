import { UserInfo } from "./UserInfo.js";
//import { PopupWithImage, PopupWithForm } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForms.js";
import Api from "./Api.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "c2b29e92-9f38-419a-be2d-1ca3d5baf512",
    "Content-Type": "application/json",
  },
});

// ----- POPUP DE IMAGEM -----
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

export function setCardEventListeners(cardElement, link, name, api) {
  // Abrir popup ao clicar na imagem
  cardElement.querySelector(".gallery__image").addEventListener("click", () => {
    imagePopup.open({ link, name });
  });

  // Remover card
  const removeButton = cardElement.querySelector(".card__button-remove");
  removeButton.addEventListener("click", () => {
    api
      .removeCard(cardElement.id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log("Erro ao remover card:", err);
        // caso ocorra um erro
      });
  });

}

// ----- USER INFO -----
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

const editPopup = new PopupWithForm("#editCard", (formData) => {
  // Chama a API para atualizar o perfil
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
      console.log("erro ao atualizar o perfil:", err);
      // Aqui você pode mostrar um erro na interface, se quiser
    });
});
editPopup.setEventListeners();

// Botão abrir popup de edição
const openButton = document.getElementById("open__button_edit");
openButton.addEventListener("click", () => editPopup.open());

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
