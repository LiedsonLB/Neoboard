import React from "react";
import './Loading.css'
import { Hourglass } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="loading-container">
      <Hourglass
        visible={true}
        height={80}
        width={80}
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#1B2947', '#5B7FFF']}
      />
    </div>
  );
};

export default Loading;
