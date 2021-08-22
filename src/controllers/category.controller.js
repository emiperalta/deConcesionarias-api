const { Category } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  },
};
