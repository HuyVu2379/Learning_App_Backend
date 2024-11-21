import db from '../models/index';

let getAllTeacher = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: {
                    typeUser: 0
                },
                include: [{
                    model: db.Cart,
                    attributes: ['cartId']
                }],
                attributes: ['userId', 'avartar', 'name', 'expertise', 'certificate', 'totalRate', 'typeUser'],
                raw: false
            });
            resolve(data);
        } catch (error) {
            console.error("Error fetching teachers: ", error);
            reject(error);
        }
    });
};



module.exports = {
    getAllTeacher: getAllTeacher
};
