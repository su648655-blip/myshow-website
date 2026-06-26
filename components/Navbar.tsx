"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";

const navItems = [
  { href: "/", label: "SIGNAL", cn: "首页", num: "00" },
  { href: "/portfolio", label: "DOSSIERS", cn: "案例", num: "01" },
  { href: "/about", label: "OPERATOR", cn: "关于", num: "02" },
  { href: "/blog", label: "NOTES", cn: "洞察", num: "03" },
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
        scrolled ? "glass border-b border-[var(--border)]" : "bg-[rgba(7,3,15,0.36)] backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center gap-2 group" aria-label={`${profile.name} 首页`}>
            <span className="h-2 w-2 rounded-full bg-[var(--acid)] shadow-[0_0_18px_var(--primary-glow)]" />
            <span className="text-mono text-sm font-black tracking-[0.18em] text-[var(--fg)]">
              DENG<span className="text-[var(--primary-bright)]">.OS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-mono text-[11px] font-bold tracking-[0.16em] transition-colors flex items-center gap-1.5 ${
                  pathname === item.href ? "text-[var(--primary-bright)]" : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                }`}
              >
                <span className="text-[var(--fg-4)]">{item.num}</span>
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-3.5 right-3.5 h-px bg-[var(--primary)]"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-mono text-[10px] tracking-[0.18em] text-[var(--fg-4)]">
              STATUS: <span className="text-[var(--primary-bright)]">OPEN_Q3_2026</span>
            </span>
            <Link href="mailto:472662613@qq.com" className="btn-secondary py-2 text-xs">
              CONTACT
            </Link>
            <Link href="/admin" className="text-mono text-[10px] tracking-[0.16em] text-[var(--fg-4)] hover:text-[var(--fg-2)]">
              ADMIN
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn-icon md:hidden"
            aria-label="菜单"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
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
            <div className="px-4 py-4 space-y-1">
              <div className="text-mono text-[10px] tracking-[0.22em] text-[var(--fg-4)] px-4 pb-2">NAV COMMANDS</div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-mono text-xs font-bold tracking-[0.14em] border ${
                    pathname === item.href
                      ? "bg-[rgba(182,255,0,0.08)] text-[var(--primary-bright)] border-[rgba(182,255,0,0.28)]"
                      : "text-[var(--fg-3)] border-transparent"
                  }`}
                >
                  <span className="text-[var(--primary-bright)]">&gt;</span>
                  <span>{item.label}</span>
                  <span className="ml-auto text-[var(--fg-4)]">{item.cn}</span>
                </Link>
              ))}
              <Link
                href="mailto:472662613@qq.com"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-mono text-xs font-bold tracking-[0.14em] text-[var(--fg-3)] border border-transparent"
              >
                <span className="text-[var(--primary-bright)]">&gt;</span>
                CONTACT
                <span className="ml-auto text-[var(--fg-4)]">联系</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-mono text-[10px] tracking-[0.14em] text-[var(--fg-4)] border border-transparent"
              >
                ADMIN ACCESS
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
