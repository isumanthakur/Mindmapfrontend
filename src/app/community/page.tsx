"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaComment } from 'react-icons/fa';
import { motion } from 'framer-motion';

type CommentType = {
  id: number;
  content: string;
  user: {
    username: string;
  };
  created_at: string;
};

type PostType = {
  id: number;
  content: string;
  likes_count: number;
  liked: boolean;
  comments: CommentType[];
  user: {
    username: string;
  };
  created_at: string;
};

type CardType = {
  imgSrc: string;
  title: string;
  description: string;
};

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPost, setNewPost] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showPostInput, setShowPostInput] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/community/posts/`, {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };
    fetchPosts();
  }, []);

  const handlePost = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/community/posts/`, {
          content: newPost,
        }, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setPosts([response.data, ...posts]);
        setNewPost('');
        setShowPostInput(false);
      } catch (error) {
        console.error('Error posting:', error);
      }
    }
  };

  const handleLike = async (postId: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/community/posts/${postId}/like/`, {}, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setPosts(posts.map(post => post.id === postId ? { ...post, likes_count: post.likes_count + (post.liked ? -1 : 1), liked: !post.liked } : post));
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

  const handleComment = async (postId: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/community/posts/${postId}/comments/`, {
          content: newComment,
        }, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setPosts(posts.map(post => post.id === postId ? { ...post, comments: [response.data, ...post.comments] } : post));
        setNewComment('');
        setSelectedPostId(null);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <div className="h-100vh grid grid-cols-12 gap-4 md:pt-10 relative" style={{ marginTop: '80px', zIndex: 10 }}>
      
      {/* Left 25% Section */}
      <motion.div 
        className="col-span-3 p-4 space-y-6 rounded-3xl h-[calc(100vh-150px)] overflow-y-auto zIndex: 30 hidden lg:block"  
        style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 30 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <button 
          className={`w-full p-4 rounded-2xl flex items-center justify-center bg-black dark:bg-white text-white dark:text-black`}>
           Trending
        </button>

        <div className="space-y-4">
          {[
            {
              title: "Work-Life Balance",
              content: "Tips and personal experiences on maintaining mental health while juggling work and personal life."
            },
            {
              title: "Coping with Anxiety",
              content: "Explore various techniques and practices that can help manage anxiety, including mindfulness, exercise, and proper rest."
            }
          ].map((topic, index) => (
            <div key={index} className="p-4 rounded-3xl" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 30 }}>
              <h2 className="font-semibold">{topic.title}</h2>
              <p>{topic.content}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Middle 50% Section (Community Feed) */}
      <motion.div 
        className="col-span-12 lg:col-span-6 p-4 md:h-[calc(100vh-150px)] rounded-3xl relative glassmorphism"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        
        {/* Create Post Button */}
        <div className="sticky top-0 bg-transparent z-50 mb-4">
          <button onClick={() => setShowPostInput(!showPostInput)} className="w-full p-3 rounded-3xl bg-black dark:bg-white dark:text-black text-white">
            {showPostInput ? 'Cancel' : 'Create a Post'}
          </button>
          
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: showPostInput ? 'auto' : 0, opacity: showPostInput ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {showPostInput && (
              <div className="mt-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's happening?"
                  className="w-full p-3 rounded-3xl resize-none bg-transparent border border-gray-300"
                  rows={2}
                />
                <button onClick={handlePost} className="mt-2 px-4 py-2 bg-black text-white rounded-3xl">Post</button>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Community Posts - Scrollable */}
        <div className="overflow-y-auto md:max-h-[calc(100vh-250px)] max-h-[calc(100vh)]">
          {posts.map(post => (
            <div key={post.id} className="mb-6 p-4 rounded-3xl" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 30 }}>
              <p className="text-lg mb-3">{post.content}</p>
              <div className="flex items-center space-x-4">
                <motion.button 
                  onClick={() => handleLike(post.id)} 
                  className={`flex items-center space-x-1 ${post.liked ? 'text-red-500' : 'text-gray-500'}`}
                  whileTap={{ scale: 1.2 }}
                >
                  <FaHeart />
                  <span>{post.likes_count}</span>
                </motion.button>
                <button onClick={() => setSelectedPostId(post.id)} className="flex items-center space-x-1 text-gray-500">
                  <FaComment />
                  <span>{post.comments.length}</span>
                </button>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: selectedPostId === post.id ? 'auto' : 0, opacity: selectedPostId === post.id ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {selectedPostId === post.id && (
                  <div className="mt-4">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-3 rounded-3xl resize-none bg-transparent border border-gray-300"
                      rows={2}
                    />
                    <button onClick={() => handleComment(post.id)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-3xl">Submit</button>
                  </div>
                )}
              </motion.div>
              <ul className="mt-4 space-y-2">
                {post.comments.map((comment: CommentType) => (
                  <li key={comment.id} className="border-t border-gray-200 pt-2">{comment.content}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right 25% Section */}
      <motion.div 
        className="col-span-3 rounded-3xl p-4 space-y-4 overflow-y-auto h-[calc(100vh-150px)] hidden lg:block" 
        style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 30 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {[
          { 
            imgSrc: '/10.jpg', 
            title: 'Mindful Breathing Techniques', 
          },
          { 
            imgSrc: '/1.jpeg', 
            title: 'Building Resilience', 
          },
          { 
            imgSrc: '/4.jpeg', 
            title: 'Nutrition and Mental Health', 
            
          }
        ].map((doc, index) => (
          <div key={index} className="p-4 rounded-3xl flex flex-col items-center text-center" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 30 }}>
            <img src={doc.imgSrc} alt={doc.title} className="rounded-full opacity-50 mb-4"/>
            <h3 className="font-semibold mb-2">{doc.title}</h3>
          </div>
        ))}
      </motion.div>

    </div>
  );
};

export default CommunityPage;
