const { Category } = require('../models');

const getAllCategories = async () => {
  return await Category.findAll();
};

module.exports = { getAllCategories };
