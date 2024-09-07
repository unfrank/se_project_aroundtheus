import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._captionElement = this._popupElement.querySelector(".popup__caption");
  }

  open({ name, link }) {
    this._imageElement.src = link; // Set the image URL
    this._imageElement.alt = name; // Set the image alt text
    this._captionElement.textContent = name; // Set the caption text
    super.open(); // Open the popup
  }
}
