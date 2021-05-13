
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert([
        {
          name: 'BAR WOODY',
          postal_code: '180-0004',
          prefecture: '東京都',
          address1: '武蔵野市吉祥寺本町1丁目10-8',
          address2: '山崎ビル',
          capacity_status: 2,
          latitude: 35.70602836971596,
          longitude: 139.5789063425672,
          owner_id: '3325b376-8853-4e6a-a876-0334a4e04ded',
          slogan: 'Come on down!',
          open_hours: '11:00am - 8:00pm',
          theme: 'Classy',
          specials: 'Free vodka before 7pm'
        },
        {
          name: 'EDY’S Bar',
          postal_code: '160-0021',
          prefecture: '東京都',
          address1: '新宿区歌舞伎町2丁目32-4',
          address2: '柏崎造園ビル',
          capacity_status: 1,
          latitude: 35.6979898916492,
          longitude: 139.7026638723045,
          owner_id: '3325b376-8853-4e6a-a876-0334a4e04ded',
        },
        { 
          name: 'B BAR ROPPONGI',
          postal_code: '106-0032',
          prefecture: '東京都',
          address1: '港区六本木6丁目12-1',
          address2: 'ヒルズ けやき坂通り レジデンスA棟',
          capacity_status: 3,
          latitude: 35.659049072460775,
          longitude: 139.72875052530563,
          owner_id: '3325b376-8853-4e6a-a876-0334a4e04ded',
        },
        { 
          name: 'R',
          postal_code: '111-0034',
          prefecture: '東京都',
          address1: '台東区雷門2丁目16-11',
          address2: '',
          capacity_status: 0,
          latitude: 35.710922248046955,
          longitude: 139.79534482689786,
          owner_id: '3325b376-8853-4e6a-a876-0334a4e04ded',
        },
      ]);
    });
};
