"use client";
import { useState } from "react";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
export default function PagesMusic() {
 const {cloudMusicPlaylistId} = useSiteConfig();
 const [showPlayer, setShowPlayer] = useState(false);
 const playlistUrl = `https://music.163.com/playlist?id=${encodeURIComponent(cloudMusicPlaylistId)}`;
 return <section className="home-music-card w-full overflow-hidden rounded-3xl border border-white/10 p-5 md:p-6">
  <div className="flex items-center gap-5">
   <div className="home-music-art" aria-hidden="true"><span>♫</span></div>
   <div className="min-w-0 flex-1">
    <span className="inline-flex rounded-md bg-indigo-950/70 px-3 py-1 text-xs font-extrabold tracking-[.14em] text-indigo-300">CLOUD MUSIC</span>
    <h2 className="mt-2 truncate text-xl font-extrabold leading-tight text-white md:text-2xl">我的网易云歌单</h2>
    <p className="mt-1 text-sm text-slate-300">源智的收藏 · 网易云音乐</p>
   </div>
  </div>
  <div className="mt-5 flex items-center justify-between gap-3">
   <button type="button" onClick={() => setShowPlayer(value => !value)} aria-expanded={showPlayer} className="home-music-toggle rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400">
    {showPlayer ? "收起播放器" : "▶  播放我的歌单"}
   </button>
   <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-300 transition hover:text-indigo-300">网易云打开 ↗</a>
  </div>
  {showPlayer && <div className="home-music-frame mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white">
   <iframe title="网易云音乐歌单播放器" src={`https://music.163.com/outchain/player?type=0&id=${encodeURIComponent(cloudMusicPlaylistId)}&auto=0&height=250`} width="100%" height="270" loading="lazy" allow="autoplay" className="block border-0" />
  </div>}
 </section>;
}
