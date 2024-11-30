import express from "express";
import CategoryController from "../controllers/CategoryController";
import CourseController from "../controllers/CourseController";
import UserController from "../controllers/UserController"
import TopicController from "../controllers/TopicController"
import EnrollmentController from "../controllers/EnrollmentController"
import CartController from "../controllers/CartController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/api/categories", CategoryController.handleGetAllCategory); //ok
    router.get("/api/courses", CourseController.handleGetAllCourse); //ok
    router.get("/api/courses/popular", CourseController.handleGetPopularCourse); //ok
    router.get("/api/courses/inspires", CourseController.handleGetCoursesInsprires); //ok
    router.get("/api/users/teachers", UserController.handleGetAllTeacher); //ok
    router.get("/api/courses/topic/:topicName", TopicController.handleFindCourseByTopic);
    router.post("/api/courses/save", EnrollmentController.handleSaveCourse);
    router.post("/api/courses/register", EnrollmentController.handleRegisterCourse);
    router.post("/api/cart/addCourseToCart", CartController.handleAddToCart);
    router.delete("/api/cart/removeFromCart", CartController.handleRemoveFromCart);
    router.get("/api/courses/getCourseByUser", CourseController.handleGetCourseByUser);
    router.post("/api/users/login", UserController.handleLogin); //ok
    router.get("/api/users/getUserById", UserController.handleGetUserById); //ok
    return app.use("/", router);
}

module.exports = initWebRoutes;