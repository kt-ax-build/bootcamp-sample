import '@testing-library/jest-dom';

// jest-dom 타입 확장
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveValue(value: string | number | string[]): R;
      toHaveTextContent(text: string | RegExp): R;
    }
  }
}

// Material-UI 테스트를 위한 설정
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// ResizeObserver 모킹 (Material-UI에서 사용)
(globalThis as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}; 