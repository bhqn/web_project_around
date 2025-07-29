export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".gallery__image").src = this._link;
    this._element.querySelector(".gallery__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    // Eventos ficam em utils.js
    return this._element;
  }
}
