
import React from 'react';
import { FoodLog, SymptomLog, FoodItem, TrafficLight } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ShieldCheck, RefreshCcw } from 'lucide-react';

interface Props {
  foodLogs: FoodLog[];
  symptomLogs: SymptomLog[];
  foods: FoodItem[];
}

const Dashboard: React.FC<Props> = ({ foodLogs, symptomLogs, foods }) => {
  const chartData = symptomLogs.slice(0, 10).reverse().map(log => ({
    time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    severity: log.severity
  }));

  const redFoodsCount = foods.filter(f => f.personalizedLight === TrafficLight.RED).length;
  const greenFoodsCount = foods.filter(f => f.personalizedLight === TrafficLight.GREEN).length;

  return (
    <div className="space-y-6">
      <section className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
        <h2 className="text-emerald-800 font-bold mb-1">今日健康简报</h2>
        <p className="text-emerald-600 text-sm mb-4">AI 正在根据您的最新日志动态调整饮食策略。</p>
        
        <div className="grid grid-cols-2 gap-3">
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
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">症状趋势</h3>
          <span className="text-xs text-gray-400">最近 10 次记录</span>
        </div>
        <div className="bg-white p-2 rounded-2xl border border-gray-100 h-48 shadow-sm">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 10]} hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ display: 'none' }}
                />
                <Line type="monotone" dataKey="severity" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 italic text-sm">
              <RefreshCcw className="mb-2 opacity-50" />
              暂无症状记录
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="font-bold text-gray-800 mb-3">最近日志</h3>
        <div className="space-y-3">
          {foodLogs.length === 0 && symptomLogs.length === 0 && (
            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              开始记录您的第一顿餐食吧
            </div>
          )}
          {foodLogs.slice(0, 3).map(log => (
            <div key={log.id} className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
              <div>
                <div className="font-medium text-gray-800">{log.foodItems.join(', ')}</div>
                <div className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</div>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded">{log.amount}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
