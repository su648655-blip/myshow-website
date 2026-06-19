"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";

const navItems = [
  { href: "/", label: "首页", num: "01" },
  { href: "/portfolio", label: "案例", num: "02" },
  { href: "/about", label: "关于", num: "03" },
  { href: "/blog", label: "洞察", num: "04" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data } = useSiteData();
  const { profile } = data;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass border-b border-[var(--border)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-6 h-6 md:w-7 md:h-7">
              <div className="absolute inset-0 bg-[var(--primary)] rounded-md opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-[var(--primary)] rounded-md blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-full h-full flex items-center justify-center text-[10px] md:text-xs font-black text-[var(--bg)]">
                {profile.logoText.charAt(0)}
              </div>
            </div>
            <span className="font-bold text-base md:text-lg tracking-tight">
              {profile.logoText}<span className="text-[var(--primary-bright)]">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  pathname === item.href ? "text-[var(--primary-bright)]" : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                }`}
              >
                <span className="text-mono text-[10px] opacity-50">{item.num}</span>
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-3.5 right-3.5 h-px bg-[var(--primary)]"
                  />
                )}
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-3 btn-icon"
              title="后台"
              aria-label="后台"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link href="/admin" className="btn-icon" style={{ width: 36, height: 36 }}>
              <Settings className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-icon"
              style={{ width: 36, height: 36 }}
              aria-label="菜单"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[var(--border)]"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-base font-medium ${
                    pathname === item.href
                      ? "bg-[rgba(6,182,212,0.08)] text-[var(--primary-bright)] border border-[rgba(6,182,212,0.2)]"
                      : "text-[var(--fg-3)] border border-transparent"
                  }`}
                >
                  <span className="text-mono text-xs opacity-50">{item.num}</span>
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-base text-[var(--fg-3)] border border-transparent"
              >
                <Settings className="w-4 h-4" />
                后台管理
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
