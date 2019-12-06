module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('students', ['groupID'], {
      type: 'foreign key',
      name: 'students_group',
      references: {
        table: 'groups',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('students', ['userID'], {
      type: 'foreign key',
      name: 'student_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('students', 'students_group'),
    queryInterface.removeConstraint('students', 'student_user'),
  ])),
}
