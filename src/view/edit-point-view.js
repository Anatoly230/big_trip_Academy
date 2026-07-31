import AbstractView from '../framework/view/abstract-view.js';
import { getPointDate } from '../utils.js';


function createPointForm(point, destination, offers, cities, possibleOffers) {

  function createOfferButtonTemplate({ option, price, id },) {
    return `
    <div class="event__available-offers">
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
  const startDate = getPointDate(point.dateFrom);
  const endDate = getPointDate(point.dateTo);
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

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
              value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
              value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
              value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
              value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
              value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
              value="flight" checked="">
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
              value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing"
              for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant"
              for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${point.type}
      </label>
      <input class="event__input  event__input--destination" id="${destination.id}" type="text" name="event-destination"
        value="${destination.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${cities.map(function getCities(c) { return `<option value="${c}">${c}</option>`; })}
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

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
    return `<img class="event__photo"
            src="${picPath.src}" alt="${picPath.description}">`
  }).join('')}
        </div>
      </div>
    </section>
  </section>
</form>
  `;
}

export default class EditPointView extends AbstractView {
  #onRollupClickHandler = null;
  #onEscapetHandler = null;
  #onSubmitHandler = null;
  constructor({ point, destination, offers, possibleOffers }, cities, onRollUpClickHandler, onSubmitHandler) {
    super();
    this.point = point;
    this.destination = destination;
    this.offers = offers;
    this.possibleOffers = possibleOffers;
    this.allCities = cities;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', onRollUpClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', onSubmitHandler);
  }

  get template() {
    return createPointForm(this.point, this.destination, this.offers, this.allCities, this.possibleOffers);
  }
}
