import React from "react";
import './Loading.css'
import { Hourglass } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
