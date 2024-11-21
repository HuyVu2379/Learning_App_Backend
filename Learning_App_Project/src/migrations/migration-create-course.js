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
            },
            rate: {
                type: Sequelize.DOUBLE(10, 2)
            },
            totalRate: {
                type: Sequelize.INTEGER
            },
            totalLesson: {
                type: Sequelize.INTEGER
            },
            totalShare: {
                type: Sequelize.INTEGER,
            },
            imageUrl: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('courses');
    }
};