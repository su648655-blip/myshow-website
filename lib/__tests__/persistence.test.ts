import {
  getSiteData,
  saveSiteData,
  resetSiteData,
  type SiteData,
} from "@/lib/store";
import { projects, posts } from "@/lib/data";

const STORAGE_KEY = "neonme_site_data";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

// ── 数据持久化 ────────────────────────

describe("data persistence", () => {
  test("保存并重新读取后数据一致", () => {
    const data = getSiteData();
    const modified: SiteData = {
      ...data,
      profile: { ...data.profile, name: "测试名" },
    };
    saveSiteData(modified);
    const reloaded = getSiteData();
    expect(reloaded.profile.name).toBe("测试名");
  });

  test("修改 projects 后持久化并重新读取", () => {
    const data = getSiteData();
    const modified: SiteData = {
      ...data,
      projects: data.projects.map((p) =>
        p.id === data.projects[0].id ? { ...p, status: "draft" as const } : p
      ),
    };
    saveSiteData(modified);
    const reloaded = getSiteData();
    expect(reloaded.projects[0].status).toBe("draft");
  });

  test("修改 posts 后持久化并重新读取", () => {
    const data = getSiteData();
    const modified: SiteData = {
      ...data,
      posts: data.posts.map((p) =>
        p.id === data.posts[0].id ? { ...p, status: "draft" as const } : p
      ),
    };
    saveSiteData(modified);
    const reloaded = getSiteData();
    expect(reloaded.posts[0].status).toBe("draft");
  });

  test("大量 base64 图片数据不应导致 localStorage 写入失败", () => {
    // 模拟一个 ~100KB 的 base64 图片
    const fakeBase64 = "data:image/png;base64," + "A".repeat(140000);
    const data = getSiteData();
    const modified: SiteData = {
      ...data,
      profile: { ...data.profile, avatar: fakeBase64 },
    };
    expect(() => saveSiteData(modified)).not.toThrow();
    const reloaded = getSiteData();
    expect(reloaded.profile.avatar).toBe(fakeBase64);
  });

  test("非常大的 base64（>4MB）应被拦截或优雅降级", () => {
    // localStorage 限制 ~5MB，模拟一个 ~4.5MB 的 base64
    const hugeBase64 = "data:image/png;base64," + "A".repeat(4_500_000);
    const data = getSiteData();
    const modified: SiteData = {
      ...data,
      profile: { ...data.profile, avatar: hugeBase64 },
    };
    // 不应抛出异常，但可能会被浏览器静默拒绝
    // 至少不能导致整个应用崩溃
    expect(() => saveSiteData(modified)).not.toThrow();
  });

  test("重置数据后恢复到默认值", () => {
    const data = getSiteData();
    saveSiteData({ ...data, profile: { ...data.profile, name: "临时" } });
    expect(getSiteData().profile.name).toBe("临时");
    resetSiteData();
    expect(getSiteData().profile.name).toBe("邓学德");
  });
});
