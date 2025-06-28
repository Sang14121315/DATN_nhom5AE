import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Lấy toàn bộ giỏ hàng hiện tại
 */
export const fetchCart = async () => {
  const res = await axios.get(`${API}/cart`, {
    withCredentials: true  // ⚠️ Đảm bảo cái này có nếu backend dùng session/cookie
  });
  return res.data;
};


/**
 * Thêm sản phẩm mới vào giỏ hàng
 * @param product_id Mã sản phẩm
 * @param quantity Số lượng
 * @param price Giá sản phẩm
 */
export const addToCartAPI = async (product_id: string, quantity: number) => {
  return await axios.post(
    `${API}/cart`,
    { product_id, quantity },
    { withCredentials: true }
  );
};


/**
 * Cập nhật số lượng sản phẩm trong giỏ
 * @param product_id Mã sản phẩm
 * @param quantity Số lượng mới
 */
export const updateCartItemAPI = async (product_id: string, quantity: number) => {
  try {
    const res = await axios.put(
      `${API}/cart`,
      { product_id, quantity },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error('Lỗi khi cập nhật giỏ hàng:', err);
    throw err;
  }
};

/**
 * Xoá một sản phẩm khỏi giỏ hàng
 * @param product_id Mã sản phẩm
 */
export const removeCartItemAPI = async (product_id: string) => {
  try {
    const res = await axios.delete(`${API}/cart`, {
      data: { product_id },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('Lỗi khi xoá sản phẩm khỏi giỏ:', err);
    throw err;
  }
};

/**
 * Xoá toàn bộ giỏ hàng
 */
export const clearCartAPI = async () => {
  try {
    const res = await axios.delete(`${API}/cart/clear`, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error('Lỗi khi xoá toàn bộ giỏ hàng:', err);
    throw err;
  }
};
