import React, { useState } from 'react';
import { supabase } from '../client';

const Post = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const createPost = async (event) => {
    event.preventDefault();
    console.log('Submitting:', { title, content, image });

    const { data, error } = await supabase
      .from('UserInfo')
      .insert({ title, content, image_url: image })
      .select();

    console.log('Insert result:', { data, error });

    if (error) {
      console.error('Error inserting post:', error.message);
      return;
    }

    if (data && data.length > 0) {
      onAddPost(data[0]);
      window.location = "/";
    }
  };

  return (
    <form
      onSubmit={createPost}
      className="max-w-3xl mx-auto border p-6 mb-4 rounded-lg shadow-md bg-white flex flex-col mt-10"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Title"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Content (Optional)"
        rows={8}
      />

      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Image URL (Optional)"
      />

      <button
        className="w-full bg-teal-500 rounded-lg p-2 text-white hover:bg-teal-600 cursor-pointer mt-2"
        type="submit"
      >
        Create Post
      </button>
    </form>
  );
};

export default Post;
