
import React, { useState } from 'react';
import { RECIPES } from '../constants';
import { Recipe } from '../types';
import { Clock, Flame, ChevronRight, Search, Filter } from 'lucide-react';

const Recipes: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string>('ALL');
  
  const phases = [
    { id: 'ALL', label: '全部' },
    { id: 'REMOVE', label: '排除' },
    { id: 'REPLACE', label: '替换' },
    { id: 'REINOCULATE', label: '接种' },
    { id: 'REPAIR', label: '修复' }
  ];

  const filteredRecipes = activePhase === 'ALL' 
    ? RECIPES 
    : RECIPES.filter(r => r.phase === activePhase);

  return (
    <div className="space-y-6 pb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">免疫复原食谱</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-100 rounded-full text-gray-500"><Search size={18}/></button>
          <button className="p-2 bg-gray-100 rounded-full text-gray-500"><Filter size={18}/></button>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 no-scrollbar py-1">
        {phases.map(p => (
          <button 
            key={p.id}
            onClick={() => setActivePhase(p.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${activePhase === p.id ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-500'}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48" onClick={() => setExpanded(!expanded)}>
        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 flex gap-1">
          {recipe.tags.map(t => (
            <span key={t} className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-emerald-700 shadow-sm">{t}</span>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg font-bold drop-shadow-md">{recipe.title}</h3>
          <div className="flex gap-4 mt-1 opacity-90 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1"><Clock size={10}/> {recipe.time}</span>
            <span className="flex items-center gap-1"><Flame size={10}/> {recipe.calories} kcal</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="p-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">所需原料</h4>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map(i => (
                <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-medium">{i}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">烹饪步骤</h4>
            <div className="space-y-3">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">{idx + 1}</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
