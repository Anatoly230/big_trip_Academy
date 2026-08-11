import AbstractView from '../framework/view/abstract-view.js';
import { getPointDate } from '../utils/utils.js';


function createEditPointForm({ point, destination, offers, cities, possibleOffers, offersTypes }) {

  const startDate = getPointDate(point.dateFrom);
  const endDate = getPointDate(point.dateTo);

  function createOfferButtonTemplate({ option, price, id },) {
    return `
           <div class="event__offer-selector">
             <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-luggage"
               ${offers.some(function isHasId(el) { return el.id === id; }) ? 'checked' : ''}>
             <label class="event__offer-label" for="${id}">
               <span class="event__offer-title">${option}</span>
               +€&nbsp;
               <span class="event__offer-price">${price}</span>
             </label>
           </div>
  `;
  }

  function createEventLisItem(offerType) {
    return `
     <div class="event__type-item">
        <input id="${offerType.toLowerCase()}" class="event__type-input  visually-hidden" type="radio" name="event-type"
          value="${offerType.toLowerCase()}" ${point.type === offerType ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${offerType.toLowerCase()}" for="${offerType.toLowerCase()}">${offerType}</label>
      </div>
    `;
  }

  function createCitiesList(cityList) {
    return `
            <div class="event__field-group  event__field-group--destination">
               <label class="event__label  event__type-output" for="event-destination-1">
                 ${point.type}
               </label>
               <input class="event__input  event__input--destination" id="${destination.id}" type="text"
                 name="event-destination" value="${destination.name}" list="destination-list-1">
               <datalist id="destination-list-1">
                 ${cityList.map(function getCities(c) { return `<option value="${c}">${c}</option>`; }).join('')}
               </datalist>
             </div>
 `;

  }

  function createEventList(offerTypes) {
    return `
            <div class="event__type-list">
               <fieldset class="event__type-group">
                 <legend class="visually-hidden">Event type</legend>
                 ${offerTypes.map(createEventLisItem).join('')}
               </fieldset>
             </div>
           </div>
    `;
  }

  return `
         <form class="event event--edit" action="#" method="post">
           <header class="event__header">
             <div class="event__type-wrapper">
               <label class="event__type  event__type-btn" for="event-type-toggle-1">
                 <span class="visually-hidden">Choose event type</span>
                 <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.toLowerCase()}.png"
                   alt="Event type icon">
               </label>
               <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
             ${createEventList(offersTypes)}
             ${createCitiesList(cities)}
             <div class="event__field-group  event__field-group--time">
               <label class="visually-hidden" for="event-start-time-1">From</label>
               <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                 value="${startDate('fd')}">
               —
               <label class="visually-hidden" for="event-end-time-1">To</label>
               <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                 value="${endDate('fd')}">
             </div>

             <div class="event__field-group  event__field-group--price">
               <label class="event__label" for="event-price-1">
                 <span class="visually-hidden">Price</span>
                 €
               </label>
               <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price"
                 value="${point.basePrice}">
             </div>

             <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
             <button class="event__reset-btn" type="reset">Delete</button>
             <button class="event__rollup-btn" type="button">
               <span class="visually-hidden">Open event</span>
             </button>
           </header>
           <section class="event__details">
             <section class="event__section  event__section--offers">
               <h3 class="event__section-title  event__section-title--offers">Offers</h3>
               <div class="event__available-offers">
                 ${possibleOffers.map(createOfferButtonTemplate).join('')}
               </div>
             </section>

             <section class="event__section  event__section--destination">
               <h3 class="event__section-title  event__section-title--destination">Destination</h3>
               <p class="event__destination-description">${destination.description}</p>
               <div class="event__photos-container">
                 <div class="event__photos-tape">
                   ${destination.pictures.map(function getImages(picPath) {
    return `<img class="event__photo" src="${picPath.src}" alt="${picPath.description}">`
  }).join('')}
                 </div>
               </div>
             </section>
           </section>
         </form>
  `;
}

export default class EditPointView extends AbstractView {
  #onRollupClick = null;
  #onSubmit = null;
  #submitButton = null;
  constructor({ point, destination, offers, possibleOffers, offersTypes }, cities, onRollUpClick, onSubmit) {
    super();
    this.#onRollupClick = onRollUpClick;
    this.#onSubmit = onSubmit;
    this.point = point;
    this.destination = destination;
    this.offers = offers;
    this.possibleOffers = possibleOffers;
    this.allCities = cities;
    this.offersTypes = offersTypes;
    this.#submitButton = this.element.querySelector('.event__save-btn');
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollUpClickHandler);
    this.#submitButton.addEventListener('click', this.#onSubmitHandler);
  }

  get template() {
    return createEditPointForm({
      point: this.point,
      destination: this.destination,
      offers: this.offers,
      cities: this.allCities,
      possibleOffers: this.possibleOffers,
      offersTypes: this.offersTypes,
    });
  }

  #onRollUpClickHandler = (evt) => {
    evt.preventDefault();
    this.#onRollupClick();
  }

  #onSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmit();
    this.#submitButton.disabled = true;
  }
}
