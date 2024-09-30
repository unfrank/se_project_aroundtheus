// The UserInfo class is responsible for managing and updating user information on the page
export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Method to get the current user information from the page
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // Method to update the user information on the page
  setUserInfo({ name, description, avatar }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
    this._avatarElement.src = avatar;
  }
}
