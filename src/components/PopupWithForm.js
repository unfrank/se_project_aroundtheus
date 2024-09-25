// Import the base Popup class
import Popup from "./Popup.js";

// PopupWithForm extends Popup to handle forms inside a popup
export default class PopupWithForm extends Popup {
  // Constructor takes the popup selector and a function to handle form submission
  constructor(popupSelector, handleFormSubmit) {
    // Call the parent class (Popup) constructor with the popupSelector
    super(popupSelector);

    // Store the form submission handler function
    this._handleFormSubmit = handleFormSubmit;

    // Select the form element inside the popup
    this._formElement = this._popupElement.querySelector(".popup__form");

    // Select all input fields inside the form and convert them to an array
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
  }

  // Private method to get the values from all input fields
  _getInputValues() {
    // Create an empty object to store the input values
    const inputValues = {};

    // Iterate over all input elements and store their name and value in the object
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    // Return the object containing all input values
    return inputValues;
  }

  // Method to set event listeners for the popup
  setEventListeners() {
    // Call the parent class's setEventListeners method to add general popup listeners
    super.setEventListeners();

    // Add a submit event listener to the form
    this._formElement.addEventListener("submit", (evt) => {
      // Prevent the default form submission behavior
      evt.preventDefault();

      // Call the form submission handler with the input values
      this._handleFormSubmit(this._getInputValues());

      // Reset the form after submission
      this._formElement.reset();
    });
  }
}
