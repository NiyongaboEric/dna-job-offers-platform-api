'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */

    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'deletedAt', { type: Sequelize.DATE })
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */

    // await queryInterface.removeColumn('Users')
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'deletedAt', { transaction: t })
      ])
    })
  }
}
