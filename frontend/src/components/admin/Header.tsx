// src/components/admin/Header.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaBell, FaChevronDown, FaSignOutAlt, FaKey } from 'react-icons/fa';
import { getNotificationsByUser, deleteAllNotifications, Notification } from '../../api/notificationAPI';
import { io } from 'socket.io-client';
import '@/styles/components/admin/header.scss';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false); // notification
  const [dropdownOpen, setDropdownOpen] = useState(false); // admin
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem('user_id') || '';

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await getNotificationsByUser(userId);
      setNotifications(data);
    } catch (err) {
      console.error('Lỗi khi lấy thông báo', err);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    socket.emit('join', userId);

    socket.on('new-notification', (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => {
      socket.off('new-notification');
    };
  }, [userId]);

  useEffect(() => {
    if (showDropdown && userId) {
      fetchNotifications();
    }
  }, [showDropdown, userId, fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleDropdown = () => {
    setDropdownOpen((v) => !v);
    setShowDropdown(false); // Đóng notification khi mở admin
  };
  const handleToggleNotification = () => {
    setShowDropdown((v) => !v);
    setDropdownOpen(false); // Đóng admin khi mở notification
  };

  const handleDeleteAll = async () => {
    if (!userId) return;
    try {
      await deleteAllNotifications(userId);
      setNotifications([]);
    } catch (err) {
      console.error('Lỗi khi xóa tất cả thông báo', err);
    }
  };

  const getNotificationTypeText = (type: string) => {
    switch (type) {
      case 'order_placed': return 'Đơn hàng đã đặt';
      case 'order_cancelled': return 'Đơn hàng đã hủy';
      case 'user_feedback': return 'Phản hồi từ người dùng';
      case 'other': return 'Thông báo khác';
      default: return 'Thông báo';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    window.location.href = '/login';
  };

  const handleChangePassword = () => {
    window.location.href = '/forgotPassword';
  };

  return (
    <header className="admin-header">
      <div className="right-section">
        <div className="icon-button" onClick={handleToggleNotification}>
          <FaBell />
          {notifications.some(n => !n.read) && <span className="notification-badge"></span>}
        </div>

        {showDropdown && (
          <div className="notification-dropdown" ref={dropdownRef}>
            <h4>Thông báo</h4>

            <ul className="notification-list">
              {notifications.length === 0 ? (
                <li>Không có thông báo nào</li>
              ) : (
                notifications.map((item) => (
                  <li key={item._id} className={item.read ? 'read' : 'unread'}>
                    <span className="notification-type">{getNotificationTypeText(item.type)}: </span>
                    {item.content}
                    <span className="time">{new Date(item.created_at).toLocaleString('vi-VN')}</span>
                  </li>
                ))
              )}
            </ul>

            {notifications.length > 0 && (
              <div className="notification-actions">
                <button onClick={handleDeleteAll}>Xóa tất cả</button>
                <button className="view-all">Xem tất cả thông báo</button>
              </div>
            )}
          </div>
        )}

        <div className={`admin-dropdown${dropdownOpen ? ' open' : ''}`} onClick={handleToggleDropdown} ref={dropdownRef}>
          <span className="admin-text">ADMIN</span>
          <FaChevronDown className="dropdown-icon" />
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={e => { e.stopPropagation(); handleChangePassword(); }}>
              <FaKey style={{ marginRight: 8 }} /> Đổi mật khẩu
            </div>
            <div className="dropdown-item" onClick={e => { e.stopPropagation(); handleLogout(); }}>
              <FaSignOutAlt style={{ marginRight: 8 }} /> Đăng xuất
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;