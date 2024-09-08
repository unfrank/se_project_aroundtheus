import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Call the constructor of the parent class (Popup)
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
  }

  _getInputValues() {
    const inputValues = {}; // Initialize an empty object to hold form data
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues; // Return the object containing all input values
  }

  setEventListeners() {
    super.setEventListeners(); // Call the parent class method to handle popup listeners
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent the default form submission behavior
      this._handleFormSubmit(this._getInputValues()); // Call the form submit handler function
      this._formElement.reset(); // Reset the form after submission
    });
  }
}
