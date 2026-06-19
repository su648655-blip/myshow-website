"use client";

import { useRef, useState, useEffect } from "react";
import { Upload, X, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (dataUrl: string) => void;
  shape?: "square" | "rect" | "circle";
  label?: string;
  hint?: string;
  maxSizeMB?: number;
}

export default function ImageUpload({
  value,
  onChange,
  shape = "rect",
  label = "图片",
  hint = "建议 < 1MB · JPG/PNG/WebP",
  maxSizeMB = 2,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const readerRef = useRef<FileReader | null>(null);
  const mountedRef = useRef(true);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      readerRef.current?.abort();
    };
  }, []);

  const handleFile = (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("请选择图片文件");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`文件需小于 ${maxSizeMB}MB`);
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    readerRef.current = reader;
    reader.onload = () => {
      if (!mountedRef.current) return;
      onChange(reader.result as string);
      setLoading(false);
    };
    reader.onerror = () => {
      if (!mountedRef.current) return;
      setError("读取文件失败");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const aspectClass =
    shape === "square" ? "aspect-square" : shape === "circle" ? "aspect-square rounded-full" : "aspect-video";
  const radiusClass = shape === "circle" ? "rounded-full" : "rounded-xl";

  return (
    <div>
      {label && <label className="label">{label}<span className="label-hint">{hint}</span></label>}
      <div className={`relative ${aspectClass} ${radiusClass} overflow-hidden border-2 border-dashed transition-all ${
        value ? "border-[var(--border)]" : "border-[var(--border-strong)] hover:border-[var(--primary)] bg-[var(--bg-2)]"
      }`}>
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => onChange("")}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[var(--bg)] bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center text-[var(--fg)] hover:text-[var(--danger)] transition-all"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center gap-2 text-[var(--fg-3)] hover:text-[var(--primary-bright)] transition-colors"
          >
            {loading ? (
              <div className="text-mono text-xs">读取中...</div>
            ) : (
              <>
                <Upload className="w-6 h-6" />
                <span className="text-sm font-medium">点击上传</span>
                <span className="text-xs text-[var(--fg-4)]">{hint}</span>
              </>
            )}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="text-xs text-[var(--danger)] mt-2">{error}</p>}
    </div>
  );
}
