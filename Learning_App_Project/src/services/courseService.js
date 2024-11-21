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
let getCoursesInsprires = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = `
                SELECT *
                FROM courses AS c
                JOIN category_course AS cc ON c.courseId = cc.courseId
                JOIN categories AS cat ON cc.categoryId = cat.categoryId
                WHERE cat.categoryId = :categoryId
            `;

            let courses = await db.sequelize.query(query, {
                replacements: { categoryId: categoryId },
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true
            });

            resolve(courses);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    getAllCourse: getAllCourse,
    getPopularCourse: getPopularCourse,
    getCoursesInsprires: getCoursesInsprires
}