// Import the base Popup class
import Popup from "./Popup.js";

// PopupWithForm extends Popup to handle forms inside a popup
export default class PopupWithForm extends Popup {
  // Constructor takes the popup selector and a function to handle form submission
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    // Check if there's a form element, as some popups might not have one
    this._formElement =
      this._popupElement.querySelector(".popup__form") || null;

    // If a form exists, get input fields
    if (this._formElement) {
      this._inputList = Array.from(
        this._formElement.querySelectorAll(".popup__input")
      );
    }
  }

  // Only get input values if the form exists
  _getInputValues() {
    const inputValues = {};
    if (this._formElement) {
      this._inputList.forEach((input) => {
        inputValues[input.name] = input.value;
      });
    }
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    if (this._formElement) {
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this._formElement.reset(); // Reset only if the form exists
      });
    }
  }

  close() {
    if (this._formElement) {
      this._formElement.reset(); // Reset form fields if applicable
    }
    super.close(); // Call the base class close method
  }
}
