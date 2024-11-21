'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Project.belongsTo(models.Lesson, { foreignKey: 'lessonId', as: 'lessson' })
            Project.hasMany(models.Submission, { foreignKey: 'projectId' })
        }
    }

    Project.init({
        projectId: DataTypes.INTEGER,
        description: DataTypes.STRING,
        title: DataTypes.INTEGER,
        submission_deadline: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Project'
    });

    return Project;
};