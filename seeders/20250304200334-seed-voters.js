module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Voters', [
      {
        name: 'Ana Torres',
        email: 'ana.torres@example.com',
        has_voted: false,
      },
      {
        name: 'Luis Martínez',
        email: 'luis.martinez@example.com',
        has_voted: false,
      },
      {
        name: 'Sofía Ramírez',
        email: 'sofia.ramirez@example.com',
        has_voted: false,
      },
      {
        name: 'Diego Fernández',
        email: 'diego.fernandez@example.com',
        has_voted: false,
      },
      {
        name: 'Elena Gutiérrez',
        email: 'elena.gutierrez@example.com',
        has_voted: false,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Voters', null, {});
  },
};
