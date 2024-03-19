import React from "react";
import { Hourglass } from 'react-loader-spinner'

const LoadingComponent = () => {
  return (
      <div style={{margin: 'auto', width:'100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Hourglass
        visible={true}
        height={40}
        width={40}
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#1B2947', '#5B7FFF']}
      />
      </div>
  );
};

export default LoadingComponent;
