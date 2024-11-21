'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Quan hệ many-to-many với Category qua bảng Category_Course
            Course.belongsToMany(models.Category, { through: 'Category_Course', foreignKey: 'courseId', otherKey: 'categoryId' });

            // Quan hệ many-to-many với Discount qua bảng Discount_Course
            Course.belongsToMany(models.Discount, { through: 'Discount_Course', foreignKey: 'courseId', otherKey: 'discountId' });

            // Quan hệ many-to-many với Enrollment (sử dụng model Enrollment như bảng nối)
            Course.belongsToMany(models.User, { through: models.Enrollment, foreignKey: 'courseId', otherKey: 'userId' });

            // Quan hệ hasMany với Review
            Course.hasMany(models.Review, { foreignKey: 'courseId' });

            // Quan hệ hasMany với Lesson
            Course.hasMany(models.Lesson, { foreignKey: 'courseId' });
        }
    }

    Course.init({
        courseId: DataTypes.STRING,
        nameCourse: DataTypes.STRING,
        author: DataTypes.STRING,
        price: DataTypes.DOUBLE(10, 2),
        duration: DataTypes.TIME,
        overview: DataTypes.TEXT,
        rate: DataTypes.DOUBLE(10, 2),
        totalRate: DataTypes.INTEGER,
        imageUrl: DataTypes.STRING,
        totalLesson: DataTypes.INTEGER,
        totalLike: DataTypes.INTEGER,
        totalShare: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Course',
        hooks: {
            // Hook này chạy trước khi tạo một bản ghi mới
            beforeCreate: async (course, options) => {
                const prefix = 'CRS';
                const today = moment().format('YYYYMMDD'); // Lấy ngày hiện tại theo định dạng YYYYMMDD
                const lastCourse = await Course.findOne({
                    order: [['createdAt', 'DESC']]
                });

                let newId = '001'; // Mặc định là '001' nếu không có khóa học trước đó
                if (lastCourse) {
                    // Lấy số cuối cùng từ courseId của khóa học cuối cùng
                    const lastIdNumber = parseInt(lastCourse.courseId.slice(-3));
                    newId = (lastIdNumber + 1).toString().padStart(3, '0'); // Tăng số lên và đảm bảo có 3 chữ số
                }

                course.courseId = `${prefix}-${today}-${newId}`; // Gán giá trị courseId cho khóa học mới
            }
        }
    });

    return Course;
};