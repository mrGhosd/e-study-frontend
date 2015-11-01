Object.defineProperty(Array.prototype, 'first', {
    enumerable: false,
    configurable: false,
    get() {
        return this[0];
    },
    set(value) {
        this[0] = value;
        return value;
    }
});

Object.defineProperty(Array.prototype, 'second', {
    enumerable: false,
    configurable: false,
    get() {
        return this[1];
    },
    set(value) {
        this[1] = value;
        return value;
    }
});

Object.defineProperty(Array.prototype, 'last', {
    enumerable: false,
    configurable: false,
    get() {
        return this[this.length - 1];
    },
    set(value) {
        this[this.length - 1] = value;
        return value;
    }
});

Object.defineProperty(Array.prototype, 'clean', {
    enumerable: false,
    configurable: false,
    value(deleteValue) {
        for (let foundId = 0; foundId < this.length; foundId++) {
            if (this[foundId] == deleteValue) {
                this.splice(foundId, 1);
                foundId--;
            }
        }
        return this;
    }
});


if (![].includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        enumerable: false,
        configurable: false,
        value(searchElements) {
            if (searchElements instanceof String) {
                searchElements = [searchElements];
            }
            return searchElements.every((element) => this.indexOf(element) > -1);
        }
    });
}
