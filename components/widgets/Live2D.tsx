"use client";

import { useState } from "react";
import Script from "next/script";

export default function Live2D() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      {enabled ? (
        <Script
          src="/live2d/jsdelivr/random/autoload.js?v=4"
          strategy="lazyOnload"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEnabled(true)}
          className="fixed bottom-5 left-5 z-40 rounded-full border border-white/30 bg-slate-900/70 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md transition hover:bg-slate-800"
          aria-label="加载桌面看板娘"
          title="点击加载桌面看板娘"
        >
          加载看板娘
        </button>
      )}
    </>
  );
}
