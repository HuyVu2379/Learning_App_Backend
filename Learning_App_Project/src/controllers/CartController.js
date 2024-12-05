import cartService from '../services/cartService';

let handleAddToCart = async (req, res) => {
    try {
        const { cartId, courseId } = req.body;
        let data = await cartService.addToCart(cartId, courseId);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            errCode: -3,
            message: 'Internal server error'
        });
    }
}
let handleRemoveFromCart = async (req, res) => {
    try {
        const { cartId, courseId } = req.query;  // Đọc từ query params
        let data = await cartService.removeFromCart(cartId, courseId);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            errCode: -3,
            message: 'Internal server error'
        });
    }
}

let handleFindCartByUserId = async (req, res) => {
    try {
        const { userId } = req.query;
        let data = await cartService.findCartByUserId(userId);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            errCode: -3,
            message: 'Not found cart',
        });
    }
};
let handleGetAllCourseInCart = async (req, res) => {
    try {
        const { cartId } = req.query;
        let data = await cartService.getAllCourseInCart(cartId);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            errCode: -3,
            message: 'Not found cart',
        });
    }
};


module.exports = {
    handleAddToCart: handleAddToCart,
    handleRemoveFromCart: handleRemoveFromCart,
    handleFindCartByUserId: handleFindCartByUserId,
    handleGetAllCourseInCart: handleGetAllCourseInCart
};