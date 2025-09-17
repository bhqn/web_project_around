export class Section {
    constructor({items , renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);

    }

    renderItems(items = this._items) {
        if (!items) return;
        items.reverse().forEach(item => {
            const element = this._renderer(item);
        });
    }

    addItem(element){
        this._container.prepend(element);

    }

}

