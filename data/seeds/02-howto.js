
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('howto').del()
    .then(function () {
      // Inserts seed entries
      return knex('howto').insert([
        {
          user_id: 1,
          title: "How to Put on a Medical Mask",
          post: "Understand what a medical mask protects you from. Medical or surgical masks are intended to cover both your mouth and nose. They are designed with material that can block large-particle droplets, splashes, sprays and splatter — all of which may contain viruses or bacteria that may be harmful to you."
        },
      ]);
    });
};
