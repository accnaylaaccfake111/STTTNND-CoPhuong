import React from 'react';

// Hàm tính số electron trên mỗi lớp (dành cho 20 nguyên tố đầu tiên)
const getElectronShells = (z) => {
  if (z <= 2) return [z];
  if (z <= 10) return [2, z - 2];
  if (z <= 18) return [2, 8, z - 10];
  return [2, 8, 8, z - 18];
};

// Component vẽ Mô hình nguyên tử bằng SVG (Zoom tự động theo số vòng)
const AtomModel = ({ atomicNumber, symbol }) => {
  const shells = getElectronShells(atomicNumber);
  const center = 85; 
  // Khoảng cách các vòng bự và thoáng
  const ringRadii = [30, 48, 66, 84]; 

  // LOGIC ZOOM TỰ ĐỘNG:
  const maxRadius = ringRadii[shells.length - 1] + 12; 
  const boxSize = maxRadius * 2;
  const offset = center - maxRadius;
  
  // Tạo viewBox động
  const viewBoxStr = `${offset} ${offset} ${boxSize} ${boxSize}`;

  return (
    <div className="atom-svg-container">
      <svg viewBox={viewBoxStr} width="100%" height="100%">
        {/* Hạt nhân */}
        <circle cx={center} cy={center} r="16" fill="#38bdf8" />
        <text 
          x={center} y={center} 
          fill="white" fontSize="14" fontWeight="bold" 
          textAnchor="middle" dominantBaseline="central"
        >
          {symbol}
        </text>

        {/* Các lớp vỏ và Electron */}
        {shells.map((electronCount, shellIndex) => {
          const r = ringRadii[shellIndex];
          const spinClass = `shell-spin-${shellIndex}`; 
          
          return (
            <g key={`shell-${shellIndex}`} className={`shell-spin ${spinClass}`}>
              {/* Vòng quỹ đạo */}
              <circle cx={center} cy={center} r={r} fill="none" stroke="#0284c7" strokeWidth="2.5" />
              
              {/* Dải hạt Electron */}
              {Array.from({ length: electronCount }).map((_, eIndex) => {
                const angle = (eIndex / electronCount) * 2 * Math.PI - Math.PI / 2;
                const ex = center + r * Math.cos(angle);
                const ey = center + r * Math.sin(angle);
                return (
                  <circle key={`e-${shellIndex}-${eIndex}`} cx={ex} cy={ey} r="4.5" fill="#ef4444" />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AtomModel;