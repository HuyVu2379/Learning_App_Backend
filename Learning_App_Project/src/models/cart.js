'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            // Mỗi Cart thuộc về một User (1-1)
            Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            // Mỗi Cart có thể chứa nhiều Course
            Cart.hasMany(models.Course, { foreignKey: 'cartId' });
        }
    }

    Cart.init({
        cartId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'userId'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    }, {
        sequelize,
        modelName: 'Cart'
    });

    return Cart;
};
