import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import './QuestionsPage.css';
import { elements } from '../data/elementsData';
import AtomModel from '../components/AtomModel';

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
  const [currentQuestion, setCurrentQuestion] = useState(() => questions[Math.floor(Math.random() * questions.length)]);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [manualAnswer, setManualAnswer] = useState(''); 
  const [cameraFacing, setCameraFacing] = useState('environment');
  const [isMobile, setIsMobile] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [matchedElement, setMatchedElement] = useState(null);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad/i.test(navigator.userAgent));
  }, []);

  const findElement = (symbol) => elements.find(el => el.symbol.toLowerCase() === symbol.toLowerCase());

  const handleSuccess = () => {
    const el = findElement(currentQuestion.symbol);
    setMatchedElement(el);
    setFeedback({ message: '🎉 Chính xác! Tuyệt vời! 🎉', type: 'success' });
    setTimeout(() => { setShowResultModal(true); }, 500);
  };

  const checkAnswerQR = (scannedLink) => {
    if (!scannedLink) return;
    const normalizePath = (link) => {
      try { return new URL(link, window.location.origin).pathname; } 
      catch (e) { return link.startsWith('/') ? link : `/${link}`; }
    };
    const targetPath = `/nguyen-to/${findElement(currentQuestion.symbol)?.atomicNumber}`;
    if (normalizePath(scannedLink).includes(targetPath)) {
      handleSuccess();
    } else {
      setFeedback({ message: '😢 Sai rồi! Hãy thử lại nhé! 😢', type: 'error' });
    }
  };

  const handleManualCheck = () => {
    if (manualAnswer.trim().toLowerCase() === currentQuestion.symbol.toLowerCase()) {
      handleSuccess();
    } else {
      setFeedback({ message: '😢 Sai rồi! Hãy thử lại nhé! 😢', type: 'error' });
    }
  };

  const randomizeQuestion = () => {
    setIsAnimating(true);
    setFeedback({ message: '', type: '' });
    setManualAnswer('');
    setShowResultModal(false);
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="question-page-simple">
      <Link to="/" className="back-home-btn">← Trang chủ</Link>
      
      <div className="question-main-grid animate-fade-up">
        {/* Cột Trái: Câu hỏi & Nhập tay */}
        <div className="question-left-col">
           <h1 className="question-title">🔍 Thử thách</h1>
           <div className={`question-display ${isAnimating ? 'fade-out' : 'fade-in'}`}>
             <div className="question-text">{currentQuestion.text}</div>
             <div className="question-hint">💡 Gợi ý: {currentQuestion.hint}</div>
           </div>
           <button className="random-btn" onClick={randomizeQuestion}>🔄 Đổi câu hỏi</button>
           
           <div className="manual-area">
             <h3>⌨️ Nhập ký hiệu:</h3>
             <div className="manual-group">
               <input 
                 value={manualAnswer} 
                 onChange={(e) => setManualAnswer(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleManualCheck()}
                 placeholder="Ví dụ: H, He..."
               />
               <button onClick={handleManualCheck}>Gửi</button>
             </div>
           </div>

           {feedback.message && <div className={`feedback-animated ${feedback.type}`}>{feedback.message}</div>}
        </div>

        {/* Cột Phải: Máy quét QR */}
        <div className="question-right-col">
           <div className="scanner-area-simple">
             <h3>📷 Quét mã QR thẻ bài</h3>
             <div className="scanner-wrapper">
                <Scanner onScan={(detected) => checkAnswerQR(detected[0]?.rawValue)} />
             </div>
           </div>
        </div>
      </div>

      {/* MODAL KẾT QUẢ: Tương thích Mobile */}
      {showResultModal && matchedElement && (
      <div className="modal-overlay" onClick={() => setShowResultModal(false)}>
        <div className="modal-content-wide animate-pop" onClick={(e) => e.stopPropagation()}>
          <div className="success-header">
            <h2>🌟 CHÍNH XÁC! 🌟</h2>
            <p>Bạn đã giải mã thành công nguyên tố:</p>
          </div>

          {/* Cấu trúc ID Card giống hệt trang ElementPage */}
          <div className="id-card-wrapper">
            <div className="id-card-header">
              <h2>THẺ ĐỊNH DANH NGUYÊN TỐ</h2>
            </div>

            <div className="id-card-main">
              <div className="id-card-info">
                <div className="info-row-top">
                  <span className="info-label">Số hiệu nguyên tử:</span>
                  <span className="info-badge">{matchedElement.atomicNumber}</span>
                </div>
                
                <div className="info-name-symbol">
                  <div className="name-box">
                    <div className="info-label">Tên nguyên tố:</div>
                    <div className="element-title">{matchedElement.name}</div>
                  </div>
                  <div className="symbol-box">
                    <div className="info-label">Kí hiệu hóa học:</div>
                    <div className="element-symbol-large">{matchedElement.symbol}</div>
                  </div>
                </div>

                <div className="info-details">
                  <p><strong>Khối lượng:</strong> {matchedElement.mass} amu</p>
                  <div className="info-row-split">
                    <p><strong>Hóa trị:</strong> {matchedElement.valence}</p>
                    <p><strong>Phân loại:</strong> {matchedElement.classification}</p>
                  </div>
                  <p><strong>Vị trí:</strong> {matchedElement.position}</p>
                </div>
              </div>

              <div className="id-card-model">
                <AtomModel 
                  atomicNumber={matchedElement.atomicNumber} 
                  symbol={matchedElement.symbol} 
                />
              </div>
            </div>

            <div className="id-card-footer">
              <p><strong>Đặc điểm:</strong> {matchedElement.characteristics}</p>
              <p><strong>Ứng dụng:</strong> {matchedElement.applications}</p>
              <div className="eco-quote">
                “{matchedElement.ecoNote}” 🌍
              </div>
            </div>
          </div>

          <button className="close-modal-btn" onClick={randomizeQuestion}>
            Tiếp tục thử thách khác →
          </button>
        </div>
      </div>
)}
    </div>
  );
};

export default QuestionPage;