import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../client';

const PostInfo = ({ onUpvote, posts }) => {
  const location = useLocation();
  const post = location.state?.post;
  const currentPost = post ? (posts.find(p => p.id === post.id) || post) : null;

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comment_section')
      .select('*')
      .eq('post_id', currentPost.id)
      .order('created_at', { ascending: true });
    if (error) {
      console.error("Error fetching comments:", error.message);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    if (currentPost?.id) fetchComments();
  }, [currentPost?.id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const { error } = await supabase
      .from('comment_section')
      .insert([
        {
          content: commentInput,
          post_id: currentPost.id,
        },
      ]);

    if (error) {
      console.error("Error submitting comment:", error.message);
    } else {
      setCommentInput('');
      fetchComments(); 
    }
  };

  if (!currentPost) {
    return <div className="text-center mt-10">No post data found.</div>;
  }

  const handleUpvoteClick = () => {
    onUpvote(currentPost.id, !currentPost.hasUpvoted);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">{currentPost.title}</h2>
      {currentPost.image_url && (
        <img src={currentPost.image_url} alt="Post" className="mb-4 max-h-96 rounded" />
      )}
      <p className="mb-6">{currentPost.content}</p>
      <p className="mb-4 text-gray-700 font-semibold">Upvotes: {currentPost.vote || 0}</p>
      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 rounded text-white bg-green-500"
          onClick={handleUpvoteClick}
        >
          Upvote
        </button>
      </div>
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <form onSubmit={handleAddComment} className="flex mb-4">
          <input
            type="text"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            className="flex-1 p-2 border rounded mr-2"
            placeholder="Add a comment..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Post
          </button>
        </form>
        <ul >
          {comments.map(comment => (
            <li key={comment.id} className="mb-2 border-b pb-2 bg-gray-50 p-2 rounded">
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostInfo;