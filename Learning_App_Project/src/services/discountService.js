import { INTEGER } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';
let getAllCategory = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (limit === 'ALL') {
                let data = db.Category.findAll({
                    attributes: ['categoryId', 'nameCategory', 'iconName', 'createdAt', 'updatedAt'],
                    raw: true
                });
                resolve(data);
            }
            else {
                let data = db.Category.findAll({
                    attributes: ['categoryId', 'nameCategory', 'iconName', 'createdAt', 'updatedAt'],
                    raw: true,
                    limit: parseInt(limit)
                });
                resolve(data);
            }
        } catch (error) {
            reject(error);
        }
    })

}
module.exports = {
    getAllCategory: getAllCategory,
}