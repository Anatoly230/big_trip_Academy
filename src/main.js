import BoardPresenter from "./presenter/boardPresnter.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import { render } from "./render.js";

console.log("start");
const containers = {
  container: document.querySelector('.trip-events'),
  filterContainer: document.querySelector('.trip-controls__filters')
}

const mainPresenter = new BoardPresenter(containers);
mainPresenter.init();
