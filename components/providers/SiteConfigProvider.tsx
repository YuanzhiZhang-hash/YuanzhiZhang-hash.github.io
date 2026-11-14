"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { siteConfig } from "@/siteConfig";

const Context = createContext(siteConfig);
export function useSiteConfig() { return useContext(Context); }

export function SiteConfigProvider({ children, initialConfig }: { children: ReactNode; initialConfig: typeof siteConfig }) {
  const [config, setConfig] = useState(initialConfig);
  useEffect(() => {
    const refresh = () => {
      fetch("/data/site-config.json", { cache: "no-store" }).then(r => {
        if (!r.ok) throw new Error("站点配置加载失败");
        return r.json();
      }).then(data => setConfig({ ...siteConfig, ...data })).catch(() => {});
    };
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);
  return <Context.Provider value={config}>{children}</Context.Provider>;
}
