const offers = {
  Taxi: [
    ['Economy', 'Economy class has been selected'],
    ['Comfort', 'Comfort class has been added'],
    ['Business', 'Business class has been selected'],
    ['Child Seat', 'A child seat has been added'],
    ['English-speaking Driver', 'An English-speaking driver is included'],
  ],

  Bus: [
    ['Window Seat', 'A window seat has been reserved'],
    ['Extra Legroom', 'Extra legroom has been added'],
    ['Wi-Fi', 'Wi-Fi access is included'],
    ['USB Charging', 'USB charging is available'],
    ['Snacks', 'Snacks are included'],
  ],

  Train: [
    ['First Class', 'First class has been selected'],
    ['Window Seat', 'A window seat has been reserved'],
    ['Meal Included', 'A meal is included'],
    ['Extra Baggage', 'Extra baggage allowance has been added'],
    ['Quiet Carriage', 'A seat in a quiet carriage has been reserved'],
    ['Wi-Fi', 'Wi-Fi access is included'],
  ],

  Ship: [
    ['Ocean View Cabin', 'An ocean view cabin has been selected'],
    ['Private Cabin', 'A private cabin has been reserved'],
    ['Buffet Included', 'Buffet access is included'],
    ['Premium Lounge Access', 'Premium lounge access is included'],
    ['Guided Excursion', 'A guided excursion is included'],
    ['Priority Boarding', 'Priority boarding is included'],
  ],

  Drive: [
    ['Automatic Transmission', 'An automatic transmission vehicle has been selected'],
    ['GPS Navigation', 'GPS navigation is included'],
    ['Additional Driver', 'An additional driver has been added'],
    ['Full Insurance', 'Full insurance coverage is included'],
    ['Unlimited Mileage', 'Unlimited mileage is included'],
    ['Child Seat', 'A child seat has been added'],
    ['Roadside Assistance', 'Roadside assistance is included'],
  ],

  Flight: [
    ['Business Class', 'Business class has been selected'],
    ['Extra Legroom', 'Extra legroom has been added'],
    ['Window Seat', 'A window seat has been reserved'],
    ['Priority Boarding', 'Priority boarding is included'],
    ['Extra Baggage', 'Extra baggage allowance has been added'],
    ['In-flight Meal', 'An in-flight meal is included'],
    ['Lounge Access', 'Airport lounge access is included'],
  ],

  'Check-in': [
    ['Early Check-in', 'Early check-in has been added'],
    ['Late Check-out', 'Late check-out has been added'],
    ['Breakfast Included', 'Breakfast is included'],
    ['Room Upgrade', 'A room upgrade has been added'],
    ['Sea View', 'A sea view room has been selected'],
    ['Airport Transfer', 'Airport transfer is included'],
  ],

  Sightseeing: [
    ['Audio Guide', 'An audio guide is included'],
    ['Private Guide', 'A private guide is included'],
    ['Skip-the-line Access', 'Skip-the-line access is included'],
    ['Museum Tickets', 'Museum tickets are included'],
    ['Hotel Pickup', 'Hotel pickup is included'],
    ['Small Group Tour', 'A small group tour has been selected'],
  ],

  Restaurant: [
    ['Table by the Window', 'A window table has been reserved'],
    ['Chef’s Special', 'The chef’s special has been added'],
    ['Wine Pairing', 'Wine pairing is included'],
    ['Vegetarian Menu', 'A vegetarian menu has been selected'],
    ['Dessert Included', 'Dessert is included'],
    ['Live Music', 'Live music is included'],
  ],
};
const offerTypes = Object.keys(offers);

export { offers, offerTypes };
