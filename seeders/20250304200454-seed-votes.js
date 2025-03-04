module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Votes', [
      {
        voter_id: 1,
        candidate_id: 1,
      }, // Ana → Juan Pérez
      {
        voter_id: 2,
        candidate_id: 2,
      }, // Luis → María Gómez
      {
        voter_id: 3,
        candidate_id: 1,
      }, // Sofía → Juan Pérez
      {
        voter_id: 4,
        candidate_id: 3,
      }, // Diego → Carlos López
      {
        voter_id: 5,
        candidate_id: 2,
      }, // Elena → María Gómez
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Votes', null, {});
  },
};
