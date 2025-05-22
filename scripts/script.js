const openButton = document.getElementById("open__button_edit");
const editCard = document.getElementById("editCard");
const closeButton = document.getElementById("buttonclose");

const inputName = document.querySelector('.form__input_name');
const inputDescription = document.querySelector('.form__input_description');
const form = document.querySelector('.edit__form');

// Elementos onde os valores serão exibidos
const displayName = document.querySelector('.profile__name'); 
const displayDescription = document.querySelector('.profile__description');
// Abre o form
openButton.onclick = function() {
  editCard.style.display = 'block';
}

// Fecha o form
closeButton.onclick = function() {
  editCard.style.display = 'none';
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  
  // Atualiza os elementos de exibição com os valores dos inputs
  displayName.textContent = inputName.value;
  displayDescription.textContent = inputDescription.value;
  
  // Fecha o formulário após o envio
  editCard.style.display = 'none';
}

// Adiciona o event listener ao formulário
form.addEventListener('submit', handleFormSubmit);