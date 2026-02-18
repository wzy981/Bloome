
import React, { useState } from 'react';
import { IMMUNE_ASSESSMENT_QUESTIONS } from '../constants';
import { AssessmentResult } from '../types';
import { ChevronRight, ChevronLeft, CheckCircle2, ShieldPlus, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { generateImmunePlan } from '../geminiService';

interface Props {
  onComplete: (result: AssessmentResult) => void;
}

type Step = 'INTRO' | 'DYSBIOSIS' | 'DIGESTION' | 'LEAKY_GUT' | 'RESULT';

const ImmuneSelfTest: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('INTRO');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [aiPlan, setAiPlan] = useState<string | null>(null);

  const handleAnswer = (id: string, score: number) => {
    setAnswers(prev => ({ ...prev, [id]: score }));
  };

  const calculateScore = (type: keyof typeof IMMUNE_ASSESSMENT_QUESTIONS) => {
    return IMMUNE_ASSESSMENT_QUESTIONS[type].reduce((sum, q) => sum + (answers[q.id] || 0), 0);
  };

  const currentResult: AssessmentResult = {
    dysbiosisScore: calculateScore('dysbiosis'),
    digestionScore: calculateScore('digestion'),
    leakyGutScore: calculateScore('leakyGut'),
    timestamp: Date.now()
  };

  const handleFinish = () => {
    onComplete(currentResult);
    setStep('RESULT');
  };

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const plan = await generateImmunePlan(currentResult, { foodLogs: [], symptomLogs: [], stoolLogs: [] });
      setAiPlan(plan);
    } catch (e) {
      setAiPlan("计划生成失败，请检查网络连接。");
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {step === 'INTRO' && (
        <div className="space-y-6 py-4">
          <div className="bg-emerald-600 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <ShieldPlus size={80} className="absolute -right-4 -top-4 opacity-20 rotate-12" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">免疫系统复原评估</h2>
              <p className="text-emerald-100 text-sm leading-relaxed opacity-90">
                基于 Susan Blum 博士的“4阶段免疫复原方案”。我们将通过三个核心维度评估您的肠道健康，这是修复免疫防线的基石。
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="bg-blue-100 p-2 rounded-xl text-blue-600 font-bold shrink-0">1</div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">肠道生态失调</h4>
                <p className="text-xs text-gray-400">是否存在微生物群落失衡？</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="bg-orange-100 p-2 rounded-xl text-orange-600 font-bold shrink-0">2</div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">消化能力评估</h4>
                <p className="text-xs text-gray-400">酶和胃酸的分泌是否充足？</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="bg-purple-100 p-2 rounded-xl text-purple-600 font-bold shrink-0">3</div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">肠漏症自测</h4>
                <p className="text-xs text-gray-400">肠粘膜屏障是否受损？</p>
              </div>
            </div>
          </div>

          <button onClick={() => setStep('DYSBIOSIS')} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2">
            开始测评 <ChevronRight size={18} />
          </button>
        </div>
      )}

      {(['DYSBIOSIS', 'DIGESTION', 'LEAKY_GUT'] as Step[]).includes(step) && (
        <div className="space-y-8 py-2">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                Step {step === 'DYSBIOSIS' ? '1/3' : step === 'DIGESTION' ? '2/3' : '3/3'}
              </span>
              <h2 className="text-xl font-bold text-gray-800">
                {step === 'DYSBIOSIS' ? '肠道生态失调' : step === 'DIGESTION' ? '消化能力评估' : '肠漏症评估'}
              </h2>
            </div>
            <div className="text-xs font-bold text-gray-400">0=无, 3=严重</div>
          </div>

          <div className="space-y-8">
            {IMMUNE_ASSESSMENT_QUESTIONS[step === 'DYSBIOSIS' ? 'dysbiosis' : step === 'DIGESTION' ? 'digestion' : 'leakyGut'].map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="text-sm text-gray-700 font-medium leading-relaxed">{q.text}</p>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map(score => (
                    <button 
                      key={score}
                      onClick={() => handleAnswer(q.id, score)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${answers[q.id] === score ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-6">
            <button 
              onClick={() => step === 'DYSBIOSIS' ? setStep('INTRO') : step === 'DIGESTION' ? setStep('DYSBIOSIS') : setStep('DIGESTION')}
              className="flex-1 py-4 border border-gray-200 text-gray-500 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} /> 返回
            </button>
            <button 
              onClick={() => step === 'DYSBIOSIS' ? setStep('DIGESTION') : step === 'DIGESTION' ? setStep('LEAKY_GUT') : handleFinish()}
              className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
            >
              {step === 'LEAKY_GUT' ? '完成评估' : '下一步'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 'RESULT' && (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">评估完成</h3>
              <p className="text-xs text-gray-400">风险等级越高，越需要立即干预</p>
            </div>

            <div className="space-y-4">
              <ScoreRow label="肠道生态失调" score={currentResult.dysbiosisScore} color="bg-blue-500" />
              <ScoreRow label="消化能力评估" score={currentResult.digestionScore} color="bg-orange-500" />
              <ScoreRow label="肠漏症自测" score={currentResult.leakyGutScore} color="bg-purple-500" />
            </div>

            {!aiPlan ? (
              <button 
                onClick={handleGeneratePlan}
                disabled={isGeneratingPlan}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 overflow-hidden relative"
              >
                {isGeneratingPlan ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> 正在根据《复原方案》制定处方...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> 生成 AI 免疫复原方案
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <BookOpen size={18} />
                  <span className="text-sm font-bold">定制化 4R 复原计划</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl text-xs text-gray-600 leading-relaxed whitespace-pre-wrap border border-gray-100 shadow-inner max-h-96 overflow-y-auto no-scrollbar">
                  {aiPlan}
                </div>
                <button 
                  onClick={() => setStep('INTRO')}
                  className="w-full py-4 border border-emerald-600 text-emerald-600 rounded-2xl font-bold"
                >
                  重新评估
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ScoreRow: React.FC<{ label: string; score: number; color: string }> = ({ label, score, color }) => {
  const percentage = (score / 15) * 100;
  const risk = score > 10 ? '极高' : score > 5 ? '中等' : '低';
  const riskColor = score > 10 ? 'text-red-500' : score > 5 ? 'text-orange-500' : 'text-emerald-500';

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="font-bold text-gray-700">{label}</span>
        <span className={`font-bold ${riskColor}`}>{risk}风险 ({score}/15)</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default ImmuneSelfTest;
