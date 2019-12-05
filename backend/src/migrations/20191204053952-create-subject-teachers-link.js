module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('teachers', ['commissionID'], {
      type: 'foreign key',
      name: 'teachers_commission',
      references: {
        table: 'commissions',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('teachers', ['userID'], {
      type: 'foreign key',
      name: 'teacher_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('teachers', 'teachers_commission'),
    queryInterface.removeConstraint('teachers', 'teacher_user'),
  ])),
}
