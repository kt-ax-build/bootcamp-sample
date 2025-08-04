import { axiosInstance } from '../axios';

// localStorage 모킹
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Axios Configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('TC-UNIT-018: Axios 설정 테스트', () => {
    it('타임아웃 설정 검증', () => {
      // Given & When
      const timeout = (axiosInstance as any).defaults.timeout;

      // Then
      expect(timeout).toBe(10000);
    });

    it('기본 헤더 설정 검증', () => {
      // Given & When
      const headers = (axiosInstance as any).defaults.headers;

      // Then
      expect(headers['Content-Type']).toBe('application/json');
    });

    it('baseURL 설정 검증', () => {
      // Given & When
      const baseURL = (axiosInstance as any).defaults.baseURL;

      // Then
      expect(baseURL).toBe('');
    });

    it('요청 인터셉터 존재 확인', () => {
      // Given & When
      const requestInterceptors = (axiosInstance.interceptors.request as any).handlers;

      // Then
      expect(requestInterceptors).toBeDefined();
      expect(requestInterceptors.length).toBeGreaterThan(0);
    });

    it('응답 인터셉터 존재 확인', () => {
      // Given & When
      const responseInterceptors = (axiosInstance.interceptors.response as any).handlers;

      // Then
      expect(responseInterceptors).toBeDefined();
      expect(responseInterceptors.length).toBeGreaterThan(0);
    });
  });
}); 