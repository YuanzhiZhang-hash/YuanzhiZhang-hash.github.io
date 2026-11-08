"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, X } from "lucide-react";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

export default function DailyQuote() {
  const { dailyQuoteContent, dailyQuoteAuthor, dailyQuotes, dailyQuoteInterval, dailyQuoteAutoSwitch } = useSiteConfig();
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);
  const quotes = useMemo(() => {
    const entries = Array.isArray(dailyQuotes) ? dailyQuotes.filter(q => typeof q?.content === "string" && q.content.trim()).map(q => ({ content: q.content.trim(), author: typeof q.author === "string" ? q.author.trim() : "" })) : [];
    return entries.length ? entries : [{ content: dailyQuoteContent?.trim() || "愿你在平凡的日子里，也能发现生活的光。", author: dailyQuoteAuthor?.trim() || "" }];
  }, [dailyQuotes, dailyQuoteContent, dailyQuoteAuthor]);
  const quotesKey = JSON.stringify(quotes);
  const currentIndex = index % quotes.length;
  const { content, author } = quotes[currentIndex];
  const intervalSeconds = Math.min(86400, Math.max(1, Math.floor(Number(dailyQuoteInterval) || 30)));
  const nextQuote = () => setIndex(current => (current + 1) % quotes.length);

  useEffect(() => { setIndex(0); }, [quotesKey]);
  useEffect(() => {
    if (!dailyQuoteAutoSwitch || quotes.length < 2 || showModal) return;
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % quotes.length), intervalSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [index, quotesKey, quotes.length, intervalSeconds, dailyQuoteAutoSwitch, showModal]);

  useEffect(() => {
    if (!showModal) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setShowModal(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [showModal]);

  return (
    <>
      <div
        data-testid="daily-quote-card"
        className="w-full h-[160px] md:h-[220px] rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-3 md:p-6 flex flex-col justify-between transition-all duration-700 hover:scale-[1.01] cursor-pointer group overflow-hidden text-left"
      >
          <div className="flex items-center justify-between gap-2 mb-2 flex-shrink-0">
            <span className="text-[10px] font-black text-pink-500 dark:text-pink-400 tracking-widest bg-white/50 dark:bg-slate-900/50 px-2 py-0.5 rounded-sm shadow-sm">每日一句</span>
            <button type="button" onClick={nextQuote} disabled={quotes.length < 2} title="换一句" aria-label="换一句" className="flex items-center gap-1 text-xs text-slate-400 hover:text-pink-500 disabled:opacity-40 disabled:cursor-default p-1 -mr-1">
              <RotateCw className="w-3.5 h-3.5" aria-hidden="true" /><span>换一句</span>
            </button>
          </div>
        <button type="button" onClick={nextQuote} disabled={quotes.length < 2} aria-label="点击句子切换下一句" className="text-left min-h-0 overflow-hidden flex-1 w-full disabled:cursor-default">
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed line-clamp-3 md:line-clamp-4 whitespace-pre-line break-words">{content}</p>
        </button>
        <div className="w-full mt-2 flex-shrink-0 text-right">
          {author && <p className="text-xs text-slate-500 dark:text-slate-400 truncate">— {author}</p>}
          <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400 dark:text-slate-500">
            <span aria-label="句子序号">{currentIndex + 1} / {quotes.length}</span>
            <button type="button" aria-label="查看每日一句" onClick={() => setShowModal(true)} className="hover:text-pink-500">查看全文</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              role="dialog" aria-modal="true" aria-labelledby="daily-quote-title"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md max-h-[80dvh] overflow-y-auto glass-card p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 mb-5">
                <h3 id="daily-quote-title" className="text-lg font-bold text-slate-900 dark:text-white">每日一句</h3>
                <button type="button" onClick={() => setShowModal(false)} title="关闭" aria-label="关闭每日一句" autoFocus className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line break-words">{content}</p>
              {author && <p className="mt-5 text-right text-sm text-slate-500 dark:text-slate-400 whitespace-pre-line break-words">— {author}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
