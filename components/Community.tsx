
import React from 'react';
import { MessageSquare, Heart, Share2, Languages } from 'lucide-react';

const Community: React.FC = () => {
  const posts = [
    {
      id: '1',
      author: '健康旅人',
      avatar: 'https://picsum.photos/seed/p1/100/100',
      content: '通过 3 周的低 FODMAP 饮食，我的腹胀症状减轻了 70%！大蒜果然是我的红灯食物。',
      tags: ['#IBS', '#低FODMAP'],
      likes: 24,
      comments: 5
    },
    {
      id: '2',
      author: 'Sarah RA Warrior',
      avatar: 'https://picsum.photos/seed/p2/100/100',
      content: 'Morning stiffness is down from 45 min to 10 min. Removing Nightshades made a huge difference for my RA joints.',
      tags: ['#RA', '#AntiInflammatory'],
      likes: 56,
      comments: 12
    }
  ];

  return (
    <div className="space-y-6 pb-4">
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">社区交流</h2>
        <button className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          <Languages size={14} /> 中/英
        </button>
      </header>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-emerald-100" />
              <div>
                <div className="font-bold text-gray-800 text-sm">{post.author}</div>
                <div className="text-[10px] text-gray-400">2小时前</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed">{post.content}</p>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-gray-50 text-gray-400 px-2 py-1 rounded-full font-bold">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-500 transition-colors">
                  <Heart size={16} /> {post.likes}
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-500 transition-colors">
                  <MessageSquare size={16} /> {post.comments}
                </button>
              </div>
              <button className="text-gray-400 hover:text-emerald-500">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl shadow-emerald-200 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-1">加入互助计划</h3>
          <p className="text-emerald-100 text-xs mb-4">分享您的疗愈经验，赢取 AI 营养师 1对1 咨询额度。</p>
          <button className="bg-white text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold shadow-lg">立即发布案例</button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500 rounded-full opacity-50 blur-2xl"></div>
      </div>
    </div>
  );
};

export default Community;
