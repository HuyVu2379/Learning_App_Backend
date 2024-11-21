'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('reviews', {
            reviewId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            rate: {
                type: Sequelize.INTEGER,
            },
            rateTym: {
                type: Sequelize.INTEGER
            },
            relyto: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('reviews');
    }
};