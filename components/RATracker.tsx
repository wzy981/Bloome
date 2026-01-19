
import React, { useState } from 'react';
import { SymptomLog } from '../types';
import { Info, MapPin } from 'lucide-react';

interface Props {
  onAddSymptom: (log: SymptomLog) => void;
}

const RA_JOINTS = [
  { id: 'l-shoulder', name: '左肩', x: '35%', y: '25%' },
  { id: 'r-shoulder', name: '右肩', x: '65%', y: '25%' },
  { id: 'l-elbow', name: '左肘', x: '25%', y: '40%' },
  { id: 'r-elbow', name: '右肘', x: '75%', y: '40%' },
  { id: 'l-wrist', name: '左腕', x: '15%', y: '55%' },
  { id: 'r-wrist', name: '右腕', x: '85%', y: '55%' },
  { id: 'l-knee', name: '左膝', x: '40%', y: '75%' },
  { id: 'r-knee', name: '右膝', x: '60%', y: '75%' },
  { id: 'l-ankle', name: '左踝', x: '40%', y: '90%' },
  { id: 'r-ankle', name: '右踝', x: '60%', y: '90%' },
];

const RATracker: React.FC<Props> = ({ onAddSymptom }) => {
  const [selectedJoints, setSelectedJoints] = useState<string[]>([]);
  const [morningStiffness, setMorningStiffness] = useState(0);

  const toggleJoint = (id: string) => {
    setSelectedJoints(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSave = () => {
    onAddSymptom({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      symptoms: ['RA 关节痛', `晨僵 ${morningStiffness} 分钟`],
      severity: selectedJoints.length > 0 ? 7 : 2,
      stressLevel: 5,
      jointPainAreas: selectedJoints
    });
    alert('关节数据已记录，AI 将结合饮食日志进行分析。');
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-bold text-gray-800">RA 关节疼痛地图</h2>
        <p className="text-xs text-gray-500 mt-1">点击人体图上的点来标记疼痛位置</p>
      </header>

      <div className="relative aspect-[3/4] bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden flex items-center justify-center p-8">
        {/* Simple Stylized Body SVG */}
        <svg viewBox="0 0 200 400" className="h-full opacity-20">
          <path d="M100 20 L115 50 L140 50 L150 120 L130 200 L140 300 L120 380 L100 380 L80 380 L60 300 L70 200 L50 120 L60 50 L85 50 Z" fill="currentColor" className="text-gray-400" />
          <circle cx="100" cy="35" r="25" fill="currentColor" className="text-gray-400" />
        </svg>

        {RA_JOINTS.map(joint => (
          <button
            key={joint.id}
            onClick={() => toggleJoint(joint.id)}
            style={{ left: joint.x, top: joint.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${selectedJoints.includes(joint.id) ? 'bg-red-500 scale-125 shadow-lg shadow-red-200' : 'bg-gray-300/50 hover:bg-gray-400'}`}
          >
            <MapPin size={12} className="text-white" />
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-4 shadow-sm">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-gray-700">晨僵时长 (分钟)</label>
          <span className="text-emerald-600 font-bold">{morningStiffness} min</span>
        </div>
        <input 
          type="range" 
          min="0" max="180" step="5"
          value={morningStiffness}
          onChange={(e) => setMorningStiffness(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
      </div>

      <button 
        onClick={handleSave}
        className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
      >
        同步到健康模型
      </button>

      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-blue-800">
        <Info size={20} className="shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <p className="font-bold mb-1">小贴士</p>
          饮食诱发的 RA 发作通常有 24-72 小时的延迟。Bloome AI 会自动回溯您的日志寻找关联。
        </div>
      </div>
    </div>
  );
};

export default RATracker;
