import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointSwitcher = null;

  constructor(point, citiesData, switcher) {
    this.#pointSwitcher = switcher;
    this.pointView = new PointView(point, this.#openClosePoint);
    this.editPointView = new EditPointView(point, citiesData, this.#openClosePoint, this.#saveEditPoint);
  }

  #openClosePoint = () => {
    this.#switchListenerForEscapeDown();
    this.#pointSwitcher.swap(this.editPointView, this.pointView);
  }

  #saveEditPoint = () => {
    console.log('its save');
  }

  #switchListenerForEscapeDown() {
    if (!this.#pointSwitcher.getState().open) {
      document.addEventListener('keydown', this.#onEscDownHandler);
    } else {
      document.removeEventListener('keydown', this.#onEscDownHandler);
    }
  }


  #closeLastOpenPoint() {
    this.#pointSwitcher.swap();
  }

  #onEscDownHandler = (evt) => {/* вынужденная мера, без стрелки непонятно как удалить обработчик, bind каждый раз создаёт новую функцию, ссылки соответственно разные*/
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#closeLastOpenPoint();
      document.removeEventListener('keydown', this.#onEscDownHandler);
    }
  }
}
