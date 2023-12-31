'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Roles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_name: {
                type: Sequelize.STRING
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Roles');
    }
};