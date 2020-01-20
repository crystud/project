module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('classes', 'semesterID', Sequelize.INTEGER),
    queryInterface.addConstraint('classes', ['semesterID'], {
      type: 'foreign key',
      name: 'semester_connection',
      references: {
        table: 'semesters',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ]),

  down: (queryInterface) => Promise.all([
    queryInterface.removeColumm('classes', 'semesterID'),
    queryInterface.removeContraint('classes', 'semester_connection'),
  ]),
}
