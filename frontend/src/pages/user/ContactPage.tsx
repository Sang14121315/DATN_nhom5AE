import React, { useState } from 'react';
import { sendContact } from '@/api/user/contactAPI';
import '@/styles/pages/user/contact.scss';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    message: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await sendContact(formData);
      setSuccessMsg('✅ Tin nhắn của bạn đã được gửi thành công!');
      setFormData({ name: '', email: '', phone: '', title: '', message: '' });
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || '❌ Gửi tin nhắn thất bại!');
    }
  };

  const faqList = [
    {
      question: 'Tôi có thể mua linh kiện ở đâu?',
      answer: 'Bạn có thể mua trực tiếp tại cửa hàng hoặc đặt hàng online qua website 5AnhEmPC.',
    },
    {
      question: 'Phương thức thanh toán nào được hỗ trợ?',
      answer: 'Chúng tôi hỗ trợ chuyển khoản, thẻ ngân hàng, ví điện tử như Momo, ZaloPay.',
    },
    {
      question: 'Thời gian giao hàng là bao lâu?',
      answer: 'Giao hàng nội thành trong 24h, các tỉnh từ 2–5 ngày làm việc.',
    },
    {
      question: 'Chính sách đổi trả như thế nào?',
      answer: 'Đổi trả trong vòng 7 ngày nếu sản phẩm lỗi do nhà sản xuất. Vui lòng giữ hóa đơn mua hàng.',
    },
  ];

  return (
    <main className="contact-page">
      {/* Info */}
      <section className="contact-intro">
        <h1>Liên hệ với 5AnhEmPC</h1>
        <p>
          Chúng tôi luôn sẵn sàng hỗ trợ mọi thắc mắc của bạn. Hãy gửi thông tin liên hệ nếu cần giúp đỡ!
        </p>
        <div className="contact-info">
          <p><strong>📞 Hotline:</strong> 0909 123 456</p>
          <p><strong>✉️ Email:</strong> hotro@5anhempc.vn</p>
          <p><strong>🏢 Địa chỉ:</strong> 123 Đường Công Nghệ, Quận Kỹ Thuật, TP.HCM</p>
          <p><strong>🕒 Giờ làm việc:</strong> Thứ 2 – Thứ 7, 8:00 – 18:00</p>
        </div>
      </section>

      {/* Form */}
      <section className="contact-form-wrapper">
        <h2>Gửi Yêu Cầu hoặc Câu Hỏi</h2>

        {errorMsg && <div className="alert error">{errorMsg}</div>}
        {successMsg && <div className="alert success">{successMsg}</div>}

        <form className="contact-form" onSubmit={handleSubmit}>
          {[
            { label: 'Chủ đề', name: 'title', type: 'text', placeholder: 'Nhập chủ đề liên hệ' },            
            { label: 'Họ và Tên', name: 'name', type: 'text', placeholder: 'Nhập họ và tên của bạn' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'Nhập email của bạn' },
            { label: 'Số điện thoại', name: 'phone', type: 'text', placeholder: 'Nhập số điện thoại (10 chữ số)' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="form-group">
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                id={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
              />
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="message">Nội dung chi tiết</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Nhập nội dung chi tiết"
              required
            />
          </div>

          <button type="submit" className="submit-btn">GỬI YÊU CẦU</button>
        </form>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>Câu Hỏi Thường Gặp</h2>
        <p>Giải đáp nhanh những thắc mắc phổ biến</p>

        <div className="faq-accordion">
          {faqList.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              >
                {item.question}
                <span className="toggle-icon">{activeIndex === index ? '−' : '+'}</span>
              </button>
              {activeIndex === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
