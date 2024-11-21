'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            userId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            avartar: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            certificate: {
                type: Sequelize.STRING,
                allowNull: true
            },
            totalRate: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            expertise: {
                type: Sequelize.STRING,
                allowNull: true
            },
            typeUser: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            cartId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'carts',
                    key: 'cartId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'  // Nếu cart bị xóa, cartId trong bảng users sẽ được đặt thành NULL
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};