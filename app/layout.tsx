import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DataProvider } from "@/components/DataProvider";
import { ToastProvider } from "@/components/Toast";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "邓学德 · AI 销售总监 / Enterprise AI Strategist",
  description: "深耕企业 AI 应用 8 年，主导过 5 亿元级 AI 项目落地。专注于帮助 500 强客户从 0 到 1 构建 AI 战略。",
  keywords: ["AI 销售", "Enterprise AI", "企业 AI", "AI 战略", "大客户销售"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <DataProvider>
            <ToastProvider>
              <LayoutShell>{children}</LayoutShell>
            </ToastProvider>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
