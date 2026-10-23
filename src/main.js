import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/main-board-presenter.js';


const boardContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const newEventButtonContainer = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

// temporary
const oldButton = newEventButtonContainer.querySelector('.trip-main__event-add-btn');
oldButton.remove();
// temporary

const mainPresenter = new BoardPresenter({
  boardContainer,
  filterModel,
  pointsModel,
  newEventButtonContainer,
});

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  pointsModel
});

filterPresenter.init();
mainPresenter.init();
