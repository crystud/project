module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('subgroups_students', ['subgroupID'], {
      type: 'foreign key',
      name: 'subgroups_students-subgroups',
      references: {
        table: 'subgroups',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('subgroups_students', ['studentID'], {
      type: 'foreign key',
      name: 'subgroups_students-students',
      references: {
        table: 'students',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('subgroups_students', 'subgroups_students-subgroups'),
    queryInterface.removeConstraint('subgroups_students', 'subgroups_students-students'),
  ])),
}
