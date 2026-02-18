
import React, { useState } from 'react';
import { FoodLog, SymptomLog, StoolLog } from '../types';
import { Utensils, Zap, Search, Waves, Check, ChevronDown } from 'lucide-react';
import { SYMPTOM_OPTIONS, BRISTOL_SCALE, STOOL_COLORS, STOOL_FEELINGS } from '../constants';

interface Props {
  onAddFood: (log: FoodLog) => void;
  onAddSymptom: (log: SymptomLog) => void;
  onAddStool: (log: StoolLog) => void;
}

const LogEntry: React.FC<Props> = ({ onAddFood, onAddSymptom, onAddStool }) => {
  const [mode, setMode] = useState<'FOOD' | 'SYMPTOM' | 'STOOL'>('FOOD');
  const [foodInput, setFoodInput] = useState('');
  const [amount, setAmount] = useState('正常');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(5);
  const [success, setSuccess] = useState(false);

  // Stool States
  const [stoolType, setStoolType] = useState(4);
  const [stoolAmount, setStoolAmount] = useState<'少量' | '中量' | '大量'>('中量');
  const [stoolColor, setStoolColor] = useState('褐色');
  const [stoolFeeling, setStoolFeeling] = useState('顺畅');

  const handleSaveFood = () => {
    if (!foodInput) return;
    onAddFood({ id: Math.random().toString(36).substr(2, 9), timestamp: Date.now(), foodItems: foodInput.split(',').map(s => s.trim()), amount });
    setFoodInput('');
    showSuccess();
  };

  const handleSaveSymptom = () => {
    if (selectedSymptoms.length === 0) return;
    onAddSymptom({ id: Math.random().toString(36).substr(2, 9), timestamp: Date.now(), symptoms: selectedSymptoms, severity, stressLevel: 5 });
    setSelectedSymptoms([]);
    showSuccess();
  };

  const handleSaveStool = () => {
    onAddStool({ id: Math.random().toString(36).substr(2, 9), timestamp: Date.now(), type: stoolType, amount: stoolAmount, color: stoolColor, feeling: stoolFeeling });
    showSuccess();
  };

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl">
        <TabNav active={mode === 'FOOD'} onClick={() => setMode('FOOD')} icon={<Utensils size={14}/>} label="饮食"/>
        <TabNav active={mode === 'SYMPTOM'} onClick={() => setMode('SYMPTOM')} icon={<Zap size={14}/>} label="症状"/>
        <TabNav active={mode === 'STOOL'} onClick={() => setMode('STOOL')} icon={<Waves size={14}/>} label="肠道"/>
      </div>

      {success && (
        <div className="bg-emerald-500 text-white p-3 rounded-xl text-center text-xs font-bold animate-bounce flex items-center justify-center gap-2">
          <Check size={16}/> 记录已存入 AI 模型
        </div>
      )}

      {mode === 'FOOD' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <textarea className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm min-h-[100px]" placeholder="记录吃了什么... (例如: 西蓝花, 土豆)" value={foodInput} onChange={(e) => setFoodInput(e.target.value)} />
          <button onClick={handleSaveFood} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg">保存记录</button>
        </div>
      )}

      {mode === 'SYMPTOM' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-2 gap-2">
            {SYMPTOM_OPTIONS.map(s => (
              <button key={s} onClick={() => setSelectedSymptoms(p => p.includes(s) ? p.filter(i => i !== s) : [...p, s])} className={`py-3 rounded-xl text-xs font-bold border transition-all ${selectedSymptoms.includes(s) ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-100 text-gray-500'}`}>{s}</button>
            ))}
          </div>
          <button onClick={handleSaveSymptom} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg">保存记录</button>
        </div>
      )}

      {mode === 'STOOL' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">布里斯托大便分类 (1-7)</label>
            <div className="grid grid-cols-7 gap-1">
              {BRISTOL_SCALE.map(item => (
                <button key={item.type} onClick={() => setStoolType(item.type)} className={`py-2 rounded-lg text-xs font-bold transition-all border ${stoolType === item.type ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-400'}`}>{item.type}</button>
              ))}
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-bold text-gray-700">{BRISTOL_SCALE[stoolType-1].desc}</p>
              <p className="text-[10px] text-gray-400">{BRISTOL_SCALE[stoolType-1].detail}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">分量</label>
              <select value={stoolAmount} onChange={(e) => setStoolAmount(e.target.value as any)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none">
                {['少量', '中量', '大量'].map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">颜色</label>
              <select value={stoolColor} onChange={(e) => setStoolColor(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none">
                {STOOL_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">排便感受</label>
            <div className="flex flex-wrap gap-2">
              {STOOL_FEELINGS.map(f => (
                <button key={f} onClick={() => setStoolFeeling(f)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${stoolFeeling === f ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-500'}`}>{f}</button>
              ))}
            </div>
          </div>

          <button onClick={handleSaveStool} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100">保存肠道记录</button>
        </div>
      )}
    </div>
  );
};

const TabNav: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${active ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
    {icon} {label}
  </button>
);

export default LogEntry;
