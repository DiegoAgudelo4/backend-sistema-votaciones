module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Candidates', [
      {
        name: 'Juan Pérez',
        party: 'Partido Azul',
        votes: 0,
      },
      {
        name: 'María Gómez',
        party: 'Partido Rojo',
        votes: 0,
      },
      {
        name: 'Carlos López',
        party: 'Partido Verde',
        votes: 0,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Candidates', null, {});
  },
};
