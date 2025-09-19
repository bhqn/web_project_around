// ==========================
// FUNÇÃO: Define os eventos de cada card (abrir imagem, deletar card)
// ==========================
export function setCardEventListeners(
  cardElement,
  link,
  name,
  api,
  imagePopup
) {
  // Abrir popup ao clicar na imagem
  cardElement.querySelector(".gallery__image").addEventListener("click", () => {
    imagePopup.open({ link, name });
  });

  // Remover card
  const removeButton = cardElement.querySelector(".card__button-remove");
  removeButton.addEventListener("click", () => {
    const confirm = document.querySelector(".confirm");
    confirm.style.display = "block";

    const confirmBtn = confirmPopup.querySelector(".confirm__button");
    const closeBtn = confirmPopup.querySelector(".confirm__button-close");

    const handleConfirm = () => {
      api
        .removeCard(cardElement.id)
        .then(() => {
          cardElement.remove();

        })
        .catch((err) => {
          console.log("Erro ao remover card:", err);
          // Aqui você pode adicionar uma mensagem visual de erro
        }).finally(() => {
          confirm.style.display = "none";
          cleanup();
        });
        ;

      
    };

    const handleClose = () => {
      confirmPopup.style.display = "none";
      cleanup();
    };

    const cleanup = () => {
      confirmBtn.removeEventListener("click", handleConfirm);
      closeBtn.removeEventListener("click", handleClose);
    };
    confirmBtn.addEventListener("click", handleConfirm);
    closeBtn.addEventListener("click", handleClose);
  });
}
