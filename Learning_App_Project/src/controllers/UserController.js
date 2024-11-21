import userService from '../services/userService';
let handleGetAllTeacher = async (req, res) => {
    try {
        let teachers = await userService.getAllTeacher();
        return res.status(200).json(teachers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}
module.exports = {
    handleGetAllTeacher: handleGetAllTeacher
};
