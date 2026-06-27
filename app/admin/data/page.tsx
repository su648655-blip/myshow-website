"use client";

import { Download, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSiteData } from "@/components/DataProvider";
import { withSiteDataDefaults } from "@/lib/store";
import { useToast } from "@/components/Toast";

export default function DataAdminPage() {
  const { data, updateData } = useSiteData();
  const toast = useToast();

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `neonme-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.show("数据已导出");
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          if (!parsed.profile || !parsed.projects || !parsed.posts) {
            toast.show("文件格式不正确", "error");
            return;
          }
          if (!confirm("导入将覆盖当前所有数据，确定继续？")) return;
          updateData(() => withSiteDataDefaults(parsed));
          toast.show("数据已导入");
        } catch {
          toast.show("文件解析失败", "error");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div>
      <div className="mb-10">
        <div className="text-mono text-xs text-[var(--fg-3)] mb-2 tracking-wider">// DATA MANAGEMENT</div>
        <h1 className="text-3xl font-bold mb-2">数据管理</h1>
        <p className="text-[var(--fg-3)] text-sm">导出备份或从备份文件恢复所有数据</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="surface p-8">
          <div className="w-12 h-12 rounded-xl bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-[var(--primary-bright)]" />
          </div>
          <h2 className="text-xl font-bold mb-2">导出数据</h2>
          <p className="text-sm text-[var(--fg-3)] mb-6">将所有内容（资料、案例、文章、咨询记录）导出为 JSON 文件备份。</p>
          <button onClick={handleExport} className="btn-primary">
            <Download className="w-4 h-4" />
            导出为 JSON
          </button>
        </div>

        <div className="surface p-8">
          <div className="w-12 h-12 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-[var(--danger)]" />
          </div>
          <h2 className="text-xl font-bold mb-2">导入数据</h2>
          <p className="text-sm text-[var(--fg-3)] mb-6">从之前导出的 JSON 文件恢复数据。⚠️ 会覆盖当前所有内容。</p>
          <button onClick={handleImport} className="btn-secondary">
            <Upload className="w-4 h-4" />
            导入 JSON
          </button>
        </div>
      </div>
    </div>
  );
}
