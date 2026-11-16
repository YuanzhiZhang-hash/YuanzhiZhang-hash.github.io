"use client";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
export default function PagesMusic() {
 const {cloudMusicPlaylistId} = useSiteConfig();
 const playlistUrl = `https://music.163.com/playlist?id=${encodeURIComponent(cloudMusicPlaylistId)}`;
 return <section className="home-music-card w-full overflow-hidden rounded-3xl border border-white/10 p-4 md:p-5">
  <div className="mb-3 flex items-center justify-between gap-3">
   <div className="min-w-0"><p className="text-[11px] font-semibold uppercase tracking-[.2em] text-sky-300/80">NOW PLAYING</p><h2 className="mt-1 truncate text-base font-bold text-white md:text-lg">我的网易云歌单</h2></div>
   <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">网易云音乐</span>
  </div>
  <div className="home-music-frame overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_12px_36px_rgba(0,0,0,.24)]">
   <iframe title="网易云音乐歌单播放器" src={`https://music.163.com/outchain/player?type=0&id=${encodeURIComponent(cloudMusicPlaylistId)}&auto=0&height=250`} width="100%" height="270" loading="lazy" allow="autoplay" className="block border-0" />
  </div>
  <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[.06] px-3.5 py-2.5 text-sm text-slate-200 transition hover:border-sky-300/30 hover:bg-sky-300/10">
   <span>在网易云打开完整歌单</span><span aria-hidden="true" className="text-sky-300">↗</span>
  </a>
 </section>;
}
