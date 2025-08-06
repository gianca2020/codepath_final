import './App.css'
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx'
import CardInfo from './components/CardInfo.jsx'
import Filter from './components/Filter.jsx'
import Post from './components/Post.jsx'
import PostInfo from './components/PostInfo.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './client'; 

function App() {
  const [posts, setPostsState] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('UserInfo')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setPostsState(data);
    };
    fetchPosts();
  }, []);

  // Add new post to state
  const handleAddPost = (newPost) => {
    const mappedPost = {
      date: newPost.created_at,          
      title: newPost.title,
      vote: newPost.vote || 0,           
      image: newPost.image_url || '',    
    };
    setPostsState([mappedPost, ...posts]);
  };

  const handleUpvote = (id, isUpvote) => {
    setPostsState(posts =>
      posts.map(post =>
        post.id === id
          ? { ...post, vote: (post.vote || 0) + (isUpvote ? 1 : -1) }
          : post
      )
    );
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.vote || 0) - (a.vote || 0);
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center">
              <div className="max-w-xl w-full">
                <Filter sortBy={sortBy} setSortBy={setSortBy} />
                {sortedPosts.map((post, idx) => (
                  <CardInfo key={idx} {...post} />
                ))}
              </div>
            </div>
          }
        />
        <Route path="/post" element={<Post onAddPost={handleAddPost} />} />
        <Route path="/postinfo" element={<PostInfo onUpvote={handleUpvote} posts={posts} />} />
      </Routes>
    </Router>
  )
}

export default App
