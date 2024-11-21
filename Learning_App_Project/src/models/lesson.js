'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Lesson extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Lesson.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' })
            Lesson.hasMany(models.Project, { foreignKey: 'lessonId' })
        }
    }

    Lesson.init({
        lessonId: DataTypes.INTEGER,
        content: DataTypes.STRING,
        title: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Lesson'
    });

    return Lesson;
};