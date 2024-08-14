export default class FormValidator {
  // Initializes the form validator with the provided settings and form element.
  // It also stores a list of input fields and the submit button.
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  // Private method to check if form input field valid
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Private method to toggle the submit button
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  // Private method to check the validity of a single input field
  // and display an error message if invalid
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
    } else {
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
    }
  }

  // Private method to set event listeners on form inputs for real-time validation
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Public method to enable form validation by setting up event listeners
  enableValidation() {
    this._setEventListeners();
  }

  // Public method to reset the form's validation state, including clearing errors
  // and resetting the submit button's state
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
    });
    this._toggleButtonState();
  }

  // Public method to disable the submit button, typically called after form submission
  disableButtonAfterSubmit() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}
