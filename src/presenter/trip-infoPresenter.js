import { remove, render } from '../framework/render.js';
import TripInfoView from '../view/trip-info.js';
import TripInfoModel from '../model/trip-info-model.js';

export default class TripInfoPresenter {
    #tripInfoContaner = null;
    #tripInfoView = null;
    #points = null;
    #destinationsIdBook = null;
    #tripInfoModel = null;

    constructor({ tripInfoContainer, points, destinationsIdBook, offersIdBook }) {
        this.#tripInfoContaner = tripInfoContainer;
        this.#points = points;
        this.#destinationsIdBook = destinationsIdBook;
        this.#tripInfoModel = new TripInfoModel({
            points: this.#points,
            destinationsIdBook: this.#destinationsIdBook,
            offersIdBook: offersIdBook,
        });

        this.#tripInfoModel.addObserver(this.#resetView.bind(this))
    }


    init() {
        this.#tripInfoView = new TripInfoView(this.#tripInfoModel.tripInfo);
        render(this.#tripInfoView, this.#tripInfoContaner, 'afterbegin');
    }

    refresh(points) {
        this.#tripInfoModel.update(points);
    }

    #resetView() {
        this.#tripInfoView.reset(this.#tripInfoModel.tripInfo);
    }
} 