const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Lấy token từ header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
    }
    
    const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token không hợp lệ, truy cập bị từ chối' });
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gắn thông tin user vào request
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token không hợp lệ.' });
    }
};