"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  Palette,
  LogOut,
  ExternalLink,
  Lock,
  Sparkles,
  Menu,
  X,
  Mail,
  Database,
} from "lucide-react";
import { isAuthenticated, login, logout } from "@/lib/store";
import { useSiteData } from "@/components/DataProvider";

const sidebarItems = [
  { href: "/admin", label: "仪表盘", icon: LayoutDashboard },
  { href: "/admin/site", label: "前台设置", icon: Sparkles },
  { href: "/admin/profile", label: "个人资料", icon: User },
  { href: "/admin/projects", label: "案例管理", icon: Briefcase },
  { href: "/admin/posts", label: "文章管理", icon: FileText },
  { href: "/admin/theme", label: "主题外观", icon: Palette },
  { href: "/admin/contacts", label: "咨询记录", icon: Mail },
  { href: "/admin/data", label: "数据管理", icon: Database },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSiteData();
  const { profile } = data;
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setAuthed(true);
      setError("");
    } else {
      setError("密码错误");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    logout();
    setAuthed(false);
  };

  if (authed === null) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="text-[var(--fg-3)] text-mono text-xs">LOADING...</div>
    </div>;
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 relative overflow-hidden">
        <div className="aurora aurora-cyan" style={{ width: 600, height: 600, top: "10%", left: "20%" }} />
        <div className="aurora aurora-blue" style={{ width: 400, height: 400, bottom: "10%", right: "20%" }} />

        <div className="surface p-10 max-w-md w-full relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-xl bg-[var(--primary)] flex items-center justify-center mb-4 relative">
              <Lock className="w-6 h-6 text-[var(--bg)]" />
              <div className="absolute inset-0 bg-[var(--primary)] rounded-xl blur-xl opacity-50 -z-10" />
            </div>
            <div className="text-mono text-xs text-[var(--fg-3)] mb-2 tracking-wider">// ADMIN ACCESS</div>
            <h1 className="text-2xl font-bold mb-2">控制台登录</h1>
            <p className="text-sm text-[var(--fg-3)]">输入密码以访问后台</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="label">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="input"
                placeholder="默认: admin"
                autoFocus
              />
              {error && <p className="text-xs text-[var(--danger)] mt-2">{error}</p>}
            </div>

            <button type="submit" className="btn-primary w-full justify-center mb-4">
              <Sparkles className="w-4 h-4" />
              进入控制台
            </button>

            <Link href="/" className="btn-ghost w-full justify-center">
              ← 返回主页
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 w-9 h-9 rounded-lg bg-[var(--primary)] text-[var(--bg)] flex items-center justify-center md:hidden"
        aria-label="菜单"
      >
        {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* 侧边栏 */}
      <aside className={`fixed md:sticky top-0 left-0 z-40 md:z-auto w-60 bg-[var(--bg-1)] border-r border-[var(--border)] flex flex-col p-4 h-screen transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <Link href="/" className="flex items-center gap-2.5 px-2 py-3 mb-6">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 bg-[var(--primary)] rounded-md" />
            <div className="absolute inset-0 bg-[var(--primary)] rounded-md blur-md opacity-50" />
            <div className="relative w-full h-full flex items-center justify-center text-[10px] font-black text-[var(--bg)]">
              {profile.logoText.charAt(0)}
            </div>
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">{profile.logoText}.</div>
            <div className="text-mono text-[10px] text-[var(--fg-4)] tracking-wider">ADMIN</div>
          </div>
        </Link>

        <nav className="space-y-0.5 flex-1 relative">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-link relative ${isActive ? "active" : ""}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-0.5 pt-4 border-t border-[var(--border)]">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
            <ExternalLink className="w-4 h-4" />
            访问网站
          </Link>
          <button onClick={() => { handleLogout(); setSidebarOpen(false); }} className="sidebar-link w-full">
            <LogOut className="w-4 h-4" />
            退出登录
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-12 pt-16 md:pt-12">{children}</div>
      </main>
    </div>
  );
}
