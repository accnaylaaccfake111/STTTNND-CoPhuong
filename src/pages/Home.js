import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🔬 ĐỊNH DANH NGUYÊN TỐ</h1>
        <p>Khám phá bảng tuần hoàn hoặc quét mã QR để trả lời câu hỏi</p>
      </header>

      <div className="cards-container">
        {/* Card Nguyên tố */}
        <div className="card" onClick={() => navigate('/nguyen-to')}>
          <div className="card-icon">🧪</div>
          <h2>Nguyên tố</h2>
          <p>Tra cứu thông tin các nguyên tố hóa học, khối lượng, tính chất...</p>
          <button className="card-btn">Khám phá →</button>
        </div>

        {/* Card Câu hỏi */}
        <div className="card" onClick={() => navigate('/cau-hoi')}>
          <div className="card-icon">❓</div>
          <h2>Câu hỏi</h2>
          <p>Quét mã QR để nhận câu hỏi và kiểm tra kiến thức của bạn</p>
          <button className="card-btn">Quét ngay →</button>
        </div>
      </div>

      <footer className="home-footer">
        <p>© 2026 - Ứng dụng hỗ trợ học tập tương tác</p>
      </footer>
    </div>
  );
};

export default Home;