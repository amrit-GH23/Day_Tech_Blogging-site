import axios from 'axios'
import React, { useState } from 'react'

const CommentBar = (props) => {

  const { comment, author, created_at } = props.comm;


  return (
    <div>
       <div>
        <p className="text-sm text-black mb-3">By {author}</p>
       <h2 className="text-2xl font-semibold text-blue-800 mb-2">
          {comment}
        </h2>
        <p className="text-sm text-gray-500 mb-3">{new Date(created_at).toLocaleDateString()}</p>
       </div>
    </div>
  )
}

export default CommentBar
