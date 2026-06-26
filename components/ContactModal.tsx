"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { genId } from "@/lib/store";
import { useSiteData } from "@/components/DataProvider";
import type { ContactSubmission } from "@/lib/store";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const { updateData } = useSiteData();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const submission: ContactSubmission = {
      id: genId(),
      ...form,
      submittedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      read: false,
    };
    updateData((d) => ({ ...d, contacts: [submission, ...(d.contacts || [])] }));
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", company: "", email: "", phone: "", message: "" });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <div className="signal-panel w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-8">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-mono text-[10px] text-[var(--primary-bright)] mb-1 tracking-[0.24em]">REQUEST BRIEFING</div>
                    <h2 className="text-2xl font-black">预约 AI 商业化诊断</h2>
                  </div>
                  <button onClick={onClose} className="btn-icon" aria-label="关闭">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {sent ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-5 h-4 w-4 rounded-full bg-[var(--acid)] shadow-[0_0_28px_var(--primary-glow)]" />
                    <h3 className="text-xl font-black mb-2">Briefing request received</h3>
                    <p className="text-[var(--fg-3)]">我会尽快联系你，继续确认 AI 项目的场景、POC 和预算路径。</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">姓名 <span className="text-[var(--danger)]">*</span></label>
                        <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="你的名字" required />
                      </div>
                      <div>
                        <label className="label">公司</label>
                        <input className="input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="公司名（选填）" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">邮箱 <span className="text-[var(--danger)]">*</span></label>
                        <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required />
                      </div>
                      <div>
                        <label className="label">电话</label>
                        <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="手机号（选填）" />
                      </div>
                    </div>
                    <div>
                      <label className="label">项目卡点 <span className="text-[var(--danger)]">*</span></label>
                      <textarea className="input" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="请描述你的 AI 项目卡在 Demo、POC、ROI、预算或决策链的哪个环节..." required />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center mt-2">
                      <Send className="w-4 h-4" />
                      SEND BRIEFING REQUEST
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
