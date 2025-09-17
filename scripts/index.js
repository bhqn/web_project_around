import Api from "./Api.js";
import { Card } from "./Card.js";
import { setCardEventListeners } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";

//api

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "c2b29e92-9f38-419a-be2d-1ca3d5baf512",
    "Content-Type": "application/json",
  },
});

function generateCard(data) {
  const card = new Card(data, "#gallery__template", api);
  const cardElement = card.generateCard();
  cardElement.id = data._id; // <-- Defina o id aqui!
  setCardEventListeners(cardElement, data.link, data.name, api);
  return cardElement;

  
}

// Instancia Section para a galeria

const cardSection = new Section(
  {
    renderer: (data) => {
      cardSection.addItem(generateCard(data));
    },
  },
  "#gallery-container"
);

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
    api
      .createCard(newCard)
      .then((createdCard) => {
        const cardElement = generateCard(createdCard);
        cardSection.addItem(cardElement);
        placeInput.value = "";
        srcInput.value = "";
        addCard.style.display = "none";
      })
      .catch((err) => {
        console.log("Erro ao criar card:", err);
      });
  }
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

api.getAppInfo().then(([resultCards, userData]) => {
  console.log("Cards data:", resultCards);
  //console.log("User data:", userData);
  userData.description = userData.about;
  userInfo.setUserInfo(userData);
  cardSection.renderItems(resultCards);
  console.log ( "_isLike:",resultCards)
  
});



new FormValidator({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".edit__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
