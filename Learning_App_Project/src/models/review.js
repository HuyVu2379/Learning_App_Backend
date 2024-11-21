'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Review.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' })
        }
    }

    Review.init({
        reviewId: DataTypes.INTEGER,
        content: DataTypes.STRING,
        rate: DataTypes.INTEGER,
        rateTym: DataTypes.INTEGER,
        relyto: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Review'
    });

    return Review;
};