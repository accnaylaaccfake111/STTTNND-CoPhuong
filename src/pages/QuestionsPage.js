import React from 'react';
import QrScanner from '../components/QrScanner';
import './QuestionsPage.css';

const QuestionPage = () => {
  return (
    <div className="question-page">
      <div className="question-header">
        <h1>📷 Quét mã QR để nhận câu hỏi</h1>
        <p>Sử dụng camera để quét mã QR từ đề thi hoặc tài liệu</p>
      </div>
      <div className="scanner-wrapper">
        <QrScanner />
      </div>
      <div className="question-note">
        <p>💡 Gợi ý: Mỗi mã QR tương ứng với một câu hỏi trắc nghiệm. Sau khi quét, kết quả sẽ hiển thị nội dung câu hỏi.</p>
      </div>
    </div>
  );
};

export default QuestionPage;