module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('subgroups', 'name', Sequelize.TEXT, { transaction: t }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumm('subgroups', 'name', { transaction: t }),
  ])),
}
