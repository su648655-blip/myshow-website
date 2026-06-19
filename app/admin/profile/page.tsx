"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Lock, LogOut, Eye, EyeOff } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";
import { useToast } from "@/components/Toast";
import ImageUpload from "@/components/ImageUpload";
import { setPassword, logout } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function ProfileAdminPage() {
  const { data, updateData } = useSiteData();
  const toast = useToast();
  const router = useRouter();
  const [profile, setProfile] = useState(data.profile);
  const [timeline, setTimeline] = useState(data.timeline);
  const [skills, setSkills] = useState(data.skills);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleSave = () => {
    updateData((d) => ({
      ...d,
      profile,
      timeline,
      skills,
    }));
    toast.show("资料已保存");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="text-mono text-xs text-[var(--fg-3)] mb-2 tracking-wider">// PROFILE</div>
          <h1 className="text-3xl font-bold mb-2">个人资料</h1>
          <p className="text-[var(--fg-3)] text-sm">编辑头像、基础信息、社交链接、经历和技能</p>
        </div>
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4" />
          保存修改
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 头像上传 */}
        <div className="surface p-6">
          <ImageUpload
            value={profile.avatar}
            onChange={(v) => setProfile((prev) => ({ ...prev, avatar: v }))}
            shape="square"
            label="头像"
            hint="建议 < 1MB · 1:1"
          />
        </div>

        {/* 基础信息 */}
        <div className="surface p-6 md:col-span-2">
          <div className="text-mono text-xs text-[var(--primary-bright)] mb-4 tracking-wider uppercase">基础信息</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">姓名</label>
              <input className="input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <label className="label">职位 <span className="label-hint">title</span></label>
              <input className="input" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
            </div>
            <div>
              <label className="label">所在地</label>
              <input className="input" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
            </div>
            <div>
              <label className="label">邮箱</label>
              <input className="input" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">个人简介 <span className="label-hint">bio</span></label>
              <textarea className="input" rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
            </div>
            <div>
              <label className="label">微信号 <span className="label-hint">About 页展示</span></label>
              <input className="input" value={profile.wechat} onChange={(e) => setProfile({ ...profile, wechat: e.target.value })} />
            </div>
            <div>
              <label className="label">手机号 <span className="label-hint">About 页展示</span></label>
              <input className="input" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      {/* 前台展示文字 */}
      <div className="surface p-6 mb-6">
        <div className="text-mono text-xs text-[var(--primary-bright)] mb-4 tracking-wider uppercase">前台展示文字</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Logo 文字 <span className="label-hint">导航栏左上角</span></label>
            <input className="input" value={profile.logoText} onChange={(e) => setProfile({ ...profile, logoText: e.target.value })} />
          </div>
          <div>
            <label className="label">状态徽标 <span className="label-hint">首页顶部绿色圆点旁</span></label>
            <input className="input" value={profile.statusText} onChange={(e) => setProfile({ ...profile, statusText: e.target.value })} />
          </div>
          <div>
            <label className="label">标签行 <span className="label-hint">首页 // 开头的灰色小字</span></label>
            <input className="input" value={profile.tagline} onChange={(e) => setProfile({ ...profile, tagline: e.target.value })} />
          </div>
          <div>
            <label className="label">头衔 <span className="label-hint">首页渐变大字（如 AI SALES LEADER）</span></label>
            <input className="input" value={profile.headline} onChange={(e) => setProfile({ ...profile, headline: e.target.value })} />
          </div>
        </div>
      </div>

      {/* 社交链接 */}
      <div className="surface p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-mono text-xs text-[var(--primary-bright)] tracking-wider uppercase">社交链接</div>
          <button
            onClick={() => setProfile({ ...profile, socialLinks: [...profile.socialLinks, { platform: "新平台", url: "https://" }] })}
            className="btn-ghost"
          >
            <Plus className="w-3.5 h-3.5" /> 添加
          </button>
        </div>
        <div className="space-y-2">
          {profile.socialLinks.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className="input"
                placeholder="平台"
                value={link.platform}
                onChange={(e) => {
                  const next = [...profile.socialLinks];
                  next[i] = { ...next[i], platform: e.target.value };
                  setProfile({ ...profile, socialLinks: next });
                }}
                style={{ maxWidth: 160 }}
              />
              <input
                className="input flex-1"
                placeholder="https://..."
                value={link.url}
                onChange={(e) => {
                  const next = [...profile.socialLinks];
                  next[i] = { ...next[i], url: e.target.value };
                  setProfile({ ...profile, socialLinks: next });
                }}
              />
              <button
                onClick={() => setProfile({ ...profile, socialLinks: profile.socialLinks.filter((_, idx) => idx !== i) })}
                className="btn-icon btn-danger"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 时间线 */}
      <div className="surface p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-mono text-xs text-[var(--primary-bright)] tracking-wider uppercase">职业经历</div>
          <button
            onClick={() => setTimeline([...timeline, {
              id: Math.random().toString(36).slice(2),
              year: "2025", title: "新经历", organization: "公司名", description: "描述", type: "work",
            }])}
            className="btn-ghost"
          >
            <Plus className="w-3.5 h-3.5" /> 添加
          </button>
        </div>
        <div className="space-y-3">
          {timeline.map((item, i) => (
            <div key={item.id} className="p-4 rounded-lg bg-[var(--bg-2)] border border-[var(--border)] space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                <input className="input md:col-span-3" placeholder="时间" value={item.year}
                  onChange={(e) => { const n = [...timeline]; n[i] = { ...n[i], year: e.target.value }; setTimeline(n); }} />
                <input className="input md:col-span-4" placeholder="职位/学历" value={item.title}
                  onChange={(e) => { const n = [...timeline]; n[i] = { ...n[i], title: e.target.value }; setTimeline(n); }} />
                <input className="input md:col-span-3" placeholder="公司/学校" value={item.organization}
                  onChange={(e) => { const n = [...timeline]; n[i] = { ...n[i], organization: e.target.value }; setTimeline(n); }} />
                <select className="input md:col-span-2" value={item.type}
                  onChange={(e) => { const n = [...timeline]; n[i] = { ...n[i], type: e.target.value as "work" | "education" }; setTimeline(n); }}>
                  <option value="work">工作</option>
                  <option value="education">教育</option>
                </select>
              </div>
              <div className="flex gap-2">
                <textarea className="input flex-1" rows={2} placeholder="描述..." value={item.description}
                  onChange={(e) => { const n = [...timeline]; n[i] = { ...n[i], description: e.target.value }; setTimeline(n); }} />
                <button onClick={() => setTimeline(timeline.filter((_, idx) => idx !== i))} className="btn-icon btn-danger self-start">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 技能 */}
      <div className="surface p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-mono text-xs text-[var(--primary-bright)] tracking-wider uppercase">技能标签</div>
          <button
            onClick={() => setSkills([...skills, { name: "新技能", level: 3, category: "其他" }])}
            className="btn-ghost"
          >
            <Plus className="w-3.5 h-3.5" /> 添加
          </button>
        </div>
        <div className="space-y-2">
          {skills.map((skill, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input className="input flex-1" placeholder="技能名称" value={skill.name}
                onChange={(e) => { const n = [...skills]; n[i] = { ...n[i], name: e.target.value }; setSkills(n); }} />
              <input className="input" placeholder="分类" value={skill.category} style={{ maxWidth: 120 }}
                onChange={(e) => { const n = [...skills]; n[i] = { ...n[i], category: e.target.value }; setSkills(n); }} />
              <select className="input" value={skill.level} style={{ maxWidth: 100 }}
                onChange={(e) => { const n = [...skills]; n[i] = { ...n[i], level: Number(e.target.value) }; setSkills(n); }}>
                <option value={1}>1 ★</option>
                <option value={2}>2 ★</option>
                <option value={3}>3 ★</option>
                <option value={4}>4 ★</option>
                <option value={5}>5 ★</option>
              </select>
              <button onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="btn-icon btn-danger">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-4">
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4" />
          保存全部修改
        </button>
      </div>

      {/* 修改密码 */}
      <div className="surface p-6 mb-6 mt-10">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-[var(--danger)]" />
          <div>
            <div className="text-mono text-xs text-[var(--danger)] tracking-wider uppercase">安全设置</div>
            <h2 className="text-xl font-bold">修改密码</h2>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newPwd !== confirmPwd) {
              toast.show("两次输入的密码不一致", "error");
              return;
            }
            if (newPwd.length < 4) {
              toast.show("密码至少 4 位", "error");
              return;
            }
            setPassword(newPwd);
            toast.show("密码已修改，即将退出登录");
            setTimeout(() => {
              logout();
              // 强制页面刷新，触发 AdminLayoutClient 重新检查登录态
              window.location.href = "/admin";
            }, 1000);
          }}
          className="space-y-4 max-w-md"
        >
          <div>
            <label className="label">当前密码</label>
            <div className="relative">
              <input type={showPwd ? "text" : "password"} className="input pr-10" value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)} required />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--fg-4)] hover:text-[var(--fg)]">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="label">新密码</label>
            <div className="relative">
              <input type={showPwd ? "text" : "password"} className="input pr-10" value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)} required minLength={4} placeholder="至少 4 位" />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--fg-4)] hover:text-[var(--fg)]">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="label">确认新密码</label>
            <div className="relative">
              <input type={showPwd ? "text" : "password"} className="input pr-10" value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)} required minLength={4} />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--fg-4)] hover:text-[var(--fg)]">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-secondary">
            <LogOut className="w-4 h-4" />
            修改密码并重新登录
          </button>
        </form>
      </div>
    </div>
  );
}
