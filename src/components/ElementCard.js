import React from 'react';

const ElementCard = ({ el, index, onClick }) => {
  const getGroupClass = (classification) => {
    if (classification.includes('Kim loại')) return 'group-metal';
    if (classification.includes('Phi kim') || classification.includes('Á kim')) return 'group-nonmetal'; 
    if (classification.includes('Khí hiếm')) return 'group-noble';
    return '';
  };

  return (
    <div 
      className={`element-card ${getGroupClass(el.classification)}`} 
      onClick={() => onClick(el)}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="atomic-number">{el.atomicNumber}</div>
      <div className="symbol">{el.symbol}</div>
      <div className="element-name">{el.name}</div>
    </div>
  );
};

export default ElementCard;