import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // Constructor initializes the popup with a form submission handler
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Call the constructor of the parent class (Popup)

    // Store the form submit handler function passed in
    this._handleFormSubmit = handleFormSubmit;

    // Get the form element within the popup
    this._formElement = this._popupElement.querySelector(".popup__form");

    // Create an array of all input fields within the form
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
  }

  // Private method to collect all input values from the form
  _getInputValues() {
    const inputValues = {}; // Initialize an empty object to hold form data

    // Loop through each input field and add its name and value to the object
    this._inputList.forEach((input) => (inputValues[input.name] = input.value));

    return inputValues; // Return the object containing all input values
  }

  // Method to set up event listeners
  setEventListeners() {
    // Call the parent class method to handle popup listeners
    super.setEventListeners();

    // Add a submit event listener to the form
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent the default form submission behavior

      // Call the form submit handler function with the collected input values
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Override the close method to reset the form when the popup is closed
  close() {
    this._formElement.reset(); // Reset the form inputs to their default values

    // Call the parent class close method to handle hiding the popup
    super.close();
  }
}
