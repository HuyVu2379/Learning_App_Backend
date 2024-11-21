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
            projectId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'projects', // Tên bảng trong cơ sở dữ liệu
                    key: 'projectId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users', // Tên bảng trong cơ sở dữ liệu
                    key: 'userId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
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
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('submissions');
    }
};