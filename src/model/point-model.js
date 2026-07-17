import { allPoints, allOffers } from '../mock/point-mock.js';
import { cities } from '../mock/destenation-info.js';
var ex = [
  {
    id: 'PNT-xp966kmrp57u2a',
    basePrice: 905,
    dateFrom: '2026-07-21T22:40:11.163Z',
    dateTo: '2026-07-21T23:45:11.163Z',
    destination: 'DEST-xp966kmrp57u1e',
    isFavorite: true,
    offers: [
      'OFR-xp966kmrp57u25',
      'OFR-xp966kmrp57u26',
      'OFR-xp966kmrp57u27',
      'OFR-xp966kmrp57u28',
      'OFR-xp966kmrp57u29'
    ],
    type: 'Sightseeing'
  },
  {
    id: 'PNT-xp966kmrp57u2d',
    basePrice: 435,
    dateFrom: '2026-07-25T05:58:11.163Z',
    dateTo: '2026-07-25T07:22:11.163Z',
    destination: 'DEST-xp966kmrp57u16',
    isFavorite: false,
    offers: ['OFR-xp966kmrp57u2b', 'OFR-xp966kmrp57u2c'],
    type: 'Taxi'
  },
  {
    id: 'PNT-xp966kmrp57u2f',
    basePrice: 415,
    dateFrom: '2026-07-27T12:33:11.163Z',
    dateTo: '2026-07-27T13:26:11.163Z',
    destination: 'DEST-xp966kmrp57u16',
    isFavorite: false,
    offers: ['OFR-xp966kmrp57u2e'],
    type: 'Taxi'
  },
  {
    id: 'PNT-xp966kmrp57u2k',
    basePrice: 910,
    dateFrom: '2026-07-30T16:41:11.163Z',
    dateTo: '2026-07-30T18:28:11.163Z',
    destination: 'DEST-xp966kmrp57u1c',
    isFavorite: true,
    offers: [
      'OFR-xp966kmrp57u2g',
      'OFR-xp966kmrp57u2h',
      'OFR-xp966kmrp57u2i',
      'OFR-xp966kmrp57u2j'
    ],
    type: 'Check-in'
  },
  {
    id: 'PNT-xp966kmrp57u2m',
    basePrice: 530,
    dateFrom: '2026-08-01T21:52:11.163Z',
    dateTo: '2026-08-01T22:22:11.163Z',
    destination: 'DEST-xp966kmrp57u1g',
    isFavorite: true,
    offers: ['OFR-xp966kmrp57u2l'],
    type: 'Flight'
  }
]
class PointsModel {
  #allPoints;
  #allOffers;
  #cities;

  getPoints() {
    if (!this.#allPoints) {
      this.#allPoints = allPoints;
    }
    return this.#allPoints;
  }

  getOffers() {
    if (!this.#allOffers) {
      this.#allOffers = allOffers;
    }
    return this.#allOffers;
  }

  getCities() {
    if (!this.#cities) {
      this.#cities = cities;
    }
    return this.#cities;
  }

  getTest() {
    return this.getPoints()
  }

}

var points = new PointsModel();


