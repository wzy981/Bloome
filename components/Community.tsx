
import React from 'react';
import { POSTS } from '../constants';
import { Heart, MessageSquare, Plus, Search } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="space-y-4 pb-10">
      <header className="flex justify-between items-center px-1">
        <div className="flex gap-4">
          <button className="text-lg font-bold text-gray-800 border-b-2 border-emerald-500 pb-1">发现</button>
          <button className="text-lg font-bold text-gray-400 pb-1">关注</button>
        </div>
        <button className="p-2 bg-gray-100 rounded-full text-gray-500"><Search size={20}/></button>
      </header>

      {/* Waterfall Feed */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          {POSTS.filter((_, i) => i % 2 === 0).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="space-y-3">
          {POSTS.filter((_, i) => i % 2 !== 0).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transform hover:scale-110 transition-transform active:scale-95">
        <Plus size={32} />
      </button>
    </div>
  );
};

const PostCard: React.FC<{ post: any }> = ({ post }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
    <div className="relative">
      <img src={post.imageUrl} alt={post.title} className="w-full object-cover" />
      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
        {post.tags.slice(0, 1).map(t => (
          <span key={t} className="px-1.5 py-0.5 bg-black/20 backdrop-blur-md rounded text-[8px] font-bold text-white uppercase">{t}</span>
        ))}
      </div>
    </div>
    <div className="p-3 space-y-2">
      <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">{post.title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <img src={post.authorAvatar} alt={post.author} className="w-5 h-5 rounded-full border border-gray-100" />
          <span className="text-[10px] text-gray-500 font-medium truncate max-w-[60px]">{post.author}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Heart size={12} className={post.likes > 1000 ? 'text-red-500 fill-red-500' : ''} />
          <span className="text-[10px] font-bold">{post.likes > 1000 ? (post.likes/1000).toFixed(1) + 'k' : post.likes}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Community;
