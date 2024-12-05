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
    router.get("/api/courses/filterCourse", CourseController.handleSearchCourse); //ok
    router.get("/api/courses/findCourseById", CourseController.handleFindCourseByID); //ok
    router.get("/api/users/teachers", UserController.handleGetAllTeacher); //ok
    router.get("/api/topic/findCourseByName", TopicController.handleFindCourseByTopic); //ok
    router.get("/api/topic/getTopics", TopicController.handleFindTopics);  //ok
    router.post("/api/courses/save", EnrollmentController.handleSaveCourse); //ok
    router.post("/api/courses/register", EnrollmentController.handleRegisterCourse); //ok
    router.get("/api/cart/findCartByUserId", CartController.handleFindCartByUserId);  //ok
    router.post("/api/cart/addCourseToCart", CartController.handleAddToCart); //ok
    router.delete("/api/cart/removeFromCart", CartController.handleRemoveFromCart); //ok
    router.get("/api/cart/getAllCourseInCart", CartController.handleGetAllCourseInCart);
    router.get("/api/courses/getCourseByUser", CourseController.handleGetCourseByUser);
    router.post("/api/users/login", UserController.handleLogin); //ok
    router.get("/api/users/getUserById", UserController.handleGetUserById); //ok
    router.get("/api/courses/getAllMyCourse", EnrollmentController.handleGetAllMyCourse);
    return app.use("/", router);
}

module.exports = initWebRoutes;