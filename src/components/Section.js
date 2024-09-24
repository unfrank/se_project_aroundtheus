export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector); // Selects .cards__list
  }

  // Method to render the items
  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  // Method to add items to the container
  addItem(element) {
    this._container.prepend(element); // Adds card to .cards__list
  }
}
