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
            Enrollment.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
            Enrollment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }

    Enrollment.init({
        enrollmentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        courseId: {
            type: DataTypes.STRING,
            references: {
                model: 'courses', // Tên bảng trong cơ sở dữ liệu
                key: 'courseId'
            },
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users', // Tên bảng trong cơ sở dữ liệu
                key: 'userId'
            },
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        progress: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        enrollment_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        completion_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Enrollment'
    });

    return Enrollment;
};
