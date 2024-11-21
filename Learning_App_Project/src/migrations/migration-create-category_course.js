'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('category_course', {
            categoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'categories',  // Tên bảng trong cơ sở dữ liệu
                    key: 'categoryId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            courseId: {
                type: Sequelize.STRING,
                references: {
                    model: 'courses',  // Tên bảng trong cơ sở dữ liệu
                    key: 'courseId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('category_course');
    }
};
