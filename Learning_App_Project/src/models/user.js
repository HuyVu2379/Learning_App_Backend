'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Mối quan hệ 1-N với bảng Submission
            User.hasMany(models.Submission, { foreignKey: 'userId' });
            // Quan hệ nhiều-nhiều với Course thông qua Enrollment
            User.belongsToMany(models.Course, { through: models.Enrollment, foreignKey: 'userId', otherKey: 'courseId' });
            // Mỗi User có một Cart (1-1)
            User.belongsTo(models.Cart, { foreignKey: 'cartId' });
        }
    }

    User.init({
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        avartar: DataTypes.STRING,
        name: DataTypes.STRING,
        expertise: DataTypes.STRING,
        certificate: DataTypes.STRING,
        totalRate: DataTypes.INTEGER,
        typeUser: DataTypes.BOOLEAN,
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Cart',
                key: 'cartId'
            }
        }
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
};