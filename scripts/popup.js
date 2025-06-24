const closeButtonPopup = document.getElementById("closePopUpButton"); 
const openPopup = document.querySelector(".gallery__image"); 
const popup = document.querySelector(".popup"); 

openPopup.onclick = () => {
    popup.style.display = "block"; 
    console.log('popup');
};

closeButtonPopup.onclick = () => {
    popup.style.display = "none";
};