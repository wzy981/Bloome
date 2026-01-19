
import React, { useState, useMemo } from 'react';
import { FoodItem, TrafficLight, FoodCategory, Portion } from '../types';
import { Search, Info, Filter } from 'lucide-react';

interface Props {
  foods: FoodItem[];
}

const TrafficLightPage: React.FC<Props> = ({ foods }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'ALL'>('ALL');
  const [activeLightFilter, setActiveLightFilter] = useState<TrafficLight | 'ALL'>('ALL');

  const categories = Object.values(FoodCategory);

  const filteredFoods = useMemo(() => {
    return foods.filter(f => {
      const matchesSearch = f.nameZh.includes(searchTerm) || f.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
      
      const hasRed = f.portions.some(p => p.light === TrafficLight.RED);
      const hasYellow = f.portions.some(p => p.light === TrafficLight.YELLOW);
      const effectiveLight = hasRed ? TrafficLight.RED : (hasYellow ? TrafficLight.YELLOW : TrafficLight.GREEN);
      
      const matchesLight = activeLightFilter === 'ALL' || effectiveLight === activeLightFilter;
      
      return matchesSearch && matchesCategory && matchesLight;
    });
  }, [foods, searchTerm, selectedCategory, activeLightFilter]);

  return (
    <div className="space-y-4 pb-10">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text"
          placeholder="搜索食物 (例如: 西蓝花, Apple)..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Chips */}
      <div className="flex overflow-x-auto gap-2 py-1 no-scrollbar -mx-4 px-4">
        <button 
          onClick={() => setSelectedCategory('ALL')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${selectedCategory === 'ALL' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-500'}`}
        >
          全部类别
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${selectedCategory === cat ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-500'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Light Filter */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
        <TabButton active={activeLightFilter === 'ALL'} onClick={() => setActiveLightFilter('ALL')} label="全部" />
        <TabButton active={activeLightFilter === TrafficLight.GREEN} onClick={() => setActiveLightFilter(TrafficLight.GREEN)} label="安全" color="bg-green-500" />
        <TabButton active={activeLightFilter === TrafficLight.YELLOW} onClick={() => setActiveLightFilter(TrafficLight.YELLOW)} label="适量" color="bg-yellow-500" />
        <TabButton active={activeLightFilter === TrafficLight.RED} onClick={() => setActiveLightFilter(TrafficLight.RED)} label="避开" color="bg-red-500" />
      </div>

      {/* Food List */}
      <div className="space-y-3">
        {filteredFoods.map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
        {filteredFoods.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">未找到相关食物</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; color?: string }> = ({ active, onClick, label, color }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${active ? (color ? `text-white ${color} shadow-md` : 'bg-white text-gray-800 shadow-sm') : 'text-gray-500 hover:bg-gray-200'}`}
  >
    {label}
  </button>
);

const FoodCard: React.FC<{ food: FoodItem }> = ({ food }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasRed = food.portions.some(p => p.light === TrafficLight.RED);
  const hasYellow = food.portions.some(p => p.light === TrafficLight.YELLOW);
  const effectiveLight = hasRed ? TrafficLight.RED : (hasYellow ? TrafficLight.YELLOW : TrafficLight.GREEN);

  const lightColors = {
    [TrafficLight.GREEN]: 'border-l-green-500 bg-green-50/50',
    [TrafficLight.YELLOW]: 'border-l-yellow-500 bg-yellow-50/50',
    [TrafficLight.RED]: 'border-l-red-500 bg-red-50/50',
  };

  const dotColors = {
    [TrafficLight.GREEN]: 'bg-green-500',
    [TrafficLight.YELLOW]: 'bg-yellow-500',
    [TrafficLight.RED]: 'bg-red-500',
  };

  return (
    <div 
      className={`p-4 rounded-2xl border-l-4 shadow-sm transition-all border border-gray-100 flex gap-4 ${lightColors[effectiveLight]} ${isExpanded ? 'ring-2 ring-emerald-100' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Food Image on the Left */}
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-200 shadow-inner">
        {food.imageUrl ? (
          <img src={food.imageUrl} alt={food.nameZh} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
            <Filter size={20} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex justify-between items-start cursor-pointer">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-gray-800 truncate">{food.nameZh}</h4>
              <span className="text-[9px] bg-white/80 px-1.5 py-0.5 rounded border border-gray-100 text-gray-400 font-bold uppercase tracking-tighter shrink-0">{food.category}</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider truncate">{food.nameEn}</p>
            
            {/* Portion Dots with Weights directly next to them */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1.5">
              {food.portions.map((p, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div 
                    className={`w-2 h-2 rounded-full ${dotColors[p.light]} shadow-sm`}
                  />
                  <span className="text-[10px] text-gray-500 font-bold">{p.weight}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 shrink-0 ml-2">
            <Info size={16} className={`transition-colors ${food.reason ? 'text-emerald-500' : 'text-gray-300'}`} />
            {hasRed && (
              <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter whitespace-nowrap">慎吃剂量</span>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-gray-200/50 space-y-3 animate-in fade-in slide-in-from-top-1 w-full">
            <div className="grid grid-cols-1 gap-2">
              {food.portions.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/60 p-2.5 rounded-xl border border-white">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${dotColors[p.light]}`} />
                    <span className="text-xs font-bold text-gray-700">{p.label}</span>
                  </div>
                  <span className="text-xs text-gray-600 font-bold">{p.weight}</span>
                </div>
              ))}
            </div>
            
            {food.reason && (
              <div className="p-3 bg-emerald-50/50 rounded-xl text-xs text-emerald-800 leading-relaxed border border-emerald-100 shadow-inner">
                <span className="font-bold block mb-1">💡 AI 解析:</span>
                {food.reason}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficLightPage;
