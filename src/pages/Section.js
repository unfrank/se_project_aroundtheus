export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(itemData) {
    const renderedItem = this._renderer(itemData);
    this._container.prepend(renderedItem);
  }
}
