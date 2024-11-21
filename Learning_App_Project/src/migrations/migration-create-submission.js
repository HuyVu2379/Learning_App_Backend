'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('submissions', {
            submitId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            fileUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            submitDay: {
                type: Sequelize.DATE,
            },
            grade: {
                type: Sequelize.DOUBLE
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
        await queryInterface.dropTable('submissions');
    }
};