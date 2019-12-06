module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('hours', ['subjectID'], {
      type: 'foreign key',
      name: 'belongs_subject',
      references: {
        table: 'subjects',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('hours', ['semesterID'], {
      type: 'foreign key',
      name: 'belongs_semester',
      references: {
        table: 'semesters',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('hours', 'belongs_subject'),
    queryInterface.removeConstraint('hours', 'belongs_semester'),
  ])),
}
