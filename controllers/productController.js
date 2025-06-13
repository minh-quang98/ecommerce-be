const db = require('../config/db');

/**
 * @desc    Lấy tất cả sản phẩm
 * @route   GET /api/products
 * @access  Public
 */
exports.getAllProducts = async (req, res) => {
  try {
    const [listProducts] = await db.query('SELECT * FROM products ORDER BY created_at DESC LIMIT 0,20');
    return res.status(200).json(listProducts);
  } catch (err) {
    console.log('Lỗi lấy danh sách sản phẩm: ', err);
    res.status(500).json({
      errorCode: 500,
      errorMessage: 'Lỗi Server'
    });
  }
}

exports.createProduct = async (req, res) => {
  const {name, description, price, image_url} = req.body;

  if (!name || !price) {
    return res.status(400).json({
      errorCode: 1,
      errorMessage: "Tên sản phẩm và giá tiền không được để trống!"
    });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)',
      [name, description, price, image_url]
    );

    res.status(200).json({
      message: 'Tạo sản phẩm thành công!',
      result: result
    });
  } catch(err) {
    console.log('Lỗi tạo sản phẩm', err),
    res.status(500).json({
      errorCode: 500,
      errorMessage: 'Lỗi Server',
    });
  }
}