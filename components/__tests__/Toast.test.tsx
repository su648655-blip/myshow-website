import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { ToastProvider, useToast } from "@/components/Toast";

function TestButton() {
  const { show } = useToast();
  return (
    <div>
      <button onClick={() => show("成功消息")}>show success</button>
      <button onClick={() => show("错误消息", "error")}>show error</button>
      <button onClick={() => show("信息消息", "info")}>show info</button>
    </div>
  );
}

function renderWithToast(ui: React.ReactElement) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("Toast", () => {
  test("show 成功后显示文本", () => {
    renderWithToast(<TestButton />);
    fireEvent.click(screen.getByText("show success"));
    expect(screen.getByText("成功消息")).toBeInTheDocument();
  });

  test("多个 toast 同时出现", () => {
    renderWithToast(<TestButton />);
    fireEvent.click(screen.getByText("show success"));
    fireEvent.click(screen.getByText("show error"));
    expect(screen.getByText("成功消息")).toBeInTheDocument();
    expect(screen.getByText("错误消息")).toBeInTheDocument();
  });

  test("toast 自动消失", () => {
    renderWithToast(<TestButton />);
    fireEvent.click(screen.getByText("show success"));
    expect(screen.getByText("成功消息")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2600);
    });
    expect(screen.queryByText("成功消息")).toBeNull();
  });

  test("三种类型都能正常显示", () => {
    renderWithToast(<TestButton />);
    fireEvent.click(screen.getByText("show success"));
    fireEvent.click(screen.getByText("show error"));
    fireEvent.click(screen.getByText("show info"));
    expect(screen.getByText("成功消息")).toBeInTheDocument();
    expect(screen.getByText("错误消息")).toBeInTheDocument();
    expect(screen.getByText("信息消息")).toBeInTheDocument();
  });
});
