import React from 'react';
import './ComponentStyle/Loader.css';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="spinner-ring spinner-ring-1"></div>
            <div className="spinner-ring spinner-ring-2"></div>
            <div className="spinner-ring spinner-ring-3"></div>
          </div>
        </div>
        <div className="loader-text">
          <span className="loading-word animate-pulse-text">Loading</span>
          <div className="dots">
            <span className="dot animate-bounce-dot-1">.</span>
            <span className="dot animate-bounce-dot-2">.</span>
            <span className="dot animate-bounce-dot-3">.</span>
          </div>
        </div>
        <div className="loader-subtitle animate-fade-slide">
          Please wait while we prepare your content
        </div>
      </div>
    </div>
  );
}