/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, BarChart3, Layout, Settings, Search, ArrowRight, Loader2, Sparkles, User, ShieldCheck } from 'lucide-react';
import { CampaignAnalysis } from './types';
import { analyzeAdvertisingContext } from './services/geminiService';

export default function App() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CampaignAnalysis | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !description) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeAdvertisingContext(productName, description);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-right border-slate-200 bg-white flex flex-col">
        <div className="p-6 border-bottom border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-display font-bold">A</div>
            <span className="font-display font-bold tracking-tight text-xl">AdTarget AI</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: Target, label: 'Audience Insight', active: true },
            { icon: Layout, label: 'Ad Structures', active: false },
            { icon: BarChart3, label: 'Campaign Stats', active: false },
            { icon: Settings, label: 'Integrations', active: false },
          ].map((item) => (
            <button 
              key={item.label}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${item.active ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-top border-slate-200">
          <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <User size={16} className="text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">linomarcelino@</p>
              <p className="text-[10px] text-slate-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-bottom border-slate-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-display font-semibold">AI Advertising Strategist</h1>
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search previous campaigns..." 
                  className="pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-xs w-64 focus:ring-1 focus:ring-blue-500/20"
                />
             </div>
             <button className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors">
               Export Data
             </button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {/* Analysis Form */}
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm transition-all">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-blue-500" size={20} />
                <h2 className="text-2xl font-display font-bold">Target Specific Audiences</h2>
              </div>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Describe your product and advertising structure goals. Our AI will synthesize specific high-converting audience segments and the ideal platform structures for them.
              </p>
              
              <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="label-micro px-1">Product Name</label>
                    <input 
                      required
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="e.g. EcoSphere Smart Planter"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-micro px-1">Market Industry</label>
                    <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 text-sm">
                      <option>E-commerce / Retail</option>
                      <option>SaaS / Tech</option>
                      <option>Health & Wellness</option>
                      <option>Real Estate</option>
                      <option>Professional Services</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="label-micro px-1">Product & Structural Goals</label>
                  <textarea 
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe your product core value, current advertising structures, and who you think your specific audience might be..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button 
                    type="submit"
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-blue-500/20"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Synthesizing...
                      </>
                    ) : (
                      <>
                        Generate Strategy
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <span className="text-[10px] text-slate-400 font-medium">Powered by Gemini 3.0 Pro Insights</span>
                </div>
              </form>
            </div>
          </section>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {analysis ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 pb-12"
              >
                {/* Overview Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="label-micro text-blue-600">Dynamic Analysis Ready</span>
                    <h3 className="text-3xl font-display font-bold mt-1 tracking-tight">{analysis.productName}</h3>
                  </div>
                  <div className="flex gap-2">
                     <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                       <ShieldCheck size={12} /> High Relevancy Score
                     </div>
                  </div>
                </div>

                {/* Market Intelligence */}
                <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl shadow-blue-600/15 relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-xs font-bold uppercase tracking-widest opacity-70 mb-4 flex items-center gap-2">
                      <Sparkles size={14} /> Market Intelligence Report
                    </h4>
                    <p className="text-xl font-light leading-relaxed max-w-4xl italic">
                      "{analysis.marketContext}"
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <BarChart3 size={120} />
                  </div>
                </div>

                {/* Audience Grid */}
                <div className="space-y-4">
                   <h4 className="label-micro">Specific Audience Segments</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {analysis.targetAudiences.map((audience, idx) => (
                       <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={audience.id} 
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all group"
                       >
                         <div className="p-6 border-bottom border-slate-100 flex justify-between items-start">
                           <div>
                             <h5 className="font-bold text-lg">{audience.name}</h5>
                             <p className="text-xs text-slate-500 mt-1">{audience.description}</p>
                           </div>
                           <div className="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                             SEG-{idx+1}
                           </div>
                         </div>
                         <div className="p-6 grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                              <div>
                                <label className="label-micro block mb-2">Demographics</label>
                                <ul className="text-xs space-y-1.5 text-slate-600">
                                  <li><span className="font-semibold">Age:</span> {audience.demographics.ageRange}</li>
                                  <li><span className="font-semibold">Location:</span> {audience.demographics.location}</li>
                                  <li><span className="font-semibold">Income:</span> {audience.demographics.incomeLevel}</li>
                                </ul>
                              </div>
                              <div>
                                <label className="label-micro block mb-2">Pain Points</label>
                                <div className="flex flex-wrap gap-1.5">
                                  {audience.painPoints.slice(0, 3).map(p => (
                                    <span key={p} className="px-2 py-1 bg-red-50 text-red-600 text-[10px] rounded-md border border-red-100">{p}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="label-micro block mb-2">Key Interests</label>
                                <div className="flex flex-wrap gap-1.5">
                                  {audience.interests.slice(0, 4).map(interest => (
                                    <span key={interest} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded-md">{interest}</span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="label-micro block mb-2">Strategy</label>
                                <p className="text-[11px] text-slate-500 italic leading-snug">{audience.marketingStrategy}</p>
                              </div>
                            </div>
                         </div>
                         <div className="px-6 pb-6 pt-2">
                           <label className="label-micro block mb-3">AI Ad-Copy Suggestions</label>
                           <div className="space-y-2">
                              {audience.adCopySuggestions.slice(0, 2).map((copy, i) => (
                                <div key={i} className="p-3 bg-slate-50 rounded-lg border-left-4 border-blue-500 text-xs italic text-slate-700">
                                  "{copy}"
                                </div>
                              ))}
                           </div>
                         </div>
                       </motion.div>
                     ))}
                   </div>
                </div>

                {/* Recommended Structures */}
                <div className="space-y-4 pt-4">
                  <h4 className="label-micro">Recommended Advertising Structures</h4>
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-5 bg-slate-50 border-bottom border-slate-200">
                      <div className="px-6 py-3 label-micro">Platform</div>
                      <div className="px-6 py-3 label-micro">Structure Type</div>
                      <div className="px-6 py-3 label-micro">AI Score</div>
                      <div className="px-6 py-3 label-micro col-span-2">Recommendations</div>
                    </div>
                    {analysis.recommendedStructures.map((struct) => (
                      <div key={struct.id} className="grid grid-cols-5 border-bottom border-slate-100 last:border-none hover:bg-slate-50/50 transition-colors">
                        <div className="px-6 py-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-sm font-semibold">{struct.platform}</span>
                        </div>
                        <div className="px-6 py-4 text-sm text-slate-600">{struct.structureType}</div>
                        <div className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600" style={{ width: `${struct.effectivenessScore * 100}%` }} />
                              </div>
                              <span className="text-xs font-mono font-bold">{(struct.effectivenessScore * 100).toFixed(0)}%</span>
                           </div>
                        </div>
                        <div className="px-6 py-4 col-span-2 space-y-1">
                           {struct.aiRecommendations.map((rec, i) => (
                             <p key={i} className="text-[11px] text-slate-500 leading-tight flex gap-2">
                               <span className="text-blue-500 font-bold">•</span> {rec}
                             </p>
                           ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-4 grayscale opacity-20"
              >
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
                  <Target size={48} />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-display font-medium">No strategy generated yet</p>
                  <p className="text-sm">Input your product details above to find specific audiences.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
