module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('specialty', ['departmentID'], {
      type: 'foreign key',
      name: 'semesters_departments',
      references: {
        table: 'departments',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('specialty', 'semesters_departments'),
  ])),
}
