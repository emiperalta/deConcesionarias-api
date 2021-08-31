const categoryService = require('../services/category.service');

const HTTP_STATUS = require('../constants/http-status');

const getAll = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(HTTP_STATUS.OK).json(categories);
};

module.exports = { getAll };
