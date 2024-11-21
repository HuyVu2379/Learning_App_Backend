'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Cart.hasOne(models.User, { foreignKey: 'cartId' });
            Cart.hasMany(models.Course, { foreignKey: 'cartId' });
        }
    }

    Cart.init({
        cartId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        sequelize,
        modelName: 'Cart'
    });

    return Cart;
};