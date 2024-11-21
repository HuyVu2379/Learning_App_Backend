'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('enrollments', {
            courseId: {
                type: Sequelize.STRING,
                references: {
                    model: 'courses',
                    key: 'courseId'
                }
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'userId'
                }
            },
            enrollmentId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.BOOLEAN,
            },
            progress: {
                type: Sequelize.INTEGER
            },
            enrollment_date: {
                type: Sequelize.DATE
            },
            completion_date: {
                type: Sequelize.DATE
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
        await queryInterface.dropTable('enrollments');
    }
};