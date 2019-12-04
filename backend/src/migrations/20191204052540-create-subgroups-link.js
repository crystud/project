module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('subgroups', ['groupID'], {
      type: 'foreign key',
      name: 'subgroups_group',
      references: {
        table: 'groups',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('subgroups', 'subgroups_group'),
  ])),
}
