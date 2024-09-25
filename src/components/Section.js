// The Section class is responsible for rendering items and managing a container
export default class Section {
  // Constructor accepts an object with a renderer function and a container selector
  constructor({ renderer }, containerSelector) {
    // Store the renderer function that will be used to render each item
    this._renderer = renderer;

    // Select the container element where items will be added
    this._container = document.querySelector(containerSelector);
  }

  // Method to render a list of items
  // It iterates over the items and calls the renderer function for each one
  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  // Method to add a new item to the container
  // It prepends the element to the container (adds to the top)
  addItem(element) {
    this._container.prepend(element);
  }
}
