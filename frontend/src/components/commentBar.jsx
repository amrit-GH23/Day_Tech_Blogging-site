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
<div className="p-5 hover:bg-[#0F172A]/30 transition-colors">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center text-[#0F172A] font-semibold shadow-lg shadow-[#38BDF8]/30 flex-shrink-0">
        {author?.charAt(0) || 'A'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-[#E5E7EB]">{author || 'Anonymous'}</span>
          <span className="text-[#9CA3AF] text-sm">•</span>
          <span className="text-[#9CA3AF] text-sm">
            {new Date(created_at).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        <p className="text-[#E5E7EB] leading-relaxed">{comment}</p>
      </div>
    </div>
  </div>
);
};

export default CommentBar;