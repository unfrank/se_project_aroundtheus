export default class UserInfo {
  // Constructor initializes the class with the selectors for the name and description elements
  constructor({ nameSelector, descriptionSelector }) {
    // Get the DOM element for the user's name based on the provided selector
    this._nameElement = document.querySelector(nameSelector);

    // Get the DOM element for the user's description based on the provided selector
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  // Method to get the current user information (name and description) from the DOM
  getUserInfo() {
    // Return an object containing the current name and description text from the DOM elements
    return {
      name: this._nameElement.textContent, // Get the name from the DOM element
      description: this._descriptionElement.textContent, // Get the description from the DOM element
    };
  }

  // Method to update the user's information in the DOM
  setUserInfo({ name, description }) {
    // Update the DOM element with the new name
    this._nameElement.textContent = name;

    // Update the DOM element with the new description
    this._descriptionElement.textContent = description;
  }
}
