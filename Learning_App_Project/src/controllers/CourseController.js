import courseService from '../services/courseService';
let handleGetAllCourse = async (req, res) => {
    try {
        let courses = await courseService.getAllCourse();
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};
let handleGetPopularCourse = async (req, res) => {
    try {
        let coursePopulars = await courseService.getPopularCourse();
        return res.status(200).json(coursePopulars);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error accurred" });
    }
}
let handleGetCoursesInsprires = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const data = await courseService.getCoursesInsprires(categoryId);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
let handleGetCourseByUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const data = await courseService.getCourseByUser(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            errCode: -1,
            message: "Get course of teach failed"
        })
    }
}
module.exports = {
    handleGetAllCourse: handleGetAllCourse,
    handleGetPopularCourse: handleGetPopularCourse,
    handleGetCoursesInsprires: handleGetCoursesInsprires,
    handleGetCourseByUser: handleGetCourseByUser
};
