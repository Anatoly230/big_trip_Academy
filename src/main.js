import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/main-board-presenter.js';


const boardContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const mainPresenter = new BoardPresenter({
  boardContainer,
  filterModel,
  pointsModel
});

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  pointsModel
});

filterPresenter.init();
mainPresenter.init();
