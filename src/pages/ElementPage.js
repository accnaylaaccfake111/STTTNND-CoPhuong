import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { elements } from '../data/elementsData';
import ElementCard from '../components/ElementCard';
import AtomModel from '../components/AtomModel';
import ChemistryChatbot from '../components/ChemistryChatbot';
import './ElementPage.css';

const ElementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedElement, setSelectedElement] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      const el = elements.find(e => e.atomicNumber === parseInt(id));
      if (el) { 
        setSelectedElement(el); 
        setModalOpen(true);
        setQuizAnswers({}); // Reset câu trả lời khi đổi nguyên tố
        setQuizSubmitted(false);
      }
      else navigate('/nguyen-to');
    }
  }, [id, navigate]);

  const openModal = (el) => navigate(`/nguyen-to/${el.atomicNumber}`);
  const closeModal = () => { setModalOpen(false); navigate('/nguyen-to'); };

  const handleAnswerChange = (qIndex, value) => {
    setQuizAnswers({ ...quizAnswers, [qIndex]: value });
  };

  const calculateScore = () => {
    return selectedElement.questions.filter((q, idx) => quizAnswers[idx] === q.correct).length;
  };

  return (
    <div className="element-page-container">
      <header className="element-header">
        <h1>BẢNG NGUYÊN TỐ</h1>
        <p>Bấm vào từng thẻ để khám phá chi tiết</p>
        <Link to="/" className="back-home">← Về trang chủ</Link>
      </header>

      <div className="elements-grid">
        {elements?.map((el, index) => (
          <ElementCard key={el.atomicNumber} el={el} index={index} onClick={openModal} />
        ))}
      </div>

      {modalOpen && selectedElement && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content-wide" onClick={e => e.stopPropagation()}>
            <button className="modal-back-btn" onClick={closeModal}>← Quay lại</button>
            
            <div className="modal-body-wide">
              {/* --- THẺ ĐỊNH DANH (ID CARD) --- */}
              <div className="id-card-wrapper">
                <div className="id-card-header"><h2>THẺ ĐỊNH DANH NGUYÊN TỐ</h2></div>
                <div className="id-card-main">
                  <div className="id-card-info">
                    <div className="info-name-symbol">
                      <div className="element-title">{selectedElement.name}</div>
                      <div className="element-symbol-large">{selectedElement.symbol}</div>
                    </div>
                    <div className="info-details">
                      <p><strong>Số hiệu:</strong> {selectedElement.atomicNumber}</p>
                      <p><strong>Khối lượng:</strong> {selectedElement.mass} amu</p>
                      <p><strong>Phân loại:</strong> {selectedElement.classification}</p>
                      <p><strong>Vị trí:</strong> {selectedElement.position}</p>
                    </div>
                  </div>
                  <div className="id-card-model">
                    <AtomModel atomicNumber={selectedElement.atomicNumber} symbol={selectedElement.symbol} />
                  </div>
                </div>
                <div className="id-card-footer">
                  <p><strong>Đặc điểm:</strong> {selectedElement.characteristics}</p>
                  <p><strong>Ứng dụng:</strong> {selectedElement.applications}</p>
                  <div className="eco-quote">“{selectedElement.ecoNote}” 🌍</div>
                </div>
              </div>

              {/* --- PHẦN VIDEO (ĐÃ KHÔI PHỤC) --- */}
              <div className="videos-row">
                <div className="video-col">
                  <h3>📺 Video giới thiệu</h3>
                  {selectedElement.introVideo ? (
                    <iframe src={selectedElement.introVideo} title="Intro" frameBorder="0" allowFullScreen></iframe>
                  ) : <p>Đang cập nhật video...</p>}
                </div>
                <div className="video-col">
                  <h3>⚡ Phản ứng đặc trưng</h3>
                  {selectedElement.reactionVideo ? (
                    <iframe src={selectedElement.reactionVideo} title="Reaction" frameBorder="0" allowFullScreen></iframe>
                  ) : <p>Đang cập nhật video...</p>}
                </div>
              </div>

              {/* --- CÂU CHUYỆN --- */}
              <section className="content-section">
                <h3>📖 Câu chuyện về {selectedElement.name}</h3>
                <p>{selectedElement.story}</p>
              </section>

              {/* --- TRẮC NGHIỆM (ĐÃ KHÔI PHỤC) --- */}
              <section className="content-section">
                <h3>📝 Kiểm tra kiến thức</h3>
                <div className="quiz-container-wide">
                  {selectedElement.questions.map((q, idx) => (
                    <div key={idx} className="quiz-question-wide">
                      <p><strong>Câu {idx + 1}:</strong> {q.q}</p>
                      <div className="quiz-options-wide">
                        {q.options.map((opt, optIdx) => (
                          <label key={optIdx} className={quizSubmitted && opt === q.correct ? 'correct-opt' : ''}>
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
                        <div className={`quiz-feedback ${quizAnswers[idx] === q.correct ? 'plus' : 'minus'}`}>
                          {quizAnswers[idx] === q.correct ? '✅ Chính xác!' : `❌ Sai rồi (Đáp án: ${q.correct})`}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {!quizSubmitted ? (
                    <button className="quiz-submit-wide" onClick={() => setQuizSubmitted(true)}>Nộp bài</button>
                  ) : (
                    <div className="quiz-score-wide">
                      Kết quả: {calculateScore()} / {selectedElement.questions.length}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
      <ChemistryChatbot />
    </div>
  );
};

export default ElementPage;