'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Topics', {
            topicId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            topicName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            totalSearch: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            courseId: {
                type: Sequelize.STRING,
                references: {
                    model: 'courses',  // Tên bảng trong cơ sở dữ liệu
                    key: 'courseId'    // Khóa chính của bảng Course
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: true
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
        await queryInterface.dropTable('Topics');
    }
};
