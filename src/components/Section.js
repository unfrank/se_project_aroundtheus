export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Render each in array
  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  // Add single item to container
  addItem(element) {
    this._container.prepend(element);
  }
}
