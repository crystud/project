module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('groups', 'number', Sequelize.INTEGER, { transaction: t }),
    queryInterface.addColumn('specialty', 'symbol', Sequelize.TINYTEXT, { transaction: t }),
    queryInterface.addColumn('users', 'isAdmin', Sequelize.BOOLEAN, { transaction: t }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('groups', 'number', { transaction: t }),
    queryInterface.removeColumn('specialty', 'symbol', { transaction: t }),
    queryInterface.removeColumn('users', 'isAdmin', { transaction: t }),
  ])),
}
