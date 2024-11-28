import { where } from 'sequelize';
import db from '../models/index';
let addToCart = async (cartId, courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.Cart.findByPk(cartId, {
                include: [{ model: db.Course, as: 'courses' }], // Bao gồm quan hệ
                raw: false
            });

            if (!cart) {
                resolve({ errCode: -1, message: "Cart not found" });
            }

            let course = await db.Course.findByPk(courseId, {
                raw: false
            });

            if (!course) {
                resolve({ errCode: -2, message: "Course not found" });
            }

            // Thêm course vào cart
            await cart.addCourse(course);

            resolve({ errCode: 0, message: "Course added to cart successfully" });
        } catch (error) {
            console.error("Error in addToCart: ", error);
            resolve({ errCode: -3, message: "Internal server error" });
            reject(error)
        }
    })
};
let removeFromCart = (cartId, courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy đối tượng cart
            let cart = await db.Cart.findOne({
                include: [{ model: db.Course, as: 'courses' }], // Alias "courses" phải khớp
                where: { cartId: cartId },
                raw: false
            });
            if (!cart) {
                return resolve({ errCode: -1, message: "Cart not found" });
            }

            // Lấy đối tượng course
            let course = await db.Course.findByPk(courseId, {
                raw: false
            });
            if (!course) {
                return resolve({ errCode: -2, message: "Course not found" });
            }

            // Sử dụng alias "courses" để gọi removeCourse
            await cart.removeCourse(course);

            resolve({
                errCode: 0,
                message: "Item removed from cart successfully",
            });
        } catch (error) {
            console.error("Error in removeFromCart: ", error);
            reject({ errCode: -3, message: "Internal server error" });
        }
    });
};



module.exports = {
    addToCart: addToCart,
    removeFromCart: removeFromCart
}