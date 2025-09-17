// ==========================
// IMPORTAÇÕES DOS MÓDULOS
// ==========================
import { UserInfo } from "./UserInfo.js";
//import { PopupWithImage, PopupWithForm } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForms.js";
import Api from "./Api.js";

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

// ==========================
// POPUP DE IMAGEM (visualização)
// ==========================
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

// ==================================================================
// FUNÇÃO: Define os eventos de cada card (abrir imagem, deletar card)
// ==================================================================
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
        // Aqui você pode adicionar uma mensagem visual de erro
      });
  });
}

// ==========================
// GERENCIAMENTO DE USUÁRIO
// ==========================
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

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

// ===============================================
// POPUP: Adicionar novo card
// ===============================================
const addPopup = new PopupWithForm("#addCard", (formData) => {
  const newCard = createCard(formData);
  galleryContainer.prepend(newCard); // adiciona no topo da galeria
  addPopup.close();
});

addPopup.setEventListeners();

// Botão para abrir popup de adicionar card
const addButton = document.getElementById("add__button");
addButton.addEventListener("click", () => addPopup.open());
