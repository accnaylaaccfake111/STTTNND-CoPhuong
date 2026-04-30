import { useState, useRef, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QrScanner = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [cameraFacing, setCameraFacing] = useState('environment');
  const [isScanning, setIsScanning] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const scannerRef = useRef(null);

  // Kiểm tra thiết bị mobile/desktop
  useEffect(() => {
    const checkDevice = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      // Trên desktop, mặc định dùng camera user (trước)
      if (!mobile) {
        setCameraFacing('user');
      }
    };
    checkDevice();
  }, []);

  // Lấy danh sách camera (hữu ích cho desktop)
  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoDevices);
        
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error('Error getting cameras:', err);
      }
    };
    
    if (hasPermission) {
      getCameras();
    }
  }, [hasPermission]);

  // Kiểm tra hỗ trợ camera
  useEffect(() => {
    const checkCameraSupport = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (videoDevices.length === 0) {
          setError('Không tìm thấy camera trên thiết bị của bạn');
          setHasPermission(false);
        } else {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          setHasPermission(true);
          setError(null);
        }
      } catch (err) {
        console.error('Camera permission error:', err);
        if (err.name === 'NotAllowedError') {
          setError('❌ Bạn chưa cấp quyền truy cập camera. Vui lòng cho phép quyền camera trong trình duyệt.');
        } else if (err.name === 'NotFoundError') {
          setError('❌ Không tìm thấy camera trên thiết bị của bạn.');
        } else {
          setError(`❌ Lỗi: ${err.message}. Vui lòng kiểm tra kết nối và thử lại.`);
        }
        setHasPermission(false);
      }
    };

    checkCameraSupport();
  }, []);

  const handleScan = (detectedCodes) => {
    if (detectedCodes && detectedCodes.length > 0 && isScanning) {
      const scannedValue = detectedCodes[0].rawValue;
      setResult(scannedValue);
      setIsScanning(false);
      setError(null);
      
      // Rung nhẹ nếu là điện thoại
      if (isMobile && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(200);
      }
    }
  };

  const handleError = (err) => {
    console.error('Scan error:', err);
    if (err?.message?.includes('permission') || err?.message?.includes('denied')) {
      setError('❌ Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập camera.');
      setHasPermission(false);
    }
  };

  const toggleCamera = () => {
    if (isMobile) {
      setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment');
    }
    setResult(null);
    setIsScanning(true);
    setError(null);
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
    setResult(null);
    setIsScanning(true);
    setError(null);
  };

  const resetScanner = () => {
    setResult(null);
    setIsScanning(true);
    setError(null);
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      setError(null);
      window.location.reload();
    } catch (err) {
      setError('❌ Vẫn không thể truy cập camera. Vui lòng kiểm tra cài đặt trình duyệt.');
    }
  };

  // Styles responsive
  const styles = {
    container: {
      textAlign: 'center',
      marginTop: isMobile ? '10px' : '20px',
      fontFamily: 'Arial, sans-serif',
      padding: isMobile ? '10px' : '20px',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    },
    title: {
      fontSize: isMobile ? '24px' : '32px',
      margin: '0 0 10px 0',
      color: '#333'
    },
    scannerContainer: {
      margin: '0 auto',
      maxWidth: isMobile ? '100%' : '600px',
      width: '100%',
      position: 'relative',
      backgroundColor: '#000',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    cameraButton: {
      marginTop: '20px',
      padding: isMobile ? '12px 24px' : '10px 20px',
      fontSize: isMobile ? '16px' : '14px',
      backgroundColor: '#2196f3',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginLeft: 'auto',
      marginRight: 'auto',
      transition: 'all 0.3s ease'
    },
    cameraSelect: {
      marginTop: '20px',
      padding: isMobile ? '12px 24px' : '10px 20px',
      fontSize: isMobile ? '16px' : '14px',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      cursor: 'pointer',
      marginLeft: '10px',
      marginRight: '10px'
    },
    resultContainer: {
      marginTop: '30px',
      padding: '20px'
    },
    resultBox: {
      padding: '20px',
      background: 'white',
      borderRadius: '12px',
      display: 'inline-block',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      maxWidth: '90%',
      wordWrap: 'break-word'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '20px'
    },
    primaryButton: {
      padding: isMobile ? '12px 24px' : '10px 20px',
      fontSize: isMobile ? '16px' : '14px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    errorBox: {
      color: '#d32f2f',
      marginTop: '10px',
      fontSize: isMobile ? '14px' : '13px',
      backgroundColor: '#ffebee',
      padding: '12px',
      borderRadius: '8px',
      maxWidth: isMobile ? '90%' : '500px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    footer: {
      marginTop: '30px',
      fontSize: '12px',
      color: '#999',
      borderTop: '1px solid #ddd',
      paddingTop: '15px'
    }
  };

  if (hasPermission === false) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>📷 Quét mã QR</h1>
        <div style={styles.errorBox}>
          <p style={{ fontSize: '18px', margin: '0 0 10px 0' }}>{error || '❌ Không thể truy cập camera'}</p>
          <p style={{ marginTop: '15px', color: '#555' }}>
            {isMobile ? (
              <>
                Trên điện thoại, hãy:
                <br />• Chạm vào biểu tượng 🔒 hoặc 🎥 trên thanh địa chỉ
                <br />• Cho phép quyền truy cập camera
                <br />• Tải lại trang
              </>
            ) : (
              <>
                Trên máy tính, hãy:
                <br />• Đảm bảo bạn đã cắm/có camera
                <br />• Cho phép trình duyệt truy cập camera
                <br />• Tải lại trang
              </>
            )}
          </p>
          <button 
            onClick={requestCameraPermission}
            style={styles.cameraButton}
          >
            🔄 Thử lại & Cấp quyền
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📷 Quét mã QR</h1>
      <p style={{ color: '#666', marginBottom: '15px' }}>
        {isMobile ? 'Đưa mã QR vào khung hình để quét' : 'Đưa mã QR trước camera để quét'}
      </p>
      
      {!result ? (
        <>
          <div style={styles.scannerContainer}>
            <Scanner
              key={isMobile ? cameraFacing : selectedCamera}
              onScan={handleScan}
              onError={handleError}
              constraints={{ 
                ...(isMobile 
                  ? { facingMode: { exact: cameraFacing } }
                  : { deviceId: selectedCamera ? { exact: selectedCamera } : undefined }
                )
              }}
              scanDelay={300}
              style={{ width: '100%', height: 'auto' }}
            />
            
            {/* Khung quét hướng dẫn */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '70%' : '60%',
              height: isMobile ? '70%' : '60%',
              maxWidth: isMobile ? '300px' : '400px',
              maxHeight: isMobile ? '300px' : '400px',
              border: '2px solid #4caf50',
              borderRadius: '12px',
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Điều khiển camera - khác nhau cho mobile và desktop */}
          <div style={styles.buttonGroup}>
            {isMobile ? (
              <button
                onClick={toggleCamera}
                style={styles.cameraButton}
              >
                🔄 {cameraFacing === 'environment' ? 'Chuyển sang camera trước' : 'Chuyển sang camera sau'}
              </button>
            ) : (
              cameras.length > 1 && (
                <select
                  value={selectedCamera}
                  onChange={handleCameraChange}
                  style={styles.cameraSelect}
                >
                  {cameras.map((camera, index) => (
                    <option key={camera.deviceId} value={camera.deviceId}>
                      📹 {camera.label || `Camera ${index + 1}`}
                    </option>
                  ))}
                </select>
              )
            )}
          </div>

          {error && error.includes('quyền') && (
            <div style={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}
        </>
      ) : (
        <div style={styles.resultContainer}>
          <div style={styles.resultBox}>
            <div style={{ fontSize: isMobile ? '48px' : '64px', marginBottom: '10px' }}>✅</div>
            <strong style={{ fontSize: isMobile ? '18px' : '20px' }}>Kết quả quét thành công!</strong>
            <div style={{ 
              marginTop: '15px', 
              padding: '12px', 
              background: '#f0f0f0', 
              borderRadius: '8px',
              wordBreak: 'break-all'
            }}>
              {result.startsWith('http') ? (
                <a 
                  href={result} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#1976d2', textDecoration: 'none' }}
                >
                  🔗 {result}
                </a>
              ) : (
                <span>📄 {result}</span>
              )}
            </div>
          </div>
          <br />
          <button 
            onClick={resetScanner} 
            style={styles.primaryButton}
          >
            🔄 Quét lại
          </button>
        </div>
      )}

      <div style={styles.footer}>
        📱 {isMobile ? 'Điện thoại' : '💻 Máy tính'} | 
        {isMobile 
          ? (cameraFacing === 'environment' ? ' 📷 Camera sau' : ' 🤳 Camera trước')
          : ' 🖥️ Hỗ trợ nhiều camera'
        }
      </div>
    </div>
  );
};

export default QrScanner;