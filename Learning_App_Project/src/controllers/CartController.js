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
        const { cartId, courseId } = req.body;
        let data = await cartService.removeFromCart(cartId, courseId);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            errCode: -3,
            message: 'Internal server error'
        });
    }
}
module.exports = {
    handleAddToCart: handleAddToCart,
    handleRemoveFromCart: handleRemoveFromCart
};