import { where } from 'sequelize';
import db from '../models/index';
import { Op } from 'sequelize';
let getAllTeacher = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: {
                    typeUser: 1
                },
                attributes: ['userId', 'avartar', 'rate', 'name', 'expertise', 'certificate', 'totalRate', 'typeUser'],
                raw: false
            });
            resolve(data);
        } catch (error) {
            console.error("Error fetching teachers: ", error);
            reject(error);
        }
    });
};

let findUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: {
                    userId: userId
                }
            });
            resolve({
                errCode: 1,
                message: "user found",
                data: data
            });
        } catch (error) {
            console.error("Error fetching teachers: ", error);
            reject(error);
        }
    });
}

let checkLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra email có tồn tại không
            let user = await checkExistEmail(email);

            if (!user) {
                return resolve({
                    errCode: 1,
                    message: 'Email not found',
                });
            }

            // So sánh mật khẩu
            if (password !== user.password) {
                return resolve({
                    errCode: 2,
                    message: 'Wrong password'
                });
            }

            // Đăng nhập thành công
            resolve({
                errCode: 0,
                message: 'Log in successfully',
                user: user
            });
        } catch (error) {
            console.error("Error in checkLogin:", error);
            reject({
                errCode: -1,
                message: 'Internal server error'
            });
        }
    });
};


let checkExistEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            });

            resolve(user); // Trả về user trực tiếp nếu tìm thấy
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllTeacher: getAllTeacher,
    findUserById: findUserById,
    checkLogin: checkLogin
};
