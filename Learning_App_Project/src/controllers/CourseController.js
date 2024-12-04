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
        let { categoryId, limit } = req.query;
        if (!categoryId || isNaN(categoryId)) {
            return res.status(400).json({ message: "Invalid categoryId" });
        }
        categoryId = parseInt(categoryId);
        if (limit && limit !== 'ALL') {
            if (isNaN(limit)) {
                return res.status(400).json({ message: "Invalid limit" });
            }
            limit = parseInt(limit);
        }
        const data = await courseService.getCoursesInsprires(categoryId, limit);
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
let handleSearchCourse = async (req, res) => {
    try {
        const { courseName } = req.query;
        const data = await courseService.searchCourseByName(courseName);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            errCode: -1,
            message: "filter course failed"
        })
    }
}
let handleFindCourseByID = async (req, res) => {
    try {
        const { courseId } = req.query;
        const data = await courseService.findCourseByID(courseId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            errCode: -1,
            message: "find course failed"
        })
    }
}
module.exports = {
    handleGetAllCourse: handleGetAllCourse,
    handleGetPopularCourse: handleGetPopularCourse,
    handleGetCoursesInsprires: handleGetCoursesInsprires,
    handleGetCourseByUser: handleGetCourseByUser,
    handleSearchCourse: handleSearchCourse,
    handleFindCourseByID: handleFindCourseByID
};
