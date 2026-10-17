
import PointPresenter from './point-presenter.js';


export default class PointsListPresenter {
  #listComponent = null;
  #points = null;
  #allPointPresenters = new Map();
  #editedPoint = null;
  #pointsSrc = null;
  #handleDataChange = null;


  constructor({ listComponent, pointsSrc, points, onDataChange }) {
    this.#listComponent = listComponent;
    this.#points = points;
    this.#pointsSrc = pointsSrc;
    this.#handleDataChange = onDataChange;
  }

  init(points = this.#points) {
    for (const point of points) {
      const pointPresenter = new PointPresenter({
        point: point,
        pointsContaner: this.#listComponent,
        pointsSrc: this.#pointsSrc,
        onModeChange: this.#handleModeChange.bind(this),
        onDataChange: this.#handleDataChange.bind(this),
      });
      pointPresenter.init(point);
      this.#allPointPresenters.set(point.id, pointPresenter);
    }
  }

  getPointPresenter(id) {
    return this.#allPointPresenters.get(id);
  }

  #removePointViews(el) {
    el.removePoint();
  }

  // onFilterClick(filterType) {
  //   if (filterType === this.#currentFilterType) {
  //     return;
  //   }
  //   const filtredPoints = this.#pointsModel.getFilteredPoints(filterType);
  //   this.#pointsModel.resetSortPoints(filtredPoints);
  //   const sortedPoints = this.#pointsModel.getSortedPoints(this.#currentSortType);
  //   this.removePoints();
  //   this.#currentFilterType = filterType;
  //   this.init(sortedPoints);
  // }

  // onSortClick(sortType) {
  //   if (sortType === this.#currentSortType) {
  //     return;
  //   }
  //   const sortedPoints = this.#pointsModel.getSortedPoints(sortType);
  //   this.removePoints();
  //   this.#currentSortType = sortType;
  //   this.init(sortedPoints);
  // }

  #handleModeChange(id) {
    if (!this.#editedPoint) {
      this.#editedPoint = id;
    }
    if (this.#editedPoint !== id) {
      this.getPointPresenter(this.#editedPoint).resetView();
      this.#editedPoint = id;
    }
  }

  removePoints() {
    this.#allPointPresenters.forEach(this.#removePointViews);
    this.#allPointPresenters.clear();
  }

  #getAllPoints() {
    return this.#allPointPresenters;
  }

}

class User {
  constructor(name, age) {
    this._name = name;
    this._age = age;
    this.observers = {};
  }

  subscribe(type, observer) {
    if (!this.observers[type]) {
      this.observers[type] = [];
    }
    this.observers[type].push(observer);
  }

  unscribe(type, usedObserver) {
    if (!this.observers[type]) {
      return;
    }
    this.observers[type] = this.observers[type].filter((observer) => usedObserver !== observer);
  }


  notify(type) {
    this.observers[type].forEach((observer) => observer.update(this));
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
    this.notify('name');
  }

  get age() {
    return this._age;
  }

  set age(age) {
    this._age = age;
    this.notify('age');
  }
}



var nameObsever = {
  update: function (obj) {
    console.log(`в объекта user, свойство name сменилось на ${obj.name}`);
  }
}

var ageObsever = {
  update: function (obj) {
    console.log(`в объекта user, свойство age сменилось на ${obj.age}`);
  }
}

var user = new User('Анатолий', 43);

user.subscribe('name', nameObsever);
user.subscribe('age', ageObsever);

// user.name = 'Tolya';
// user.name = 'Tontik';
// user.age = 18;
// user.age = 43;
// user.age = 25;
// user.name = 'Anatoly';

// user.unscribe('name',nameObsever);


