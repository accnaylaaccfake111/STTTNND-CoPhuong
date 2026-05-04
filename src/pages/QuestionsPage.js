import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import './QuestionsPage.css';

// Dữ liệu 20 câu hỏi đã cập nhật answerLink thành link đầy đủ (có domain)
const questions = [
  { 
    id: 1, 
    text: 'Nguyên tố nào là chất khí nhẹ nhất trong các chất khí, thường kết hợp với Oxygen để tạo thành nước?', 
    hint: 'Nguyên tố có số hiệu nguyên tử là 1', 
    answerLink: 'https://dinhdanhnguyento.vercel.app/nguyen-to/1',
    symbol: 'H'
  },
  { 
    id: 2, 
    text: 'Khí hiếm nào khi hít vào sẽ khiến giọng nói của bạn trở nên cao vút như nhân vật hoạt hình?', 
    hint: 'Khí hiếm có số hiệu nguyên tử là 2', 
    answerLink: 'https://qrco.de/bgmJgs',
    symbol: 'He'
  },
  { 
    id: 3, 
    text: 'Kim loại kiềm nào có thể nổi trên dầu hỏa và là thành phần cực kỳ quan trọng của pin sạc điện thoại, xe điện?', 
    hint: 'Kim loại kiềm ở chu kì 2, nhóm IA', 
    answerLink: 'https://qrco.de/bgmJh0',
    symbol: 'Li'
  },
  { 
    id: 4, 
    text: 'Kim loại nào có màu xám thép, giúp máy bay nhẹ hơn, tiết kiệm nhiên liệu nhưng bụi của nó lại gây độc cho phổi?', 
    hint: 'Kim loại kiềm thổ ở chu kì 2, nhóm IIA', 
    answerLink: 'https://qrco.de/bgmJh7 ',
    symbol: 'Be'
  },
  { 
    id: 5, 
    text: 'Phi kim nào thường được dùng để sản xuất thủy tinh chịu nhiệt trong phòng thí nghiệm và giúp tăng độ bền cho kính điện thoại?', 
    hint: 'Phi kim có số hiệu nguyên tử là 5', 
    answerLink: 'https://qrco.de/bgmJhW',
    symbol: 'B'
  },
  { 
    id: 6, 
    text: 'Nguyên tố nào được mệnh danh là "chiến thần ngoại giao" và có hai dạng thù hình nổi bật trái ngược nhau là than chì và kim cương?', 
    hint: 'Nguyên tố giúp lọc nước, lọc không khí, số hiệu 6', 
    answerLink: 'https://qrco.de/bgmJha',
    symbol: 'C'
  },
  { 
    id: 7, 
    text: 'Chất khí nào chiếm 78% bầu khí quyển Trái Đất, được coi là "dinh dưỡng xanh" cho cây trồng?', 
    hint: 'Khí không màu, không mùi, số hiệu 7', 
    answerLink: 'https://qrco.de/bgmJhd',
    symbol: 'N'
  },
  { 
    id: 8, 
    text: 'Khí nào được mệnh danh là "Hơi thở của hành tinh", vô cùng cần thiết để duy trì sự sống và sự cháy?', 
    hint: 'Khí giúp bạn thở mỗi ngày, số hiệu 8', 
    answerLink: 'https://qrco.de/bgmJhn',
    symbol: 'O'
  },
  { 
    id: 9, 
    text: 'Phi kim nào hoạt động hóa học mạnh nhất, mà acid của nó có thể ăn mòn cả thủy tinh?', 
    hint: 'Nguyên tố có mặt trong kem đánh răng, có số hiệu nguyên tử là 9', 
    answerLink: 'https://qrco.de/bgmJhq',
    symbol: 'F'
  },
  { 
    id: 10, 
    text: 'Khí hiếm nào phát ra ánh sáng rực rỡ khi có dòng điện chạy qua, rất phổ biến trong các biển quảng cáo phát sáng ở đô thị?', 
    hint: 'Khí hiếm thường dùng làm đèn màu, số hiệu 10', 
    answerLink: 'https://qrco.de/bgmJhu',
    symbol: 'Ne'
  },
  { 
    id: 11, 
    text: 'Kim loại kiềm nào rất mềm (có thể cắt bằng dao nhựa) và là thành phần tạo nên muối ăn hàng ngày?', 
    hint: 'Kim loại kiềm ở chu kì 3, có trong muối ăn', 
    answerLink: 'https://qrco.de/bgmJi3',
    symbol: 'Na'
  },
  { 
    id: 12, 
    text: 'Kim loại nào từng được dùng làm đèn flash trong nhiếp ảnh đời cũ nhờ khả năng phát ra ánh sáng trắng chói lóa khi cháy?', 
    hint: 'Kim loại kiềm thổ, có số hiệu nguyên tử 12', 
    answerLink: 'https://qrco.de/bgmJi6',
    symbol: 'Mg'
  },
  { 
    id: 13, 
    text: 'Kim loại nào phổ biến nhất trong vỏ Trái Đất, siêu nhẹ, chống gỉ tốt?', 
    hint: 'Kim loại dùng làm vỏ lon nước ngọt, có số hiệu 13', 
    answerLink: 'https://qrco.de/bgmJi7',
    symbol: 'Al'
  },
  { 
    id: 14, 
    text: 'Phi kim nào được tìm thấy nhiều trong cát, đá và cực kỳ quan trọng trong công nghệ hiện đại (sản xuất chip, máy tính)?', 
    hint: 'Phi kim quan trọng trong công nghệ bán dẫn, có số hiệu 14', 
    answerLink: 'https://qrco.de/bgmJi8',
    symbol: 'Si'
  },
  { 
    id: 15, 
    text: 'Phi kim nào có trong đầu que diêm để dễ bắt lửa và đóng vai trò quan trọng trong việc tạo xương, răng, DNA?', 
    hint: 'Phi kim được tìm ra từ ... nước tiểu, số hiệu 15', 
    answerLink: 'https://qrco.de/bgmJiD',
    symbol: 'P'
  },
  { 
    id: 16, 
    text: 'Phi kim nào có màu vàng tươi đặc trưng, từng bị gắn liền với "núi lửa địa ngục" và có mùi trứng thối khi cháy tạo hợp chất?', 
    hint: 'Phi kim có màu vàng đặc trưng, số hiệu 16', 
    answerLink: 'https://qrco.de/bgmJiK',
    symbol: 'S'
  },
  { 
    id: 17, 
    text: 'Chất khí nào màu vàng lục nhạt và có mùi hắc, có tính tẩy rửa và sát trùng hiệu quả?', 
    hint: 'Nguyên tố này có trong nước hồ bơi, số hiệu 17', 
    answerLink: 'https://qrco.de/bgmJiT',
    symbol: 'Cl'
  },
  { 
    id: 18, 
    text: 'Khí hiếm nào chiếm khoảng 1% không khí, được ứng dụng bơm vào giữa các lớp kính cửa sổ để cách nhiệt?', 
    hint: 'Khí hiếm có tên nghĩa là "lười biếng"', 
    answerLink: 'https://qrco.de/bgmJiX',
    symbol: 'Ar'
  },
  { 
    id: 19, 
    text: 'Kim loại kiềm nào giúp tim đập ổn định, nhưng khi thả vào nước lại bốc cháy dữ dội với ngọn lửa màu tím?', 
    hint: 'Kim loại kiềm ở chu kì 4, nhóm IA', 
    answerLink: 'https://qrco.de/bgmJie',
    symbol: 'K'
  },
  { 
    id: 20, 
    text: 'Nguyên tố nào là thành phần chính của đá vôi, phấn viết bảng?', 
    hint: 'Nguyên tố tạo nên xương và răng của chúng ta', 
    answerLink: 'https://qrco.de/bgmJip',
    symbol: 'Ca'
  }
];

const QuestionPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [manualAnswer, setManualAnswer] = useState(''); 
  const [scanResult, setScanResult] = useState(null);
  const [cameraFacing, setCameraFacing] = useState('environment');
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra thiết bị
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    // Lắng nghe thay đổi kích thước
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const randomizeQuestion = () => {
    setIsAnimating(true);
    setFeedback({ message: '', type: '' });
    setManualAnswer(''); 
    setScanResult(null);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * questions.length);
    } while (questions.length > 1 && questions[newIndex].id === currentQuestion.id);
    setCurrentQuestion(questions[newIndex]);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const checkAnswerQR = (scannedLink) => {
    if (!scannedLink) return;
    
    // Hàm này rất mạnh mẽ: Nó chỉ lấy phần pathname (VD: "/nguyen-to/5") 
    // từ cả link quét được VÀ link trong database để so sánh.
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
      checkAnswerQR(scannedValue);
    }
  };

  const handleManualCheck = () => {
    if (!manualAnswer.trim()) {
      setFeedback({ message: '📝 Vui lòng nhập ký hiệu nguyên tố', type: 'error' });
      return;
    }
    // So sánh ký hiệu nhập vào với ký hiệu trong dữ liệu (không phân biệt hoa thường)
    if (manualAnswer.trim().toLowerCase() === currentQuestion.symbol.toLowerCase()) {
      setFeedback({ message: '🎉 Chính xác! Tuyệt vời! 🎉', type: 'success' });
    } else {
      setFeedback({ message: '😢 Sai rồi! Hãy thử lại nhé! 😢', type: 'error' });
    }
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

          <div className="manual-area" style={{ marginTop: '20px' }}>
            <h3>⌨️ Hoặc nhập ký hiệu nguyên tố:</h3>
            <div className="manual-group">
              <input
                type="text"
                placeholder="Ví dụ: H, He, Li, Be..."
                value={manualAnswer}
                onChange={(e) => setManualAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleManualCheck()} 
              />
              <button onClick={handleManualCheck}>Kiểm tra</button>
            </div>
          </div>

          {feedback.message && (
            <div className={`feedback-animated ${feedback.type}`} style={{ marginTop: '15px' }}>
              {feedback.message}
            </div>
          )}

        </div>
        <div className="question-right-col">
          <div className="scanner-area-simple">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <h3>📷 Quét mã QR thẻ bài</h3>
              {isMobile && (
                <button onClick={() => setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment')} className="camera-switch-btn">
                  🔄 {cameraFacing === 'environment' ? 'Chuyển cam trước' : 'Chuyển cam sau'}
                </button>
              )}
            </div>
            <Scanner
              key={cameraFacing}
              onScan={handleScan}
              onError={console.error}
              constraints={isMobile ? { facingMode: { exact: cameraFacing } } : undefined}
              scanDelay={500}
              style={{ width: '100%', borderRadius: '20px' }}
            />
          </div>
          
          {scanResult && !feedback.message && (
            <div className="scan-info-simple">
              <strong>Link vừa quét:</strong> <code>{scanResult}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;