const addButton = document.getElementById("add__button");
const addCard = document.getElementById("addCard");
const closeAddButton = document.getElementById("closeAddButton");


//abrir card
addButton.onclick = () => addCard.style.display = 'block';

// fechar card 


closeAddButton.onclick = () => addCard.style.display = 'none';