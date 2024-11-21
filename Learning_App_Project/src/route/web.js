import express from "express";
import CategoryController from "../controllers/CategoryController";
import CourseController from "../controllers/CourseController";
import UserController from "../controllers/UserController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/api/category", CategoryController.handleGetAllCategory);
    router.get("/api/category-represent", CategoryController.handleGetCategoryRepresent);
    router.get("/api/course", CourseController.handleGetAllCourse);
    router.get("/api/course-popular", CourseController.handleGetPopularCourse);
    router.get("/api/course-inspires/:categoryId", CourseController.handleGetCoursesInsprires)
    router.get("/api/teachers", UserController.handleGetAllTeacher)
    return app.use("/", router);
}

module.exports = initWebRoutes;