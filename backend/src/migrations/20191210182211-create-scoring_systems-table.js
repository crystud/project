module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.createTable('scoring_systems', {
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      min: Sequelize.FLOAT,
      max: Sequelize.FLOAT,
      minMark: Sequelize.FLOAT,
    }, { transaction: t }),

    queryInterface.addConstraint('subject_types', ['scoringSystemID'], {
      type: 'foreign key',
      name: 'subject_types-scoring_systems',
      references: {
        table: 'scoring_systems',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.removeConstraint('subject_types', 'subject_types-scoring_systems'),
    queryInterface.dropTable('scoring_systems'),
  ])),
}
