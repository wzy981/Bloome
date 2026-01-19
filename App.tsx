
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ClipboardList, 
  Activity, 
  Users, 
  Settings, 
  PlusCircle, 
  AlertCircle,
  CheckCircle2,
  MinusCircle
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import TrafficLightPage from './components/TrafficLightPage';
import LogEntry from './components/LogEntry';
import RATracker from './components/RATracker';
import Community from './components/Community';
import { FoodLog, SymptomLog, FoodItem } from './types';
import { BASE_FOOD_DB } from './constants';
import { analyzeLogs } from './geminiService';

const App: React.FC = () => {
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [personalizedFoods, setPersonalizedFoods] = useState<FoodItem[]>(BASE_FOOD_DB);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAddFoodLog = (log: FoodLog) => {
    setFoodLogs(prev => [log, ...prev]);
  };

  const handleAddSymptomLog = (log: SymptomLog) => {
    setSymptomLogs(prev => [log, ...prev]);
  };

  const triggerAnalysis = async () => {
    if (foodLogs.length === 0 || symptomLogs.length === 0) return;
    setIsAnalyzing(true);
    try {
      const updated = await analyzeLogs(foodLogs, symptomLogs, personalizedFoods);
      setPersonalizedFoods(updated);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen pb-20 max-w-md mx-auto bg-white shadow-xl relative">
        <header className="p-4 bg-emerald-600 text-white flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-emerald-600 font-bold">B</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Bloome <span className="text-emerald-100 text-sm font-normal">焕己</span></h1>
          </div>
          {isAnalyzing ? (
            <div className="animate-pulse text-xs bg-emerald-500 px-2 py-1 rounded">AI 分析中...</div>
          ) : (
            <button 
              onClick={triggerAnalysis}
              className="text-xs bg-white text-emerald-600 px-3 py-1 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
            >
              更新清单
            </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard foodLogs={foodLogs} symptomLogs={symptomLogs} foods={personalizedFoods} />} />
            <Route path="/lights" element={<TrafficLightPage foods={personalizedFoods} />} />
            <Route path="/log" element={<LogEntry onAddFood={handleAddFoodLog} onAddSymptom={handleAddSymptomLog} />} />
            <Route path="/ra" element={<RATracker onAddSymptom={handleAddSymptomLog} />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-gray-200 px-2 py-3 flex justify-around items-center z-50 shadow-2xl">
          <NavButton to="/" icon={<Home size={22} />} label="主页" />
          <NavButton to="/lights" icon={<ClipboardList size={22} />} label="清单" />
          <NavButton to="/log" icon={<PlusCircle size={24} className="text-emerald-600" />} label="记录" />
          <NavButton to="/ra" icon={<Activity size={22} />} label="追踪" />
          <NavButton to="/community" icon={<Users size={22} />} label="社区" />
        </nav>
      </div>
    </Router>
  );
};

const NavButton: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex flex-col items-center gap-1 px-3 transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
};

export default App;
