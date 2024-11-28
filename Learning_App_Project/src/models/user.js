'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Mối quan hệ 1-N với bảng Submission
            User.hasMany(models.Submission, { foreignKey: 'userId' });
            // Quan hệ nhiều-nhiều với Course thông qua Enrollment
            User.belongsToMany(models.Course, { through: models.Enrollment, foreignKey: 'userId', otherKey: 'courseId' });
            // Mỗi User có một Cart (1-1)
            User.hasOne(models.Cart, { foreignKey: 'userId', as: 'cart' }); // "as" giúp dễ truy vấn quan hệ
        }
    }

    User.init({
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        email: DataTypes.STRING,
        password: DataTypes.TEXT,
        avartar: DataTypes.STRING,
        name: DataTypes.STRING,
        rate: DataTypes.DOUBLE,
        expertise: DataTypes.STRING,
        certificate: DataTypes.STRING,
        totalRate: DataTypes.INTEGER,
        typeUser: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
};
