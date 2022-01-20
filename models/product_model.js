class Collection {
    #Model
    #currentId
    #items
    constructor(model, startingData) {
        this.#Model = model;
        this.#currentId = 0;
        this.#items = this.#populateItems( startingData );
    }
    /**
     * @description It will take an array as a argument
     * @returns on Object that contains the { id as a key } and { te item as the value }
     */
    #populateItems( startingData ) {
        return startingData.reduce(( acc, item, idx ) => {
            this.#currentId = idx;
            acc[this.#currentId] = new this.#Model(item, idx)
            return acc;
        }, {});
    }
    #generateId(){
        return ++this.#currentId
    }
    /**
     * @description Will return an array with all items availible in this.items
     * @returns array
     */
    find() {
        return Object.values(this.#items);
    }
    /**
     * @description Will return item match with the itemId
     * @param { string } itemId
     * @param { function } callBack Will return error or item
     * @returns function;
     */
    findById( itemId, callBack ) {
        if (!itemId) return console.log("missing id in first argument");
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
        let error;
        const item = this.#items[itemId];
        if (!item) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
        return callBack(error, item);
    }
    create( data, callBack ) {
        if (!data) return console.log("missing data in first argument");
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
        let error, newItem;
        const isEmpty = Object.keys(data).every(field => data[field] === "");
        if (isEmpty) {
            error = { message: `you have empty fields` };
        } else {
            newItem = new this.#Model( data, this.#generateId());
            this.#items[newItem.id] = newItem;
        }
        return callBack(error, newItem);
    }
    findByIdAndDelete( itemId, callBack ) {
        let error = null;
        const item = this.#items[itemId]
        const isDeleted = delete this.#items[itemId];
        if ( !isDeleted ) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
        return callBack(error, item);
    }
    findByIdAndUpdate( itemId, data, callBack ) {
        let error = null;
        const item = this.#items[itemId];
        if (!item) {
            error = { message: `item can't be found` };
        } else {
            this.#items[itemId] = {
                ...item,
                ...data
            }
        }
        return callBack(error, this.#items[itemId]);
    }
};
class Product {
    constructor( data, id ) {
        this.id = id;
        this.name = data.name;
        this.price = data.price;
        this.image = data.image;
    }
}

module.exports = new Collection(Product, [
    
    {
        name: 'Jaguar',
        price: 100,
        image:'https://external-preview.redd.it/K7ijiP5-vM8-01spuAq3QBTY49y9rLsSnUCbTFJH6ow.jpg?auto=webp&s=5521adfc6e3f3b91833494a57ef05b96c8cfab09',
    },
    {
        name: 'Jazzmaster',
        price: 200,
        image: 'http://cdn.shopify.com/s/files/1/0343/4368/2183/products/fender-electric-guitars-solid-body-fender-player-jazzmaster-black-w-matching-headcap-pure-vintage-65-pickups-series-parallel-4-way-0147902506-28432677077127_grande.jpg?v=1634277402',
    },
    {
        name: 'Stratocaster',
        price: 300,
        image: 'https://i.ebayimg.com/images/g/8bwAAOSwYYtgcI0V/s-l400.jpg',
    },
]);