import React from 'react'

const ScrollProgress = ({ progressPercentage }) => {
      return (
        <div className="h-1 w-full bg-gray-300">
          <div
            style={{ width: `${progressPercentage}%` }}
            className={`h-full transition-all duration-200 ${
              progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
            }`}
          ></div>
        </div>
      );
    };

export default ScrollProgress



