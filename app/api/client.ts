import snapshot from "@/public/data/snapshot.json";
const BASE_URL = "";
class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (options?.method && options.method !== "GET") throw new ApiError("当前页面不支持在线提交", 405);
  const url = new URL(path, "https://pages.local");
  const route = decodeURIComponent(url.pathname);
  const data = snapshot as any;
  const paginate = (rows: any[]) => { const size = Number(url.searchParams.get("size")) || 20; const page = Number(url.searchParams.get("page")) || 1; return rows.slice((page - 1) * size, page * size); };
  let result: any;
  if (route === "/api/site-config") result = data.config;
  else if (route === "/api/categories") result = data.categories;
  else if (route === "/api/posts/count") result = {count:data.posts.length};
  else if (route === "/api/posts") {
    let posts = data.posts;
    const category = url.searchParams.get("category"), tag = url.searchParams.get("tag");
    if (category) { const c = data.categories.find((c:any) => c.slug === category); posts = posts.filter((p:any) => p.category === c?.name); }
    if (tag) posts = posts.filter((p:any) => p.tags.includes(tag));
    result = paginate(posts);
  } else if (route.startsWith("/api/posts/detail/")) result = data.posts.find((p:any) => p.id === Number(route.split("/").pop()));
  else if (route.startsWith("/api/posts/")) result = data.posts.find((p:any) => p.slug === route.slice(11));
  else if (route === "/api/chatters/count") result = {count:data.chatters.length};
  else if (/\/comments/.test(route)) result = [];
  else if (route === "/api/chatters") result = paginate(data.chatters);
  else if (route.startsWith("/api/chatters/")) result = data.chatters.find((c:any) => c.id === Number(route.split("/").pop()));
  else if (route === "/api/albums") result = data.albums;
  else if (/^\/api\/albums\/\d+\/photos$/.test(route)) result = data.photos[route.split("/")[3]] || [];
  else if (route.startsWith("/api/albums/")) result = data.albums.find((a:any) => a.id === Number(route.split("/").pop()));
  else if (route === "/api/projects") result = data.projects;
  else if (route.startsWith("/api/projects/")) result = data.projects.find((p:any) => p.slug === route.split("/").pop());
  else if (route === "/api/friend-links") result = data.friends;
  else if (route === "/api/bookmarks") result = data.bookmarks;
  else if (route === "/api/messages/count") result = {count:0};
  else if (route === "/api/messages") result = [];
  else throw new ApiError("页面数据不存在",404);
  if (result === undefined) throw new ApiError("内容不存在",404);
  return result as T;
}
function qs(params?: Record<string,string|number|undefined>) { const entries=Object.entries(params||{}).filter(([,v])=>v!==undefined&&v!=="");return entries.length?"?"+new URLSearchParams(entries.map(([k,v])=>[k,String(v)])).toString():""; }
export {request, qs, ApiError, BASE_URL};
