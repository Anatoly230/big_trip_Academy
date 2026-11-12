import Observable from '../framework/observable.js';

export default class TripInfoModel extends Observable {
    #points = null;
    #destinationsIdBook = null;
    #offersIdBook = null;

    constructor({ points, destinationsIdBook,offersIdBook }) {
        super();
        this.#destinationsIdBook = destinationsIdBook;
        this.#points = points;
        this.#offersIdBook = offersIdBook;
    }

    update(points) {
        this.#points = points;
        this._notify(this.tripInfo);
    }

    get tripInfo() {
        console.log('in trip info works')
        const middlePointIndex = Math.floor((this.#points.length - 1) / 2);
        const endPointIndex = this.#points.length - 1;

        return this.#points.reduce((data, p, i) => {
            if (i === 0) {
                data.totalCost = 0;
                data.startDate = p.dateFrom;
                data.cities = [];
                data.cities.push(this.#destinationsIdBook[p.destination].name);
            }

            if (i === middlePointIndex) {
                data.cities.push(this.#destinationsIdBook[p.destination].name);
            }

            if (i === endPointIndex) {
                data.endDate = p.dateTo;
                data.cities.push(this.#destinationsIdBook[p.destination].name);
            }

            data.totalCost += p.basePrice + p.offers.reduce((total, id) => {
                total += this.#offersIdBook[id].price;
                return total;
            }, 0);

            return data;
        }, {})
    }

}