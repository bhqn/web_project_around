// ==========================
// FUNÇÃO: Define os eventos de cada card (abrir imagem, deletar card)
// ==========================
export function setCardEventListeners(cardElement, link, name, api, imagePopup) {
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