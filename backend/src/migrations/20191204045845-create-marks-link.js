module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('marks', ['studentID'], {
      type: 'foreign key',
      name: 'received',
      references: {
        table: 'students',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('marks', ['lessonID'], {
      type: 'foreign key',
      name: 'belongs_lesson',
      references: {
        table: 'lessons',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('marks', 'received'),
    queryInterface.removeConstraint('marks', 'belongs_lesson'),
  ])),
}
