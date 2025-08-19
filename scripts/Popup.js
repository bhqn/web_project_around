export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__button-close");
    this._openButtons = document.querySelectorAll(".gallery__image"); // vários botões
    this._handleEscClose = this._handleEscClose.bind(this);

    this._setEventListeners();
  }

  open() {
    this._popup.style.display = "block";
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.style.display = "none";
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    // Botão de fechar
    this._closeButton.addEventListener("click", () => this.close());

    // Vários botões de abrir
    this._openButtons.forEach(btn => {
      btn.addEventListener("click", () => this.open());
    });
  }
}
