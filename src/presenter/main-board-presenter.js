import { render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-veiw.js';
import ListView from '../view/list-view.js';
import PointsListPresenter from './points-list-presenter.js';
import SortModel from '../model/sort-model.js';
import SortPresenter from './sort-presenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { filters } from '../utils/filters.js';
import { sortPriceUp, sortTimeUp } from '../utils/sorts.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import newPointPresenter from './new-point-presenter.js';


export default class BoardPresenter {
  #boardContainer = null;
  #newEventButtonContainer = null;
  #newEventButtonView = null;
  #listView = new ListView();
  #sortModel = new SortModel();
  #pointsModel = null;
  #filterModel = null;
  #sortPresenter = null;
  #filterType = FilterType.EVERETHING;
  #sortType = SortType.DEFAULT;
  #noPointsView = null;
  #pointsListPresenter = null;
  #newPointPresenter = null;

  constructor({ boardContainer, pointsModel, filterModel, newEventButtonContainer }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newEventButtonContainer = newEventButtonContainer;

    this.#pointsModel.addObserver(this.#handleModelEvent.bind(this));
    this.#filterModel.addObserver(this.#handleModelEvent.bind(this));
  }

  #handleViewAction(actionType, apdateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        console.log('UPDATE_POINT UserAction');
        this.#pointsModel.updatePoint(apdateType, update);
        break;
      case UserAction.ADD_POINT:
        console.log('ADD_POINT UserAction');
        this.#pointsModel.addPoint(apdateType, update);
        break;
      case UserAction.DELETE_POINT:
        console.log('DELETE_POINT UserAction');
        this.#pointsModel.deletePoint(apdateType, update);
        break;
    }
  }

  #handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        console.log('PATCH Update');
        this.#pointsListPresenter.getPointPresenter(data.id).init(data);
        break;
      case UpdateType.MINOR:
        console.log('Minor Update');
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        console.log('Major Update');
        this.#clearBoard();
        this.#renderBoard();
    }
  }

  //выдаёт уже отфильтрованные и отсортированные точки
  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
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
    this.#pointsListPresenter = new PointsListPresenter({
      listComponent: this.#listView,
      points: this.#pointsModel.points,
      pointsSrc: this.#pointsModel.srcInfo,
      onDataChange: this.#handleViewAction.bind(this),
    });
    this.#pointsListPresenter.init();
  }

  #renderNewEventButton() {
    this.#newEventButtonView = new NewEventButtonView({ onNewEvent: this.#onNewEventButtonHandler.bind(this) });
    render(this.#newEventButtonView, this.#newEventButtonContainer);
  }

  #onNewEventButtonHandler() {
    this.#newPointPresenter = new newPointPresenter({
      pointsSrc: this.#pointsModel.srcInfo,
      pointsContainer: this.#listView,
      onDataChange: this.#handleViewAction.bind(this),
    });
    this.#newPointPresenter.init();
    console.log('get new event');
  }

  #renderBoard() {
    this.#renderNewEventButton();
    const points = this.points;
    if (points.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderSort();
    this.#renderPoints();
  }

  #clearBoard() {
    this.#sortPresenter.delete()
    this.#pointsListPresenter.removePoints();
  }

}

