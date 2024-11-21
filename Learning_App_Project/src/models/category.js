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
            Category.belongsToMany(models.Course, { through: 'Category_Course', foreignKey: 'categoryId' });
        }
    }

    Category.init({
        categoryId: DataTypes.INTEGER,
        nameCategory: DataTypes.STRING,
        iconName: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Category'
    });

    return Category;
};