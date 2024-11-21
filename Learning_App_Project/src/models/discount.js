'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Discount.belongsToMany(models.Course, {
                through: 'discount_course', // Bảng trung gian
                foreignKey: 'discountId',   // Khóa ngoại của Discount trong bảng trung gian
                otherKey: 'courseId',       // Khóa ngoại của Course trong bảng trung gian
                as: 'courses'               // Alias để dễ dàng truy vấn khi cần
            });
        }
    }

    Discount.init({
        discountId: DataTypes.INTEGER,
        reduce: DataTypes.DOUBLE,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        imageUrl: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Discount'
    });

    return Discount;
};