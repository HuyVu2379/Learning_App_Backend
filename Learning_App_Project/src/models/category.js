'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Category.belongsToMany(models.Course, {
                through: 'category_course', // Bảng trung gian
                foreignKey: 'categoryId',   // Khóa ngoại của Category trong bảng trung gian
                otherKey: 'courseId',       // Khóa ngoại của Course trong bảng trung gian
                as: 'courses'               // Alias để dễ dàng truy vấn khi cần
            });
        }
    }

    Category.init({
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,          // Đảm bảo categoryId là khóa chính
            autoIncrement: true,
        },
        nameCategory: DataTypes.STRING,
        iconName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Category'
    });

    return Category;
};
