'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('projects', {
            projectId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            lessonId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'lessons', // Tên bảng trong cơ sở dữ liệu
                    key: 'lessonId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            title: {
                type: Sequelize.INTEGER,
            },
            submission_deadline: {
                type: Sequelize.DATE,
                allowNull: false
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
        await queryInterface.dropTable('projects');
    }
};