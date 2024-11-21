import db from '../models/index';
import { raw } from 'body-parser';
let getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = db.Category.findAll({
                attributes: ['categoryId', 'nameCategory', 'iconName', 'createdAt', 'updatedAt'],
                raw: true
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })

}
let getCategoryRepresent = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = db.Category.findAll({
                attributes: ['categoryId', 'nameCategory', 'iconName', 'createdAt', 'updatedAt'],
                limit: 6,
                raw: true
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })

}
module.exports = {
    getAllCategory: getAllCategory,
    getCategoryRepresent: getCategoryRepresent
}