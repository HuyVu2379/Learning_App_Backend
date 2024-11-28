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

let handleLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userService.checkLogin(email, password);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}
let handleGetUserById = async (req, res) => {
    try {
        let { userId } = req.query; // Lấy userId từ query string
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' }); // Kiểm tra tham số
        }
        let user = await userService.findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' }); // Xử lý khi không tìm thấy user
        }
        return res.status(200).json(user); // Trả về thông tin người dùng
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
    handleGetAllTeacher: handleGetAllTeacher,
    handleLogin: handleLogin,
    handleGetUserById: handleGetUserById
};
