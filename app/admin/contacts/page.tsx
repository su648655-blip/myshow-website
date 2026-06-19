"use client";

import { Mail, Check, X, Trash2 } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";

export default function ContactsAdminPage() {
  const { data, updateData } = useSiteData();
  const contacts = data.contacts || [];

  const toggleRead = (id: string) => {
    updateData((d) => ({
      ...d,
      contacts: (d.contacts || []).map((c) =>
        c.id === id ? { ...c, read: !c.read } : c
      ),
    }));
  };

  const handleDelete = (id: string) => {
    if (!confirm("确定删除这条咨询记录吗？")) return;
    updateData((d) => ({
      ...d,
      contacts: (d.contacts || []).filter((c) => c.id !== id),
    }));
  };

  return (
    <div>
      <div className="mb-10">
        <div className="text-mono text-xs text-[var(--fg-3)] mb-2 tracking-wider">// CONTACT SUBMISSIONS</div>
        <h1 className="text-3xl font-bold mb-2">咨询记录</h1>
        <p className="text-[var(--fg-3)] text-sm">
          <span className="text-[var(--primary-bright)]">{contacts.length}</span> 条记录 ·
          <span className="ml-1">{contacts.filter((c) => !c.read).length} 条未读</span>
        </p>
      </div>

      {contacts.length === 0 && (
        <div className="surface p-16 text-center">
          <Mail className="w-10 h-10 mx-auto mb-4 text-[var(--fg-4)]" />
          <p className="text-[var(--fg-3)] mb-2">还没有咨询记录</p>
          <p className="text-sm text-[var(--fg-4)]">前台用户提交的预约咨询会出现在这里</p>
        </div>
      )}

      <div className="space-y-3">
        {contacts.map((c) => (
          <div
            key={c.id}
            className={`surface p-6 ${!c.read ? "border-l-2 border-l-[var(--primary)]" : ""}`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-base">{c.name}</span>
                  {!c.read && (
                    <span className="tag">未读</span>
                  )}
                </div>
                <div className="text-xs text-[var(--fg-4)]">{c.submittedAt}</div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleRead(c.id)}
                  className="btn-icon"
                  title={c.read ? "标为未读" : "标为已读"}
                >
                  {c.read ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="btn-icon btn-danger"
                  title="删除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 text-sm">
              {c.company && (
                <div>
                  <div className="text-mono text-[10px] text-[var(--fg-4)] uppercase mb-0.5">公司</div>
                  {c.company}
                </div>
              )}
              <div>
                <div className="text-mono text-[10px] text-[var(--fg-4)] uppercase mb-0.5">邮箱</div>
                <a href={`mailto:${c.email}`} className="text-[var(--primary-bright)] hover:underline">
                  {c.email}
                </a>
              </div>
              {c.phone && (
                <div>
                  <div className="text-mono text-[10px] text-[var(--fg-4)] uppercase mb-0.5">电话</div>
                  {c.phone}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[var(--border)]">
              <div className="text-mono text-[10px] text-[var(--fg-4)] uppercase mb-1">需求说明</div>
              <p className="text-sm text-[var(--fg-2)] leading-relaxed whitespace-pre-wrap">{c.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
