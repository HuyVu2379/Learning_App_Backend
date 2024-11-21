import categoryService from '../services/CategoryService';

let handleGetAllCategory = async (req, res) => {
    try {
        let categories = await categoryService.getAllCategory();
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};
let handleGetCategoryRepresent = async (req, res) => {
    try {
        let categories = await categoryService.getCategoryRepresent();
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
    handleGetAllCategory: handleGetAllCategory,
    handleGetCategoryRepresent: handleGetCategoryRepresent
};
