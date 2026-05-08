import React, { useState, useEffect, useRef } from 'react';
import './ChemistryChatbot.css';

// 1. IMPORT HÌNH ẢNH VÀO ĐÂY (Nhớ thay đổi tên file cho khớp với ảnh thực tế của bạn)
import botIcon from '../data/img/chatbot-icon.png'; 

const ChemistryChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Chào bạn! Mình là trợ lý Hóa học. Mình có thể giúp gì cho bạn về 20 nguyên tố đầu tiên và các kiến thức Hóa học?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    
    const chatHistory = newMessages.filter((msg, index) => index !== 0);
    const contents = chatHistory.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ 
              text: "Bạn là một trợ lý ảo chuyên về Hóa học trên một trang web học tập. Nhiệm vụ TỐI THƯỢNG của bạn là CHỈ trả lời các câu hỏi liên quan đến môn Hóa học, đặc biệt là 20 nguyên tố hóa học đầu tiên trong bảng tuần hoàn. Nếu người dùng hỏi bất kỳ chủ đề nào khác, hãy từ chối một cách lịch sự, ngắn gọn và hướng họ quay lại với chủ đề Hóa học." 
            }]
          },
          contents: contents
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Lỗi từ Google API:", data);
        const errorMessage = data.error?.message || "Lỗi không xác định từ máy chủ";
        setMessages(prev => [...prev, { role: 'model', text: `⚠️ Lỗi API: ${errorMessage}` }]);
        setIsLoading(false);
        return;
      }
      
      if (data.candidates && data.candidates.length > 0) {
        const botReply = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'model', text: botReply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, hệ thống không trả về câu trả lời hợp lệ.' }]);
      }
    } catch (error) {
      console.error("Lỗi mạng hoặc API:", error);
      setMessages(prev => [...prev, { role: 'model', text: '⚠️ Mất kết nối tới máy chủ. Vui lòng kiểm tra lại mạng.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbot-wrapper">
      {/* 2. THAY THẾ BIỂU TƯỢNG BẰNG THẺ IMG */}
      <button className={`chatbot-toggle-btn ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : <img src={botIcon} alt="Chat" className="bot-icon-img" />}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>⚗️ Trợ lý Hóa Học</h3>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble-container ${msg.role}`}>
                <div className={`chat-bubble ${msg.role}`}>{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble-container model">
                <div className="chat-bubble model loading"><span>.</span><span>.</span><span>.</span></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-area">
            <input 
              type="text" 
              placeholder="Hỏi về nguyên tố..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !inputValue.trim()}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemistryChatbot;