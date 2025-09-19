export class Card {
  constructor(data, cardSelector, api) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._id = data._id;
    this._isLike = data._isLike; 
    this._api = api;
    
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
    this._likeButton = this._element.querySelector(".card__button");

    this._loadLikeState(); // <-- carrega o estado salvo
    this.setLikeState(this._isLike); // <-- aplica o estado visual

    this._setEventListeners();

    return this._element;
  }

   _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._isLike) {
        this._api.removeLike(this._id)
          .then((res) => {
            console.log("remove Like:", res);
            this.setLikeState(false);

          })
          .catch((err) => console.log("Erro ao remover like:", err));
      } else {
        this._api.addLike(this._id)
          .then((res) => {
            console.log("Like adicionado:", res);
            this.setLikeState(true);
            
          })
          .catch((err) => console.log("Erro ao adicionar like:", err));
      }
    });
  }

  // seta o like
  setLikeState(isLiked) {
    this._isLike = isLiked;
    if (isLiked) {
      this._likeButton.classList.add("card__button--active");
    } else {
      this._likeButton.classList.remove("card__button--active");
    }
    this._saveLikeState();
  }

  _saveLikeState() {
    // Recupera o objeto de likes do localStorage ou cria um novo
    const likes = JSON.parse(localStorage.getItem("cardLikes")) || {};
    likes[this._id] = this._isLike;
    localStorage.setItem("cardLikes", JSON.stringify(likes));
  }

  _loadLikeState() {
    const likes = JSON.parse(localStorage.getItem("cardLikes")) || {};
    if (likes.hasOwnProperty(this._id)) {
      this._isLike = likes[this._id];
    }
  }
}



