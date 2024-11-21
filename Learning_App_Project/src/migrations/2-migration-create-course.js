'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('courses', {
            courseId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            nameCourse: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DOUBLE(10, 2),
                allowNull: false
            },
            duration: {
                type: Sequelize.TIME,
            },
            overview: {
                type: Sequelize.TEXT,
            },
            totalLike: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            rate: {
                type: Sequelize.DOUBLE(10, 2),
                allowNull: false
            },
            totalRate: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            totalLesson: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            totalShare: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            imageUrl: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('courses');
    }
};