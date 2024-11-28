import categoryService from '../services/CategoryService';

let handleGetAllCategory = async (req, res) => {
    try {
        const limit = req.query.limit
        let categories = await categoryService.getAllCategory(limit);
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
    handleGetAllCategory: handleGetAllCategory,
};
