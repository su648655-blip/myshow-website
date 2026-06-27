import {
  genId,
  getSiteData,
  saveSiteData,
  resetSiteData,
  login,
  logout,
  isAuthenticated,
  setPassword,
  type SiteData,
} from "@/lib/store";

const STORAGE_KEY = "neonme_site_data";
const AUTH_KEY = "neonme_auth";
const PASSWORD_KEY = "neonme_password";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

// ── 数据读写 ──────────────────────────

describe("getSiteData / saveSiteData", () => {
  test("getSiteData 无 localStorage 时返回默认数据", () => {
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    const data = getSiteData();
    expect(data.profile).toBeDefined();
    expect(data.profile.name).toBe("邓学德");
    expect(Array.isArray(data.projects)).toBe(true);
    expect(data.projects.length).toBeGreaterThan(0);
  });

  test("saveSiteData 后 getSiteData 返回修改后的数据", () => {
    const original = getSiteData();
    const modified: SiteData = {
      ...original,
      profile: { ...original.profile, name: "李四" },
    };
    saveSiteData(modified);
    const result = getSiteData();
    expect(result.profile.name).toBe("李四");
  });

  test("saveSiteData 触发自定义事件", () => {
    const handler = jest.fn();
    window.addEventListener("neonme:data-updated", handler);
    saveSiteData(getSiteData());
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener("neonme:data-updated", handler);
  });

  test("getSiteData includes default siteSettings when no localStorage exists", () => {
    const data = getSiteData();
    expect(data.siteSettings).toBeDefined();
    expect(data.siteSettings.hero.titleLine1).toBe("AI 销售不是卖工具。");
    expect(data.siteSettings.heroBoard.rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Stage", value: "POC → SCALE" }),
      ])
    );
    expect(data.siteSettings.homeModules.dossiers).toBe(true);
  });

  test("getSiteData backfills siteSettings for legacy stored data", () => {
    const legacy = getSiteData();
    const { siteSettings, ...withoutSettings } = legacy;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withoutSettings));

    const result = getSiteData();

    expect(result.siteSettings).toBeDefined();
    expect(result.siteSettings.visual.backgroundIntensity).toBe("medium");
    expect(result.profile.name).toBe("邓学德");
  });
});

// ── 认证 ──────────────────────────────

describe("login / logout / isAuthenticated", () => {
  test("login('deng19910228') 返回 true 并设置 sessionStorage", () => {
    expect(login("deng19910228")).toBe(true);
    expect(sessionStorage.getItem(AUTH_KEY)).toBe("true");
  });

  test("login('wrong') 返回 false 不设置 sessionStorage", () => {
    expect(login("wrong password")).toBe(false);
    expect(sessionStorage.getItem(AUTH_KEY)).toBeNull();
  });

  test("logout 清除认证状态", () => {
    login("deng19910228");
    expect(isAuthenticated()).toBe(true);
    logout();
    expect(isAuthenticated()).toBe(false);
  });

  test("setPassword 后 login 使用新密码", () => {
    setPassword("new-secret");
    expect(login("admin")).toBe(false);
    expect(login("new-secret")).toBe(true);
  });
});

// ── ID 生成 ───────────────────────────

describe("genId", () => {
  test("两次调用生成不同的 ID", () => {
    const a = genId();
    const b = genId();
    expect(a).not.toBe(b);
  });
});
