import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getHumanazeDueDate } from '../utils/common.js';

function createTripInfo({ totalCost, cities, startDate, endDate }) {
    console.log('template')
    return `
    <section section class="trip-main__trip-info  trip-info" >
        <div class="trip-info__main">
            <h1 class="trip-info__title">
            ${cities.map((c, i, arr) => {
        if (i === arr.length - 1) {
            return c;
        }
        return c + ' &mdash; '
    }).join('')}</h1>
            <p class="trip-info__dates">${getHumanazeDueDate(startDate, 'DD')}&nbsp;&mdash;&nbsp;${getHumanazeDueDate(endDate, 'DD-MMM')}</p>
        </div>
        <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
        </p>
    </section>
        `;
}


export default class TripInfoView extends AbstractStatefulView {
    constructor(tripInfo) {
        super();
        this._setState(tripInfo);
    }

    get template() {
        return createTripInfo(this._state);
    }

     _restoreHandlers(){

}

reset(tripInfo) {
    this.updateElement(tripInfo)
}
};