import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  // Constructor initializes the popup for displaying images
  constructor(popupSelector) {
    super(popupSelector); // Call the parent class (Popup) constructor

    // Select the image and caption elements within the popup
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._captionElement = this._popupElement.querySelector(".popup__caption");
  }

  // Method to open the popup and display the image and caption
  open({ name, link }) {
    // Log the image name and link for debugging purposes
    console.log("Opening image popup with:", { name, link });

    // Set the image element's source (link) and alt text (name)
    this._imageElement.src = link; // Set the image source URL
    this._imageElement.alt = name; // Set the alt text for accessibility

    // Set the caption text to the image name
    this._captionElement.textContent = name;

    // Log the image URL for debugging purposes
    console.log("Image URL:", link);

    // Call the parent class's open method to display the popup
    super.open();
  }
}
