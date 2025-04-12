import React from 'react';

type SortIndicatorProps = {
  isActive: boolean;
  direction: 'asc' | 'desc';
};

const SortIndicator: React.FC<SortIndicatorProps> = ({ isActive, direction }) => {
  if (!isActive) return null;
  return <span>{direction === 'asc' ? '↑' : '↓'}</span>;
};

export default SortIndicator;
