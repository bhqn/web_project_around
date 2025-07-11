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
openButton.addEventListener("click" , function () {
  editCard.style.display = "block";
  

  
});

// Fecha o form
closeButton.addEventListener("click", function () {
  editCard.style.display = "none";
})

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

const initialCards = [
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

function createGalleryCard({ name, link }) {
  const template = document.getElementById("gallery__template");
  const clone = template.content.cloneNode(true);
  const image = clone.querySelector(".gallery__image");
  const title = clone.querySelector(".card__title");
  const removeButton = clone.querySelector(".card__button-remove");
  image.src = link;
  image.alt = name;
  title.textContent = name;

  // configuração do botao de like

  const likeButton = clone.querySelector(".card__button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button--active");
  });

  // configuração botao de remove
  removeButton.addEventListener("click", () => {
    removeButton.closest(".gallery__card").remove();
    console.log("remove");
  });

  // Evento de abrir popup
  image.addEventListener("click", () => {
    const popup = document.querySelector(".popup");
    const popupImage = document.querySelector(".popup__image");
    const popupTitle = document.querySelector(".popup__title");

    // nomeando cards do popup
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;

    popup.style.display = "block";
    console.log("popup aberto");
  });
  document.querySelector(".gallery").prepend(clone);
}

// Gerar todos os cards
initialCards.forEach(createGalleryCard);

//abrir imagem

const closeButtonPopup = document.getElementById("closePopUpButton");
const openPopup = document.querySelector(".gallery__image");
const popup = document.querySelector(".popup");

closeButtonPopup.addEventListener("click" , function () {
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
addButton.addEventListener("click" , function () {addCard.style.display = "block"});

// fechar card
closeAddButton.addEventListener("click" , function () {addCard.style.display = "none"});

// adicionar card via formualario
// evento de salvar formulario

placeForm.addEventListener("submit", function (event) {
  event.preventDefault(); //serve para imperdir o recarregamento da pagina

  const place = placeInput.value.trim(); //tira espaços vazios do inicio e do final caso o usuario coloque
  const link = srcInput.value.trim(); //tira espaços vazios do inicio e do final caso o usuario coloque

  if (place && link) {
    const newCard = { name: place, link };

    // Adiciona ao array (opcional, útil se quiser manter um histórico)
    initialCards.unshift(newCard);
    addCard.style.display = "none";

    // Limpa os campos do formulário
    placeInput.value = "";
    srcInput.value = "";

    createGalleryCard(newCard);
  }
});
 
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === this) { // Verifica se clicou no próprio modal (fora do conteúdo)
      this.style.display = 'none';
    }
  });
});




