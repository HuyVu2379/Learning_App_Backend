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
            courseId: {
                type: Sequelize.STRING,
                references: {
                    model: 'courses', // Tên bảng trong cơ sở dữ liệu
                    key: 'courseId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            rate: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            rateTym: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            relyto: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('reviews');
    }
};