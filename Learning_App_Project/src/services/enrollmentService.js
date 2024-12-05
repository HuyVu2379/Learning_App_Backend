import { where } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';
import userService from '../services/userService'
let saveCourse = (courseId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra nếu người dùng đã đăng ký khóa học
            let enrollment = await findEnrollment(courseId, userId);

            // Nếu đã đăng ký, không làm gì cả
            if (enrollment) {
                resolve({
                    errCode: -1,
                    message: 'User already saved the course'
                });
                return;  // Dừng tiếp tục thực thi hàm nếu đã có bản ghi
            }

            // Tìm thông tin người dùng để lấy role
            let user = await userService.findUserById(userId);

            // Nếu chưa đăng ký, tạo mới bản ghi Enrollment
            let data = await db.Enrollment.create({
                courseId: courseId,
                userId: userId,
                role: user.data.typeUser,  // Giả sử bạn lấy role từ thông tin user
                status: 3,  // Giá trị status, bạn có thể thay đổi nếu cần
                progress: null,
                enrollment_date: null,
                completion_date: null,  // Fix typo "completiton_date" thành "completion_date"
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            resolve({
                errCode: 0,
                message: 'Course saved successfully',
                data: data
            });

        } catch (error) {
            console.error("Error in saveCourse: ", error);
            reject({
                errCode: 1,
                message: 'An error occurred while saving the course',
                error: error.message
            });
        }
    });
};


let registerCourse = (courseId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra nếu người dùng đã lưu khóa học
            let enrollment = await findEnrollment(courseId, userId);
            if (enrollment) {
                await db.Enrollment.update({
                    status: 2,
                    progress: 0,
                    enrollment_date: new Date(),
                    completiton_date: null,
                    updatedAt: new Date()
                }, {
                    where: {
                        courseId: courseId,
                        userId: userId
                    }
                });
                resolve({
                    errCode: 0,
                    message: 'The user has successfully registered for the course'
                });
            } else {
                // Tìm kiêm user để lấy role
                let user = await userService.findUserById(userId);

                // Nếu chưa đăng ký, tạo mới bản ghi Enrollment
                let data = await db.Enrollment.create({
                    courseId: courseId,
                    userId: userId,
                    role: user.data.typeUser,
                    status: 2,
                    progress: 0,
                    enrollment_date: null,
                    completiton_date: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                resolve({
                    errCode: 0,
                    message: 'The user has successfully registered for the course',
                    data: data
                });
            }

        } catch (error) {
            console.error("Error in saveCourse: ", error);
            reject(error)
        }
    })
}

let findEnrollment = (courseId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.Enrollment.findOne({
                where: {
                    courseId: courseId,
                    userId: userId
                }
            })
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
const getAllMyCourse = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Enrollment.findAll({

                where: {
                    userId: userId // Điều kiện lọc theo userId
                },
                attributes: ['enrollmentId', 'status', 'progress'] // Chọn các trường cần thiết từ bảng Enrollment
                ,
                include: [
                    {
                        model: db.Course, // Model của bảng khóa học
                        as: "course", // Alias đã định nghĩa trong model Enrollment
                        attributes: ['courseId', 'nameCourse', 'duration'] // Chọn các trường cần thiết từ bảng Course
                    }
                ],
            });

            // Nếu cần định dạng dữ liệu, map qua kết quả
            const result = data.map((enrollment) => ({
                enrollmentId: enrollment.enrollmentId,
                status: enrollment.status,
                progress: enrollment.progress,
                course: enrollment.course // Thông tin khóa học được liên kết
            }));

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    saveCourse: saveCourse,
    registerCourse: registerCourse,
    getAllMyCourse: getAllMyCourse
}