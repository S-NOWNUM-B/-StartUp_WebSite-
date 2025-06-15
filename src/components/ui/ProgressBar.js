import React from 'react';
import '../pages/Home/styles.css'; // Adjust path as needed

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <span className="progress-text">{progress}% завершено</span>
    </div>
  );
};

export default ProgressBar; 