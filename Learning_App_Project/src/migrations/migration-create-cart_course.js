'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('cart_course', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            cartId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'carts', // Tên bảng chứa model Cart
                    key: 'cartId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            courseId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'courses', // Tên bảng chứa model Course
                    key: 'courseId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('cart_course');
    },
};
