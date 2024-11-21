'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Enrollment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Enrollment.belongsTo(models.Course, { foreignKey: 'courseId' });
            Enrollment.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }

    Enrollment.init({
        enrollmentId: DataTypes.INTEGER,
        courseId: {
            type: DataTypes.STRING,
            references: {
                model: 'Course',
                key: 'courseId'
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Category',
                key: 'categoryId'
            }
        },
        role: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        progress: DataTypes.INTEGER,
        enrollment_date: DataTypes.DATE,
        completion_date: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Enrollment'
    });

    return Enrollment;
};