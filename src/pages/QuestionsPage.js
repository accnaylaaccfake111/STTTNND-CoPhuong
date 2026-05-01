import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import './QuestionsPage.css';

const questions = [
  { id: 1, text: 'Nguyên tố nhẹ nhất, chiếm 75% khối lượng vũ trụ?', hint: 'Ký hiệu H, số hiệu 1', answerLink: '/nguyen-to/1' },
  { id: 2, text: 'Khí hiếm thường dùng bơm bóng bay, rất nhẹ?', hint: 'Ký hiệu He, số hiệu 2', answerLink: '/nguyen-to/2' },
  { id: 3, text: 'Kim loại kiềm nhẹ nhất, dùng trong pin?', hint: 'Ký hiệu Li, số hiệu 3', answerLink: '/nguyen-to/3' },
  { id: 4, text: 'Kim loại cứng, nhẹ, dùng trong hợp kim đồng?', hint: 'Ký hiệu Be, số hiệu 4', answerLink: '/nguyen-to/4' },
  { id: 5, text: 'Á kim, thành phần của axit boric?', hint: 'Ký hiệu B, số hiệu 5', answerLink: '/nguyen-to/5' },
  { id: 6, text: 'Nguyên tố cơ bản của sự sống, tạo thành kim cương?', hint: 'Ký hiệu C, số hiệu 6', answerLink: '/nguyen-to/6' },
  { id: 7, text: 'Khí chiếm 78% không khí, thành phần của amoniac?', hint: 'Ký hiệu N, số hiệu 7', answerLink: '/nguyen-to/7' },
  { id: 8, text: 'Khí cần cho hô hấp, chiếm 21% không khí?', hint: 'Ký hiệu O, số hiệu 8', answerLink: '/nguyen-to/8' },
  { id: 9, text: 'Halogen hoạt động mạnh nhất, dùng trong kem đánh răng?', hint: 'Ký hiệu F, số hiệu 9', answerLink: '/nguyen-to/9' },
  { id: 10, text: 'Khí hiếm dùng trong biển quảng cáo (đèn neon)?', hint: 'Ký hiệu Ne, số hiệu 10', answerLink: '/nguyen-to/10' },
  { id: 11, text: 'Kim loại kiềm màu trắng bạc, phản ứng mạnh với nước?', hint: 'Ký hiệu Na, số hiệu 11', answerLink: '/nguyen-to/11' },
  { id: 12, text: 'Kim loại nhẹ, cháy sáng, thành phần diệp lục?', hint: 'Ký hiệu Mg, số hiệu 12', answerLink: '/nguyen-to/12' },
  { id: 13, text: 'Kim loại phổ biến nhất vỏ Trái Đất, dùng làm lon nước?', hint: 'Ký hiệu Al, số hiệu 13', answerLink: '/nguyen-to/13' },
  { id: 14, text: 'Á kim quan trọng trong chất bán dẫn?', hint: 'Ký hiệu Si, số hiệu 14', answerLink: '/nguyen-to/14' },
  { id: 15, text: 'Phi kim, dùng trong diêm, phân bón?', hint: 'Ký hiệu P, số hiệu 15', answerLink: '/nguyen-to/15' },
  { id: 16, text: 'Chất rắn màu vàng, mùi trứng thối khi cháy?', hint: 'Ký hiệu S, số hiệu 16', answerLink: '/nguyen-to/16' },
  { id: 17, text: 'Halogen màu vàng lục, dùng khử trùng nước?', hint: 'Ký hiệu Cl, số hiệu 17', answerLink: '/nguyen-to/17' },
  { id: 18, text: 'Khí hiếm dùng trong hàn và bảo vệ?', hint: 'Ký hiệu Ar, số hiệu 18', answerLink: '/nguyen-to/18' },
  { id: 19, text: 'Kim loại kiềm, cần thiết cho cơ thể, có trong chuối?', hint: 'Ký hiệu K, số hiệu 19', answerLink: '/nguyen-to/19' },
  { id: 20, text: 'Kim loại kiềm thổ, cần cho xương và răng?', hint: 'Ký hiệu Ca, số hiệu 20', answerLink: '/nguyen-to/20' }
];

const QuestionPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [manualLink, setManualLink] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [cameraFacing, setCameraFacing] = useState('environment');

  const randomizeQuestion = () => {
    setIsAnimating(true);
    setFeedback({ message: '', type: '' });
    setManualLink('');
    setScanResult(null);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * questions.length);
    } while (questions.length > 1 && questions[newIndex].id === currentQuestion.id);
    setCurrentQuestion(questions[newIndex]);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const checkAnswer = (scannedLink) => {
    if (!scannedLink) return;
    const normalizeLink = (link) => {
      try {
        const url = new URL(link, window.location.origin);
        return url.pathname;
      } catch (e) {
        return link.startsWith('/') ? link : `/${link}`;
      }
    };
    if (normalizeLink(scannedLink) === normalizeLink(currentQuestion.answerLink)) {
      setFeedback({ message: '🎉 Chính xác! Tuyệt vời! 🎉', type: 'success' });
    } else {
      setFeedback({ message: '😢 Sai rồi! Hãy thử lại nhé! 😢', type: 'error' });
    }
  };

  const handleScan = (detectedCodes) => {
    if (detectedCodes && detectedCodes.length > 0) {
      const scannedValue = detectedCodes[0].rawValue;
      setScanResult(scannedValue);
      checkAnswer(scannedValue);
    }
  };

  const handleManualCheck = () => {
    if (manualLink.trim()) checkAnswer(manualLink.trim());
    else setFeedback({ message: '📝 Vui lòng nhập link hoặc quét mã QR', type: 'error' });
  };

  return (
    <div className="question-page-simple">
      <Link to="/" className="back-home-btn">← Quay lại trang chủ</Link>
      <div className="question-main-grid">
        <div className="question-left-col">
          <h1 className="question-icon">🔍 Câu hỏi thử thách</h1>
          <div className={`question-display ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="question-text">{currentQuestion.text}</div>
            <div className="question-hint">💡 Gợi ý: {currentQuestion.hint}</div>
          </div>
          <button className="random-btn" onClick={randomizeQuestion}>🔄 Đổi câu hỏi khác</button>
        </div>
        <div className="question-right-col">
          <div className="scanner-area-simple">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>📷 Quét mã QR đáp án</h3>
              <button onClick={() => setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment')} className="camera-switch-btn">🔄 Đổi camera</button>
            </div>
            <Scanner key={cameraFacing} onScan={handleScan} onError={console.error} constraints={{ facingMode: { exact: cameraFacing } }} scanDelay={500} style={{ width: '100%', borderRadius: '20px' }} />
          </div>
          <div className="manual-area">
            <h3>⌨️ Hoặc dán link đáp án:</h3>
            <div className="manual-group">
              <input type="text" placeholder="Ví dụ: /nguyen-to/1  hoặc  https://..." value={manualLink} onChange={(e) => setManualLink(e.target.value)} />
              <button onClick={handleManualCheck}>Kiểm tra</button>
            </div>
          </div>
          {feedback.message && <div className={`feedback-animated ${feedback.type}`}>{feedback.message}</div>}
          {scanResult && !feedback.message && <div className="scan-info-simple"><strong>Link vừa quét:</strong> <code>{scanResult}</code></div>}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;