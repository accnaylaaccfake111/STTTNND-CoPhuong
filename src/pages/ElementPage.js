import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ElementPage.css';

// Dữ liệu 20 nguyên tố (giữ nguyên như cũ)
const elements = [
  {
    atomicNumber: 1, symbol: 'H', name: 'Hydrogen', mass: '1.008',
    config: '1s¹', state: 'Khí', melt: '-259.1°C', boil: '-252.9°C', electroneg: '2.20', discover: '1766',
    introVideo: 'https://www.youtube.com/embed/6rdmpx39PRk',
    reactionVideo: 'https://www.youtube.com/embed/fj4Rj8hB5B0',
    questions: [
      { q: 'Hydrogen có số hiệu nguyên tử là?', options: ['1', '2', '3', '4'], correct: '1' },
      { q: 'Nguyên tố nhẹ nhất là?', options: ['Heli', 'Hydrogen', 'Oxy', 'Carbon'], correct: 'Hydrogen' },
      { q: 'Hydrogen ở trạng thái nào ở nhiệt độ phòng?', options: ['Rắn', 'Lỏng', 'Khí', 'Plasma'], correct: 'Khí' },
      { q: 'Ký hiệu của Hydrogen là?', options: ['He', 'H', 'Hy', 'O'], correct: 'H' },
      { q: 'Hydrogen cháy trong không khí tạo thành?', options: ['CO2', 'H2O', 'H2O2', 'CH4'], correct: 'H2O' }
    ],
    story: 'Hydrogen là nguyên tố đầu tiên trong bảng tuần hoàn, chiếm khoảng 75% khối lượng vật chất thông thường. Nó được phát hiện bởi Henry Cavendish năm 1766. Tên gọi "Hydrogen" xuất phát từ tiếng Hy Lạp có nghĩa là "sinh ra nước".'
  },
  {
    atomicNumber: 2, symbol: 'He', name: 'Helium', mass: '4.0026',
    config: '1s²', state: 'Khí', melt: '-272.2°C', boil: '-268.9°C', electroneg: 'none', discover: '1868',
    introVideo: 'https://www.youtube.com/embed/emBWhgUmpSg',
    reactionVideo: 'https://www.youtube.com/embed/y8NQ4Bw0KdA',
    questions: [
      { q: 'Heli có mấy electron?', options: ['1', '2', '3', '4'], correct: '2' },
      { q: 'Heli thuộc nhóm khí hiếm, ký hiệu là?', options: ['H', 'He', 'Li', 'Ne'], correct: 'He' },
      { q: 'Heli thường được dùng để?', options: ['Bơm bóng bay', 'Nhiên liệu', 'Thuốc nổ', 'Pin'], correct: 'Bơm bóng bay' },
      { q: 'Điểm sôi của Heli là?', options: ['-268.9°C', '-252.9°C', '-183°C', '-196°C'], correct: '-268.9°C' },
      { q: 'Heli được phát hiện trên Mặt Trời trước hay trên Trái Đất?', options: ['Trên Mặt Trời', 'Trên Trái Đất', 'Cùng lúc', 'Chưa xác định'], correct: 'Trên Mặt Trời' }
    ],
    story: 'Heli là khí hiếm nhẹ thứ hai (chỉ sau Hydrogen). Nó được phát hiện đầu tiên trong quang phổ Mặt Trời năm 1868, sau đó mới tìm thấy trên Trái Đất. Heli lỏng là chất lạnh nhất (gần 0 tuyệt đối).'
  },
  // 18 nguyên tố còn lại (placeholder)
  ...Array.from({ length: 18 }, (_, i) => {
    const num = i + 3;
    const sym = ['Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'][i];
    const name = ['Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon','Sodium','Magnesium','Aluminum','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium'][i];
    return {
      atomicNumber: num, symbol: sym, name: name,
      mass: '?', config: '?', state: '?', melt: '?', boil: '?', electroneg: '?', discover: '?',
      introVideo: '',
      reactionVideo: '',
      questions: [
        { q: `Câu hỏi 1 về ${name}?`, options: ['A', 'B', 'C', 'D'], correct: 'A' },
        { q: `Câu hỏi 2 về ${name}?`, options: ['A', 'B', 'C', 'D'], correct: 'B' },
        { q: `Câu hỏi 3 về ${name}?`, options: ['A', 'B', 'C', 'D'], correct: 'C' },
        { q: `Câu hỏi 4 về ${name}?`, options: ['A', 'B', 'C', 'D'], correct: 'D' },
        { q: `Câu hỏi 5 về ${name}?`, options: ['A', 'B', 'C', 'D'], correct: 'A' }
      ],
      story: `Câu chuyện về ${name} đang được cập nhật. Hãy quay lại sau nhé!`
    };
  })
];

const ElementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedElement, setSelectedElement] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Tìm nguyên tố theo số hiệu
  const findElementById = (atomicNumber) => {
    return elements.find(el => el.atomicNumber === parseInt(atomicNumber));
  };

  // Khi id trên URL thay đổi, tự động mở modal
  useEffect(() => {
    if (id) {
      const element = findElementById(id);
      if (element) {
        setSelectedElement(element);
        setModalOpen(true);
        setQuizAnswers({});
        setQuizSubmitted(false);
      } else {
        // Nếu id không hợp lệ, quay về trang danh sách
        navigate('/nguyen-to');
      }
    } else {
      // Không có id, đóng modal nếu đang mở
      if (modalOpen) {
        setModalOpen(false);
        setSelectedElement(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const openModal = (element) => {
    setSelectedElement(element);
    setModalOpen(true);
    setQuizAnswers({});
    setQuizSubmitted(false);
    // Cập nhật URL để tạo link riêng (có thể copy)
    navigate(`/nguyen-to/${element.atomicNumber}`, { replace: true });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedElement(null);
    // Quay về route chính /nguyen-to, xóa id khỏi URL
    navigate('/nguyen-to', { replace: true });
  };

  const handleAnswerChange = (qIndex, value) => {
    setQuizAnswers({ ...quizAnswers, [qIndex]: value });
  };

  const handleQuizSubmit = () => setQuizSubmitted(true);

  const calculateScore = () => {
    if (!selectedElement) return 0;
    let correct = 0;
    selectedElement.questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="element-page-container">
      <header className="element-header">
        <h1>🧪 Bảng 20 nguyên tố hóa học đầu tiên</h1>
        <p>Mỗi thẻ đại diện cho một nguyên tố – Bấm vào thẻ để xem thông tin chi tiết</p>
        <Link to="/" className="back-home">← Về trang chủ</Link>
      </header>

      <div className="elements-grid">
        {elements.map((el) => (
          <div className="element-card" key={el.atomicNumber} onClick={() => openModal(el)}>
            <div className="atomic-number">{el.atomicNumber}</div>
            <div className="symbol">{el.symbol}</div>
            <div className="element-name">{el.name}</div>
          </div>
        ))}
      </div>

      {modalOpen && selectedElement && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content-wide" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-wide" onClick={closeModal}>✖</button>

            <div className="modal-header-wide">
              <div className="modal-symbol-wide">{selectedElement.symbol}</div>
              <div className="modal-name-wide">{selectedElement.name}</div>
            </div>

            <div className="modal-body-wide">
              {/* 2 video cùng hàng */}
              <div className="videos-row">
                <div className="video-col">
                  <h3>📺 Video giới thiệu</h3>
                  {selectedElement.introVideo ? (
                    <iframe width="100%" height="250" src={selectedElement.introVideo} title="Intro" frameBorder="0" allowFullScreen></iframe>
                  ) : (
                    <p>🎬 Video giới thiệu đang được cập nhật.</p>
                  )}
                </div>
                <div className="video-col">
                  <h3>⚡ Video phản ứng đặc trưng</h3>
                  {selectedElement.reactionVideo ? (
                    <iframe width="100%" height="250" src={selectedElement.reactionVideo} title="Reaction" frameBorder="0" allowFullScreen></iframe>
                  ) : (
                    <p>⚗️ Video phản ứng đang được cập nhật.</p>
                  )}
                </div>
              </div>

              {/* Câu chuyện */}
              <section className="content-section">
                <h3>📖 Câu chuyện về nguyên tố</h3>
                <p>{selectedElement.story || 'Câu chuyện đang được cập nhật.'}</p>
              </section>

              {/* Thông tin cơ bản */}
              <section className="content-section">
                <details open>
                  <summary>📊 Thông tin cơ bản (bấm để thu gọn)</summary>
                  <div className="basic-info-grid">
                    <div><strong>Số hiệu:</strong> {selectedElement.atomicNumber}</div>
                    <div><strong>Khối lượng:</strong> {selectedElement.mass} u</div>
                    <div><strong>Cấu hình e:</strong> {selectedElement.config}</div>
                    <div><strong>Trạng thái:</strong> {selectedElement.state}</div>
                    <div><strong>Nhiệt độ n/chảy:</strong> {selectedElement.melt}</div>
                    <div><strong>Nhiệt độ sôi:</strong> {selectedElement.boil}</div>
                    <div><strong>Độ âm điện:</strong> {selectedElement.electroneg}</div>
                    <div><strong>Năm phát hiện:</strong> {selectedElement.discover}</div>
                  </div>
                </details>
              </section>

              {/* Câu hỏi trắc nghiệm (cuối cùng) */}
              <section className="content-section">
                <h3>📝 Kiểm tra kiến thức</h3>
                {selectedElement.questions && selectedElement.questions.length > 0 ? (
                  <div className="quiz-container-wide">
                    {selectedElement.questions.map((q, idx) => (
                      <div key={idx} className="quiz-question-wide">
                        <p><strong>Câu {idx+1}:</strong> {q.q}</p>
                        <div className="quiz-options-wide">
                          {q.options.map((opt, optIdx) => (
                            <label key={optIdx}>
                              <input
                                type="radio"
                                name={`q${idx}`}
                                value={opt}
                                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                                disabled={quizSubmitted}
                              /> {opt}
                            </label>
                          ))}
                        </div>
                        {quizSubmitted && (
                          <div className="quiz-feedback-wide">
                            {quizAnswers[idx] === q.correct ? '✅ Đúng' : `❌ Sai (Đáp án: ${q.correct})`}
                          </div>
                        )}
                      </div>
                    ))}
                    {!quizSubmitted ? (
                      <button className="quiz-submit-wide" onClick={handleQuizSubmit}>Nộp bài</button>
                    ) : (
                      <div className="quiz-score-wide">
                        Bạn trả lời đúng {calculateScore()}/{selectedElement.questions.length} câu.
                      </div>
                    )}
                  </div>
                ) : (
                  <p>📚 Bộ câu hỏi đang được xây dựng.</p>
                )}
              </section>
            </div>
          </div>
        </div>
      )}

      <footer className="element-footer">
        <p>📚 20 nguyên tố đầu tiên – Bấm vào thẻ hoặc quét mã QR để mở trực tiếp</p>
      </footer>
    </div>
  );
};

export default ElementPage;