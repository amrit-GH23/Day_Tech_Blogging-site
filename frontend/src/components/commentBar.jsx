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
        </div>
      </div>
    </div>
  );
};

export default CommentBar;