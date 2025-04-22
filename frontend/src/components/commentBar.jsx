// import axios from 'axios'
// import React, { useState } from 'react'

// const CommentBar = (props) => {

//   const { comment, author, created_at } = props.comm;


//   return (
//        <div className='m-2 rounded-2xl'>
//         <p className="text-sm text-black mb-1">By {author}</p>
//        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
//           {comment}
//         </h2>
//         <p className="text-sm text-gray-500 mb-3">{new Date(created_at).toLocaleDateString()}</p>
//         <hr />
//        </div>
//   )
// }

// export default CommentBar

import React from 'react';

const CommentBar = (props) => {
  const { comment, author, created_at } = props.comm;
  
  // Function to get initials from author name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Function to generate consistent color based on author name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
      'bg-yellow-100 text-yellow-600',
      'bg-indigo-100 text-indigo-600',
    ];
    
    const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charCodeSum % colors.length;
    
    return colors[colorIndex];
  };
  
  const avatarColorClass = getAvatarColor(author);
  const timeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMs = now - commentDate;
    
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInSecs < 60) return 'just now';
    if (diffInMins < 60) return `${diffInMins} min${diffInMins > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return commentDate.toLocaleDateString();
  };

  return (
    <div className="p-5 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${avatarColorClass}`}>
          {getInitials(author)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">{author}</h3>
            <span className="text-xs text-gray-500">{timeAgo(created_at)}</span>
          </div>
          <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{comment}</p>
          
          <div className="mt-2 flex items-center space-x-4">
            <button className="flex items-center text-xs text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              Like
            </button>
            <button className="flex items-center text-xs text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBar;