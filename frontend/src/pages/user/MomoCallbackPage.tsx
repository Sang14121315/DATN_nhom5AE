import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import '@/styles/pages/user/momoCallback.scss';

const MomoCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const resultCode = searchParams.get('resultCode');
    const orderId = searchParams.get('orderId');
    const message = searchParams.get('message');

    console.log('📞 MoMo callback received:', { resultCode, orderId, message });

    if (resultCode === '0') {
      // Thanh toán thành công
      setStatus('success');
      setMessage('Thanh toán thành công! Đơn hàng của bạn đã được xử lý.');
      
      // Xóa giỏ hàng
      clearCart();
      
      // Redirect sau 3 giây
      setTimeout(() => {
        navigate('/orders');
      }, 3000);
    } else {
      // Thanh toán thất bại
      setStatus('error');
      setMessage(message || 'Thanh toán thất bại. Vui lòng thử lại.');
      
      // Redirect sau 3 giây
      setTimeout(() => {
        navigate('/checkout');
      }, 3000);
    }
  }, [searchParams, navigate, clearCart]);

  return (
    <div className="momo-callback-page">
      <div className="callback-container">
        {status === 'loading' && (
          <div className="loading">
            <div className="spinner"></div>
            <h2>Đang xử lý thanh toán...</h2>
          </div>
        )}

        {status === 'success' && (
          <div className="success">
            <div className="icon">✅</div>
            <h2>Thanh toán thành công!</h2>
            <p>{message}</p>
            <p>Bạn sẽ được chuyển đến trang đơn hàng trong vài giây...</p>
            <button onClick={() => navigate('/orders')}>Xem đơn hàng</button>
            <button onClick={() => navigate('/')}>Về trang chủ</button>
          </div>
        )}

        {status === 'error' && (
          <div className="error">
            <div className="icon">❌</div>
            <h2>Thanh toán thất bại</h2>
            <p>{message}</p>
            <p>Bạn sẽ được chuyển về trang thanh toán trong vài giây...</p>
            <button onClick={() => navigate('/checkout')}>Thử lại</button>
            <button onClick={() => navigate('/')}>Về trang chủ</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MomoCallbackPage; 