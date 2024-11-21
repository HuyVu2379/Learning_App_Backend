'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            avartar: {
                type: Sequelize.STRING,
                allowNull: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            expertise: {
                type: Sequelize.STRING,
                allowNull: true
            },
            certificate: {
                type: Sequelize.STRING,
                allowNull: true
            },
            totalRate: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            typeUser: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
