const bcrypt = require('bcryptjs');

const hash1 = bcrypt.hashSync(process.env.USER_1, 12);
const hash2 = bcrypt.hashSync(process.env.USER_2, 12);

exports.seed = function(knex) {
  return knex('user').insert([
    { username: 'edgar', password: hash1, email: 'life_of_edgar@gmail.com' },
    { username: 'gregory', password: hash2, email: 'greg@gregmail.com' },
  ]);
};
