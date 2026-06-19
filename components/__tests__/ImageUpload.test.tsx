import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageUpload from "@/components/ImageUpload";

// 模拟一个合法图片文件
function createFile(name: string, type: string, size: number): File {
  const blob = new Blob(["x".repeat(size)], { type });
  return new File([blob], name, { type });
}

// mock URL.createObjectURL
URL.createObjectURL = jest.fn(() => "blob:mock");

describe("ImageUpload", () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test("无图片时显示上传按钮", () => {
    render(<ImageUpload value="" onChange={onChange} />);
    expect(screen.getByText("点击上传")).toBeInTheDocument();
  });

  test("有图片时显示预览和删除按钮", () => {
    const { container } = render(<ImageUpload value="data:image/png;base64,mock" onChange={onChange} />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    // 删除按钮（X 图标）应该存在
    const deleteBtn = container.querySelector("button");
    expect(deleteBtn).toBeInTheDocument();
  });

  test("点击删除按钮调用 onChange('')", () => {
    const { container } = render(<ImageUpload value="data:image/png;base64,mock" onChange={onChange} />);
    const deleteBtn = container.querySelector("button");
    fireEvent.click(deleteBtn!);
    expect(onChange).toHaveBeenCalledWith("");
  });

  test("接受合法图片文件", () => {
    render(<ImageUpload value="" onChange={onChange} />);
    const file = createFile("test.jpg", "image/jpeg", 100_000);
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [file] } });
    // 文件通过验证后不会显示错误
    expect(screen.queryByText("请选择图片文件")).toBeNull();
    expect(screen.queryByText(/文件需小于/)).toBeNull();
  });

  test("拒绝非图片文件", () => {
    render(<ImageUpload value="" onChange={onChange} />);
    const file = createFile("test.pdf", "application/pdf", 100_000);
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText("请选择图片文件")).toBeInTheDocument();
  });

  test("拒绝超过大小限制的文件", () => {
    render(<ImageUpload value="" onChange={onChange} maxSizeMB={0.1} />);
    const file = createFile("test.jpg", "image/jpeg", 500_000);
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText(/文件需小于/)).toBeInTheDocument();
  });

  test("显示 label 和 hint", () => {
    render(<ImageUpload value="" onChange={onChange} label="头像" hint="建议 < 1MB" />);
    expect(screen.getByText("头像")).toBeInTheDocument();
    // hint 文本可能出现多次，用 getAllByText 并断言至少有一个
    expect(screen.getAllByText("建议 < 1MB").length).toBeGreaterThanOrEqual(1);
  });
});
