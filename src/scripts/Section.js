export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renders all items by calling the renderer function on each item
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Adds a DOM element to the container
  addItem(element) {
    this._container.append(element);
  }
}
