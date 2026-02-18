
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Info } from 'lucide-react';
import { ChatMessage, FoodLog, SymptomLog, StoolLog } from '../types';
import { startHealthConsultation } from '../geminiService';

interface Props {
  context: {
    foodLogs: FoodLog[];
    symptomLogs: SymptomLog[];
    stoolLogs: StoolLog[];
  };
}

const AIConsultation: React.FC<Props> = ({ context }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是 Bloome AI。作为你的专属营养与免疫健康专家，你可以询问我任何关于饮食关联、症状分析或生活方式调整的问题。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await startHealthConsultation(newMessages, context);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，我现在无法连接到健康知识库，请稍后再试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "分析我最近的排便情况",
    "我的腹胀可能和什么有关？",
    "RA 关节痛的饮食建议",
    "给我制定明天的低敏食谱"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] space-y-4">
      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
        <Sparkles className="text-blue-600 shrink-0 mt-1" size={18} />
        <div>
          <h4 className="text-blue-800 text-xs font-bold uppercase tracking-wider mb-1">AI 专家咨询模式</h4>
          <p className="text-blue-600 text-[10px] leading-relaxed">系统已加载你的饮食与症状日志，回答将基于功能营养学理论。点击下方按钮或直接提问。</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 px-1 no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-none'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-50">
                {msg.role === 'user' ? <User size={12}/> : <Bot size={12}/>}
                <span className="text-[10px] font-bold uppercase">{msg.role === 'user' ? 'You' : 'Bloome Expert'}</span>
              </div>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-2">
              <Loader2 className="animate-spin text-emerald-600" size={16} />
              <span className="text-xs text-gray-400 font-bold">深度思考中...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex overflow-x-auto gap-2 no-scrollbar py-1">
        {quickQuestions.map(q => (
          <button 
            key={q} 
            onClick={() => { setInput(q); }}
            className="shrink-0 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="问问 AI 专家..."
          className="w-full pl-4 pr-12 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AIConsultation;
