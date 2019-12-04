
module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('classes', ['teacherID'], {
      type: 'foreign key',
      name: 'teach',
      references: {
        table: 'teachers',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('classes', ['groupID'], {
      type: 'foreign key',
      name: 'learn',
      references: {
        table: 'groups',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('classes', ['subgroupID'], {
      type: 'foreign key',
      name: 'learn_subgroup',
      references: {
        table: 'subgroups',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('classes', ['subjectID'], {
      type: 'foreign key',
      name: 'belongs_subjects',
      references: {
        table: 'subjects',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('classes', 'teach'),
    queryInterface.removeConstraint('classes', 'learn'),
    queryInterface.removeConstraint('classes', 'learn_subgroup'),
    queryInterface.removeConstraint('classes', 'belongs_subjects'),
  ])),
}
