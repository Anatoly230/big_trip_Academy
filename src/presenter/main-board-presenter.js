import { render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-veiw.js';
import ListView from '../view/list-view.js';
import PointsListPresenter from './points-list-presenter.js';
import SortModel from '../model/sort-model.js';
import SortPresenter from './sort-presenter.js';
import { FilterType, SortType } from '../const.js';
import { filters } from '../utils/filters.js';
import { sortPriceUp, sortTimeUp } from '../utils/sorts.js';

export default class BoardPresenter {
  #boardContainer = null;
  #listView = new ListView();
  #sortModel = new SortModel();
  #pointsModel = null;
  #filterModel = null;
  #sortPresenter = null;
  #filterType = FilterType.EVERETHING;
  #sortType = SortType.DEFAULT;
  #noPointsView = null;

  constructor({ boardContainer, pointsModel, filterModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.possibleOffers = [...this.#pointsModel.possibleOffers];
    this.pointsData = this.#pointsModel.fullDataList;
    this.citiesData = this.#pointsModel.cities;
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.fullDataList;
    const filtredPoints = filters[this.#filterType](points);

    switch (this.#sortType) {
      case SortType.PRICE:
        return filtredPoints.sort(sortPriceUp);
      case SortType.TIME:
        return filtredPoints.sort(sortTimeUp);
    }
    return filtredPoints;
  }

  init() {
    this.#renderBoard();
  }


  #renderSort() {
    this.#sortPresenter = new SortPresenter({ sortModel: this.#sortModel });
    this.#sortPresenter.init(this.#boardContainer);
  }

  #renderNoPoints() {
    this.#noPointsView = new EmptyListView({ filterType: this.#filterType });
    render(this.#noPointsView, this.#listView.element);
  }

  #renderPoints() {
    render(this.#listView, this.#boardContainer);
    this.pointsList = new PointsListPresenter(
      this.#listView,
      this.points,
      this.citiesData,
      this.#pointsModel,
    );
    this.pointsList.init();
  }

  #renderBoard() {
    const points = this.points;
    if (points.length === 0) {
      this.#renderNoPoints();
    }
    this.#renderSort();
    this.#renderPoints();
  }

  #clearBoard() {
    this.pointsList.removePoints();
  }

}

