module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('groups', ['specialtyID'], {
      type: 'foreign key',
      name: 'belongs_specialty',
      references: {
        table: 'specialty',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('groups', 'belongs_specialty'),
  ])),
}
