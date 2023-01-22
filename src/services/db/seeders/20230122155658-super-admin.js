'use strict'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      fullName: 'John Doe DNA',
      email: 'admin@dna.com',
      password: bcrypt.hashSync('12345', 10),
      is_verified: true,
      is_admin: true,
      token: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
