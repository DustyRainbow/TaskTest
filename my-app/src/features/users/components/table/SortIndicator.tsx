import React from 'react';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

type SortIndicatorProps = {
  isActive: boolean;
  direction: 'asc' | 'desc';
};

const SortIndicator: React.FC<SortIndicatorProps> = ({ isActive, direction }) => {
  if (!isActive) return null;
  
  return direction === 'asc' 
    ? <ArrowUpward fontSize="small" /> 
    : <ArrowDownward fontSize="small" />;
};

export default SortIndicator;
