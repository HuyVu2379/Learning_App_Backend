'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('carts', {
            cartId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // Tên bảng Users
                    key: 'userId'   // Cột userId trong bảng Users
                },
                onUpdate: 'CASCADE', // Cập nhật tự động khi userId thay đổi
                onDelete: 'CASCADE', // Xóa tự động khi userId bị xóa
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
        await queryInterface.dropTable('carts');
    }
};
