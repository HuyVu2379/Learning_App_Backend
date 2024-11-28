'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Topic belongs to Course (1-N)
            Topic.belongsTo(models.Course, {
                foreignKey: 'courseId', // Đảm bảo khóa ngoại trỏ đến khóa chính của Course
                as: 'course' // Alias, có thể truy vấn dễ dàng sau này
            });
        }
    }

    Topic.init({
        topicId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Đảm bảo topicId là khóa chính
            autoIncrement: true,
            unique: true
        },
        topicName: DataTypes.STRING,
        totalSearch: DataTypes.INTEGER,
        courseId: { // Khóa ngoại đến Course
            type: DataTypes.INTEGER,
            references: {
                model: 'courses', // Tên bảng trong cơ sở dữ liệu
                key: 'courseId'   // Tên khóa chính trong bảng Course
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: true // Có thể thay đổi thành true nếu topic có thể không có course
        }
    }, {
        sequelize,
        modelName: 'Topic'
    });

    return Topic;
};
