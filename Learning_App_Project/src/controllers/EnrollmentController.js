// enrollmentService.js
import enrollmentService from "../services/enrollmentService";

const handleSaveCourse = async (req, res) => {
    const { courseId, userId } = req.body;
    // Kiểm tra dữ liệu đầu vào
    if (!courseId || !userId) {
        return res.status(400).json({
            errCode: -1,
            message: 'courseId and userId are required',
        });
    }

    try {
        const result = await enrollmentService.saveCourse(courseId, userId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in saveCourse: ", error);
        res.status(500).json({
            errCode: 1,
            message: 'An error occurred while saving the course.',
            error: error.message,
        });
    }
};

const handleRegisterCourse = async (req, res) => {
    const { courseId, userId } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!courseId || !userId) {
        return res.status(400).json({
            errCode: -1,
            message: 'courseId and userId are required',
        });
    }

    try {
        const result = await enrollmentService.registerCourse(courseId, userId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in register Course: ", error);
        res.status(500).json({
            errCode: 1,
            message: 'An error occurred while saving the course.',
            error: error.message,
        });
    }
};
const handleGetAllMyCourse = async (req, res) => {
    const { userId } = req.query;
    try {
        const response = await enrollmentService.getAllMyCourse(userId);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in get My Course: ", error);
        res.status(500).json({
            errCode: 1,
            message: 'An error occurred while saving the course.',
            error: error.message,
        });
    }

};
module.exports = {
    handleSaveCourse: handleSaveCourse,
    handleRegisterCourse: handleRegisterCourse,
    handleGetAllMyCourse: handleGetAllMyCourse
};
