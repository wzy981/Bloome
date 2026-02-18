
import React from 'react';
import { FoodLog, SymptomLog, FoodItem, TrafficLight, AssessmentResult } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ShieldCheck, RefreshCcw, Stethoscope, ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  foodLogs: FoodLog[];
  symptomLogs: SymptomLog[];
  foods: FoodItem[];
  assessment?: AssessmentResult;
}

const Dashboard: React.FC<Props> = ({ foodLogs, symptomLogs, foods, assessment }) => {
  const chartData = symptomLogs.slice(0, 10).reverse().map(log => ({
    time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    severity: log.severity
  }));

  const redFoodsCount = foods.filter(f => f.personalizedLight === TrafficLight.RED).length;
  const greenFoodsCount = foods.filter(f => f.personalizedLight === TrafficLight.GREEN).length;

  return (
    <div className="space-y-6">
      {/* Assessment Promo */}
      <section className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-lg relative overflow-hidden group">
        <Stethoscope size={60} className="absolute -right-2 -bottom-2 opacity-20 group-hover:scale-110 transition-transform" />
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">免疫健康评估</h2>
          <p className="text-blue-100 text-xs mb-4 opacity-90 leading-relaxed">
            {assessment ? `上次评估: ${new Date(assessment.timestamp).toLocaleDateString()}` : '根据《免疫复原方案》自测肠道三大健康维度。'}
          </p>
          <Link to="/assessment" className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-blue-50 transition-colors">
            {assessment ? '查看/重新评估' : '立即开始'} <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* Recipe Shortcut */}
      <section className="bg-orange-500 p-6 rounded-[2rem] text-white shadow-lg relative overflow-hidden group">
        <BookOpen size={60} className="absolute -right-2 -bottom-2 opacity-20 group-hover:scale-110 transition-transform" />
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">4R 修复食谱</h2>
          <p className="text-orange-100 text-xs mb-4 opacity-90 leading-relaxed">
            为您定制的抗炎与肠道修复饮食方案。
          </p>
          <Link to="/recipes" className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-xl text-xs font-bold shadow-md">
            浏览食谱 <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      <section className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
        <h2 className="text-emerald-800 font-bold mb-1">今日健康简报</h2>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg"><ShieldCheck className="text-green-600" size={20} /></div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{greenFoodsCount}</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">安全食物</div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg"><AlertTriangle className="text-red-600" size={20} /></div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{redFoodsCount}</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">需避开</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-3">症状趋势</h3>
        <div className="bg-white p-2 rounded-2xl border border-gray-100 h-40 shadow-sm">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 10]} hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} labelStyle={{ display: 'none' }} />
                <Line type="monotone" dataKey="severity" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 italic text-xs">暂无趋势记录</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
