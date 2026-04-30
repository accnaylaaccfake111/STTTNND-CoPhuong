import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QrScanner = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = (detectedCodes) => {
    if (detectedCodes && detectedCodes.length > 0) {
      const scannedValue = detectedCodes[0].rawValue;
      setResult(scannedValue);
      setError(null);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError(err?.message || 'Lỗi khi truy cập camera hoặc quét mã');
  };

  const resetScanner = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial' }}>
      <h1>📷 Quét mã QR</h1>

      {!result ? (
        <>
          <div style={{ margin: '0 auto', maxWidth: '500px' }}>
            <Scanner
              onScan={handleScan}
              onError={handleError}
              // Tùy chọn: chọn camera sau (environment) hoặc trước (user)
              constraints={{ facingMode: 'environment' }}
              // Tùy chọn: khung quét
              // scanDelay={500}
            />
          </div>
          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              ⚠️ {error}. Hãy đảm bảo bạn đã cấp quyền camera và chạy trên localhost/HTTPS.
            </div>
          )}
        </>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <div style={{ padding: '15px', background: '#e0f7e0', borderRadius: '8px', display: 'inline-block' }}>
            <strong>✅ Kết quả:</strong>
            <div style={{ wordBreak: 'break-all', marginTop: '8px' }}>
              {result.startsWith('http') ? (
                <a href={result} target="_blank" rel="noopener noreferrer">
                  {result}
                </a>
              ) : (
                <span>{result}</span>
              )}
            </div>
          </div>
          <br />
          <button onClick={resetScanner} style={{ marginTop: '20px', padding: '8px 16px', cursor: 'pointer' }}>
            🔄 Quét lại
          </button>
        </div>
      )}
    </div>
  );
};

export default QrScanner;