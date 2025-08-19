import { Popup } from "./Popup";

export class PopupWithImage  extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this.image = this._popup.querySelector(".popup__image");
        this.caption = this._popup.querySelector(".popup_title");
    }

     // Sobrescrevendo o método open
  open(link, name) {
    // Atualiza a imagem e a legenda
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    // Chama o open() do pai para abrir o popup
    super.open();
  }
}
