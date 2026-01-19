
import React, { useState } from 'react';
import { FoodLog, SymptomLog } from '../types';
import { Utensils, Zap, Smile, Search, Calendar, ChevronRight } from 'lucide-react';
import { SYMPTOM_OPTIONS } from '../constants';

interface Props {
  onAddFood: (log: FoodLog) => void;
  onAddSymptom: (log: SymptomLog) => void;
}

const LogEntry: React.FC<Props> = ({ onAddFood, onAddSymptom }) => {
  const [mode, setMode] = useState<'FOOD' | 'SYMPTOM'>('FOOD');
  const [foodInput, setFoodInput] = useState('');
  const [amount, setAmount] = useState('正常');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(5);
  const [success, setSuccess] = useState(false);

  const handleSaveFood = () => {
    if (!foodInput) return;
    onAddFood({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      foodItems: foodInput.split(',').map(s => s.trim()),
      amount
    });
    setFoodInput('');
    showSuccess();
  };

  const handleSaveSymptom = () => {
    if (selectedSymptoms.length === 0) return;
    onAddSymptom({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      symptoms: selectedSymptoms,
      severity,
      stressLevel: 5
    });
    setSelectedSymptoms([]);
    showSuccess();
  };

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
        <button 
          onClick={() => setMode('FOOD')}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${mode === 'FOOD' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
        >
          <Utensils size={18} /> 饮食记录
        </button>
        <button 
          onClick={() => setMode('SYMPTOM')}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${mode === 'SYMPTOM' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
        >
          <Zap size={18} /> 症状记录
        </button>
      </div>

      {success && (
        <div className="bg-emerald-500 text-white p-3 rounded-xl text-center text-sm font-bold animate-bounce">
          记录成功！
        </div>
      )}

      {mode === 'FOOD' ? (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">吃了什么？</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm min-h-[100px]"
                placeholder="例如: 牛奶, 香蕉, 燕麦 (逗号分隔)"
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">分量</label>
            <div className="flex gap-2">
              {['少量', '正常', '大量'].map(a => (
                <button 
                  key={a}
                  onClick={() => setAmount(a)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${amount === a ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSaveFood}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
          >
            保存饮食日志
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">感受如何？</label>
            <div className="grid grid-cols-2 gap-2">
              {SYMPTOM_OPTIONS.map(s => (
                <button 
                  key={s}
                  onClick={() => setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s])}
                  className={`py-3 rounded-xl text-xs font-medium transition-all border ${selectedSymptoms.includes(s) ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-gray-100 text-gray-500'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700">严重程度</label>
              <span className="text-emerald-600 font-bold">{severity} / 10</span>
            </div>
            <input 
              type="range" 
              min="1" max="10" 
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold">
              <span>轻微</span>
              <span>剧烈</span>
            </div>
          </div>

          <button 
            onClick={handleSaveSymptom}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
          >
            保存症状日志
          </button>
        </div>
      )}
    </div>
  );
};

export default LogEntry;
