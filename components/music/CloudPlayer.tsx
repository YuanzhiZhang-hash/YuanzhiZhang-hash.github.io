"use client";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
export default function PagesMusic() {
 const {cloudMusicPlaylistId} = useSiteConfig();
 return <section className="w-full rounded-3xl glass-card p-4 overflow-hidden"><h2 className="font-bold text-slate-800 dark:text-white mb-3">我的网易云歌单</h2>
 <iframe title="网易云音乐歌单播放器" src={`https://music.163.com/outchain/player?type=0&id=${encodeURIComponent(cloudMusicPlaylistId)}&auto=0&height=430`} width="100%" height="450" loading="lazy" allow="autoplay" className="border-0 rounded-xl" />
 <a href={`https://music.163.com/playlist?id=${encodeURIComponent(cloudMusicPlaylistId)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-500">在网易云打开歌单 ↗</a><p className="text-xs text-slate-500 mt-2">如播放器未加载或歌曲无法播放，可前往网易云收听。</p></section>;
}
