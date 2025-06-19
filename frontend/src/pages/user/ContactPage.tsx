import React, { useState } from 'react';
import '@/styles/pages/user/contact.scss';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: '',
    title: '',
    message: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Liên hệ:', formData);
    // TODO: Gửi dữ liệu liên hệ đến server
  };

  return (
    <div className="contact-layout">
      {/* Banner trái */}
      <div className="side-banner">
        <img src="/assets/banner-left.png" alt="Banner trái" />
      </div>

      {/* Sidebar */}
            <div className="sidebar">
              <h4>📋 DANH MỤC SẢN PHẨM</h4>
              <div className="dropdown">
                <ul>
                  <li>PC Gaming - Máy tính chơi game</li>
                  <li>PC Workstation</li>
                  <li>Tự Build Cấu Hình PC</li>
                  <li>PC VĂN PHÒNG</li>
                  <li>PC AMD GAMING</li>
                  <li>PC Core Ultra</li>
                  <li>PC GAMING ĐẸP – CAO CẤP</li>
                  <li>PC GIẢ LẬP - ẢO HÓA</li>
                  <li>PC MINI</li>
                  <li>PC Refurbished</li>
                </ul>
              </div>
            </div>


      {/* Nội dung chính */}
      <div className="main-contact-content">
        <div className="top-menu">
          <span>🛡️ Chất lượng đảm bảo</span>
          <span>🚛 Vận chuyển siêu nhanh</span>
          <span>📞 Tư vấn PC</span>
          <span>✉️ Liên hệ</span>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <select name="subject" value={formData.subject} onChange={handleChange} required>
            <option value="">Quý khách đang quan tâm về</option>
            <option value="support">Hỗ trợ kỹ thuật</option>
            <option value="sales">Tư vấn mua hàng</option>
            <option value="feedback">Góp ý / Khiếu nại</option>
          </select>

          <input
            type="text"
            name="title"
            placeholder="Quý khách vui lòng nhập tiêu đề"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Xin quý khách vui lòng mô tả chi tiết"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="row-input">
            <input
              type="email"
              name="email"
              placeholder="Nhập Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Nhập SĐT"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Gửi liên hệ</button>
        </form>
      </div>

      {/* Banner phải */}
      <div className="side-banner">
        <img src="/assets/banner-right.png" alt="Banner phải" />
      </div>
    </div>
  );
};

export default ContactPage;
