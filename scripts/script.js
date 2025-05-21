const openButton = document.getElementById("open__button_edit");
const editCard = document.getElementById("editCard")
const closeButton = document.getElementById("buttonclose");

openButton.onclick = function() {
  editCard.style.display = 'block';
}

closeButton.onclick = function(){
    editCard.style.display='none';
}