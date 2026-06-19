"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

import { getSiteData, saveSiteData, type SiteData } from "@/lib/store";
import { profile, projects, posts, timeline, skills } from "@/lib/data";

const defaultData: SiteData = { profile, projects, posts, timeline, skills, contacts: [] };

interface DataContextType {
  data: SiteData;
  updateData: (updater: (data: SiteData) => SiteData) => void;
  refresh: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData);

  // 浏览器接管后，从 localStorage 读取编辑过的数据
  useEffect(() => {
    setData(getSiteData());
  }, []);

  const refresh = useCallback(() => {
    setData(getSiteData());
  }, []);

  const updateData = useCallback((updater: (data: SiteData) => SiteData) => {
    setData((prev) => {
      const next = updater(prev);
      saveSiteData(next);
      return next;
    });
  }, []);

  // 监听其他标签页的 storage 变更，以及 resetSiteData 的通知
  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener("storage", handler);
    window.addEventListener("neonme:data-updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("neonme:data-updated", handler);
    };
  }, [refresh]);

  return (
    <DataContext.Provider value={{ data, updateData, refresh }}>
      {children}
    </DataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useSiteData must be used within DataProvider");
  return ctx;
}
