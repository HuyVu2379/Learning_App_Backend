'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Submission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Submission.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' })
            Submission.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        }
    }

    Submission.init({
        submitId: DataTypes.INTEGER,
        fileUrl: DataTypes.STRING,
        submitDay: DataTypes.DATE,
        grade: DataTypes.DOUBLE,
    }, {
        sequelize,
        modelName: 'Submission'
    });

    return Submission;
};