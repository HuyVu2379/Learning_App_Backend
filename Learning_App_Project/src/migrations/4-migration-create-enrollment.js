'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('enrollments', {
            enrollmentId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
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
            role: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            progress: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            enrollment_date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            completion_date: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('enrollments');
    }
};
