module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('lessons', ['classID'], {
      type: 'foreign key',
      name: 'belongs_class',
      references: {
        table: 'classes',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('lessons', 'belongs_class'),
  ])),
}
