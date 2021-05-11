
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert([
        { 
          name: 'BAR WOODY',
          postal_code: '180-0004',
          prefecture: ' 東京都',
          address1: '武蔵野市吉祥寺本町1丁目10−8',
          address2: '山崎ビル',
          city: '武蔵野市',
          capacity_status: 'open',
          latitude: 35.70602836971596,
          longitude: 139.5789063425672,
          owner_id: '259f8fae-457d-441c-9c2f-9fe6de39761a'
        },
      ]);
    });
};
