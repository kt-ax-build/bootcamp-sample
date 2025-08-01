// @ts-ignore
import '@testing-library/jest-dom';

// Material-UI 테스트를 위한 설정
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (global as any).jest.fn().mockImplementation((query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: (global as any).jest.fn(), // deprecated
    removeListener: (global as any).jest.fn(), // deprecated
    addEventListener: (global as any).jest.fn(),
    removeEventListener: (global as any).jest.fn(),
    dispatchEvent: (global as any).jest.fn(),
  })),
});

// ResizeObserver 모킹 (Material-UI에서 사용)
(global as any).ResizeObserver = (global as any).jest.fn().mockImplementation(() => ({
  observe: (global as any).jest.fn(),
  unobserve: (global as any).jest.fn(),
  disconnect: (global as any).jest.fn(),
})); 