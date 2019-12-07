module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('subjects', ['commissionID'], {
      type: 'foreign key',
      name: 'subjects_commission',
      references: {
        table: 'commissions',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('subjects', ['subjectType'], {
      type: 'foreign key',
      name: 'subjects_subject-types',
      references: {
        table: 'subject_types',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('subjects', 'subjects_commission'),
    queryInterface.removeConstraint('subjects', 'subgroups_students-students'),
  ])),
}
