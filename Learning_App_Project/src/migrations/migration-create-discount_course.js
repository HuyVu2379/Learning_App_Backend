'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Discount_Course', {
            discountId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'discounts', // Tên bảng tham chiếu, thường là số nhiều
                    key: 'discountId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            courseId: {
                type: Sequelize.STRING,
                references: {
                    model: 'courses', // Tên bảng tham chiếu, thường là số nhiều
                    key: 'courseId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
        await queryInterface.dropTable('Discount_Course');
    }
};
