import { where } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';
let getAllCourse = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = db.Course.findAll({
                attributes: ['courseId', 'nameCourse', 'author', 'price', 'duration', 'overview', 'totalLike', 'totalShare', 'imageUrl', 'rate', 'totalRate', 'totalLesson'],
                raw: true
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })

}
let getPopularCourse = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Course.findAll({
                attributes: ['courseId', 'nameCourse', 'author', 'price', 'duration', 'overview', 'totalLike', 'totalShare', 'imageUrl', 'rate', 'totalRate', 'totalLesson'],
                raw: true,
                order: [['totalLike', 'DESC'], ['totalShare', 'ASC']],
                limit: 6
            })
            resolve(data);
        } catch (error) {
            reject(error)
        }
    })
}
let getCoursesInsprires = (categoryId, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let courses = await db.Course.findAll({
                include: [
                    {
                        model: db.Category,
                        as: "categories",
                        where: { categoryId: categoryId },
                        attributes: []
                    }
                ],
                limit: limit,
                raw: false
            });
            resolve(courses);
        } catch (error) {
            reject(error);
        }
    });
};

let getCourseByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = db.Enrollment.findAll({
                where: {
                    userId: userId
                }
            })
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
let searchCourseByName = (courseName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = db.Course.findAll({
                where: {
                    courseName: courseName
                }
            })
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
let findCourseByID = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Course.findByPk(courseId)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCourse: getAllCourse,
    getPopularCourse: getPopularCourse,
    getCoursesInsprires: getCoursesInsprires,
    getCourseByUser: getCourseByUser,
    searchCourseByName: searchCourseByName,
    findCourseByID: findCourseByID
}