// Import the base Popup class
import Popup from "./Popup.js";

// PopupWithImage extends Popup to handle image popups
export default class PopupWithImage extends Popup {
  // Constructor takes the popup selector as an argument
  constructor(popupSelector) {
    // Call the parent class (Popup) constructor with the popupSelector
    super(popupSelector);

    // Select the image element inside the popup
    this._imageElement = this._popupElement.querySelector(".popup__image");

    // Select the caption element inside the popup
    this._captionElement = this._popupElement.querySelector(".popup__caption");
  }

  // Method to open the image popup with the provided name and link
  open({ name, link }) {
    // Set the image source to the provided link
    this._imageElement.src = link;

    // Set the alt text of the image to the provided name
    this._imageElement.alt = name;

    // Set the caption text to the provided name
    this._captionElement.textContent = name;

    // Call the parent class's open method to display the popup
    super.open();
  }
}
