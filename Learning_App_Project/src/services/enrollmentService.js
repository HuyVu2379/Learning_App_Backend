import { where } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';
import userService from '../services/userService'
let saveCourse = (courseId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra nếu người dùng đã đăng ký khóa học
            let enrollment = await findEnrollment(courseId, userId);
            // Tìm kiêm user để lấy role
            let user = await userService.findUserById(userId);
            // Nếu đã đăng ký, không làm gì cả
            if (enrollment) {
                resolve({
                    errCode: -1
                    , message: 'User already save course'
                });
            }

            // Nếu chưa đăng ký, tạo mới bản ghi Enrollment
            let data = await db.Enrollment.create({
                courseId: courseId,
                userId: userId,
                role: user.data.typeUser,
                status: 3,
                progress: null,
                enrollment_date: null,
                completiton_date: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return {
                errCode: 3,
                message: 'Course saved successfully',
                data: data
            };

        } catch (error) {
            console.error("Error in saveCourse: ", error);
            reject(error)
        }
    })
}

let registerCourse = (courseId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra nếu người dùng đã lưu khóa học
            let enrollment = await findEnrollment(courseId, userId);
            if (enrollment) {
                await db.Enrollment.update({
                    status: 1,
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
                    status: 3,
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
module.exports = {
    saveCourse: saveCourse,
    registerCourse: registerCourse
}