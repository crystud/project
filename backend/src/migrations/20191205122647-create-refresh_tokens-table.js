module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.createTable('refresh_tokens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: Sequelize.ENUM('ACTIVE', 'WITHDRAWN', 'USED'),
      value: Sequelize.TEXT,
      date_of_create: Sequelize.DATE,
      date_of_used: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      userID: Sequelize.INTEGER,
    }, { transaction: t }),

    queryInterface.addConstraint('refresh_tokens', ['userID'], {
      type: 'foreign key',
      name: 'refresh_tokens-user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction(() => Promise.all([
    queryInterface.dropTable('refresh_tokens'),
    queryInterface.removeConstraint('refresh_tokens', 'refresh_tokens-user'),
  ])),
}
