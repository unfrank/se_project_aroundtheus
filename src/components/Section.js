export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Render each item and add it to the container via the renderer
    });
  }

  addItem(renderedItem) {
    this._container.prepend(renderedItem); // Add the rendered item to the top of the container
  }
}
