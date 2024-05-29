import React from "react";
import { Hourglass } from 'react-loader-spinner'

const LoadingComponent = () => {
  return (
    <div style={{ margin: 'auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingComponent;
