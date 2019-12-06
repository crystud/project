module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.addConstraint('schedule', ['classID'], {
      type: 'foreign key',
      name: 'schedule_class',
      references: {
        table: 'classes',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('schedule', ['timetableID'], {
      type: 'foreign key',
      name: 'schedule_timetable',
      references: {
        table: 'timetable',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

    queryInterface.addConstraint('schedule', ['roomID'], {
      type: 'foreign key',
      name: 'schedule_rooms',
      references: {
        table: 'rooms',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('schedule', 'schedule_class'),
    queryInterface.removeConstraint('schedule', 'schedule_timetable'),
    queryInterface.removeConstraint('schedule', 'schedule_rooms'),
  ])),
}
