### AI Agentic Boot Camp 프론트엔드 테스트 파일 생성 MDC

 - 목적: 현재 소스와 테스트 시나리오만으로 프론트엔드 유니트(Jest/RTL) + 스모크/모듈(Cypress) 테스트 산출물을 자동 생성
- 입력(제공됨)
  - 소스: `bootcamp-sample/frontend/src/**`
  - 시나리오: `bootcamp-sample/frontend/frontend-test-scenarios.md`
- 전제(동일 유지)
  - Vite/React 19 구성 유지, 테스트 러너/Jest 설정 유지, Cypress 설정 유지
  - 패키지 스크립트 유지(`npm run test`, `npm run cypress:run`, `npm run test:all`)

## 생성 산출물

- 유니트 테스트(Jest + React Testing Library)
  - 경로(동일/미존재 시 생성, 존재 시 갱신 허용)
    - `bootcamp-sample/frontend/src/api/__tests__/axios.test.ts`
    - `bootcamp-sample/frontend/src/components/__tests__/RegistrationSection.test.tsx`
    - `bootcamp-sample/frontend/src/services/__tests__/HackathonService.test.ts`
    - `bootcamp-sample/frontend/src/stores/__tests__/HackathonStore.test.ts`
  - 기준: 현재 소스 기능/시나리오에 맞춘 단위 검증과 Mock 분리 원칙 준수

- 스모크 테스트(Cypress)
  - 스펙 파일:
    - `bootcamp-sample/frontend/cypress/e2e/smoke-registration.cy.ts`
    - `bootcamp-sample/frontend/cypress/e2e/smoke-search.cy.ts`
    - `bootcamp-sample/frontend/cypress/e2e/smoke-navigation.cy.ts`
  - 기준: 사용자 플로우 중심 핵심 경로(등록/검색/네비게이션) 최소 검증, 실제 API 호출(모킹 제거) 기반

- 모듈 테스트(Cypress Intercept)
  - 스펙 파일: `bootcamp-sample/frontend/cypress/e2e/module-tests.cy.ts`
  - 기준: 서비스/스토어/컴포넌트 연동 동작을 intercept로 안정적으로 검증

## 구현 스냅샷(소스 정합)

- API: `src/api/axios.ts` → 백엔드 API 호출 래퍼/설정 확인, 에러 처리 시나리오 포함
- 서비스: `src/services/HackathonService.ts` → 애플리케이션 CRUD, 쿼리 파라미터 처리
- 스토어: `src/stores/HackathonStore.ts` → 상태/액션(`create/list/get/update/delete`) 및 로딩/에러 상태
- 컴포넌트: `src/components/RegistrationSection.tsx` 등 폼 입력/유효성 처리, 제출 후 결과 UI 반영

## 유니트 테스트 요구사항

- 구성
  - 러너/환경: Jest(jsdom) + RTL, `setupFilesAfterEnv` 사용, 테스트는 독립 실행 가능
  - Mock: HTTP 요청(axios) 및 외부 모듈 적절히 Mock, 상태 변화/콜백 검증
  - 검증: 렌더/상호작용/State 업데이트/함수 호출/예외/경계값

- 샘플 스니펫(필수 포함)
  - Axios 관련 테스트 상단에 아래 모킹을 반드시 포함해 `import.meta.env` 파싱 이슈를 회피합니다.

```ts
// axios 모듈을 모킹하여 import.meta.env 문제를 우회
jest.mock('../axios', () => ({
  axiosInstance: {
    defaults: {
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
      baseURL: 'http://localhost:8080',
    },
    interceptors: {
      request: { handlers: [{}] },
      response: { handlers: [{}] },
    },
  },
}));

import { axiosInstance } from '../axios';
```

- 케이스(예시 가이드)
  - API/axios
    - 성공/실패 응답 처리, 공통 헤더/베이스 URL 적용, 예외 전파
  - 서비스/HackathonService
    - create/list/get/update/delete 각 메서드 정상/에러 경로, 쿼리 파라미터 트림/공백 처리
  - 스토어/HackathonStore
    - 각 액션 호출 시 로딩/성공/실패 상태 플래그, 상태 업데이트, delete 성공/실패
  - 컴포넌트/RegistrationSection
    - 필수 입력 유효성, 제출 성공 시 UI 반영, 에러 표시, 비동기 로딩 표시

## 스모크/모듈(Cypress) 테스트 요구사항

- 공통
  - 베이스 URL: `http://localhost:5173` (Cypress 설정 사용)
  - 전처리: 필요 시 테스트용 팀명/데이터 생성(타임스탬프 접미사), 테스트 간 독립성 유지

- 케이스(예시 가이드)
  - 앱 로딩/네비게이션 렌더 확인
  - 등록 폼 입력 → 제출 성공 → 리스트에 반영
  - 팀명/멤버명 필터링 조회 동작
  - 항목 수정(폼 업데이트) 후 반영 확인
  - 삭제 후 리스트 반영 및 에러 케이스 허용 처리

## 실행 가이드

- 유니트 테스트: `cd bootcamp-sample/frontend && npm run test`
- 커버리지: `npm run test:coverage`
- 스모크/모듈 테스트: 서버 기동 후 `npm run cypress:run`(또는 `npm run test:e2e`)
  - 스모크만: `npm run test:smoke`
  - 모듈만: `npm run test:module`
- 전체: `npm run test:all`

## 제약/품질

- 앱 소스 변경 금지(테스트에서만 Mock/유틸 활용), 테스트는 재현 가능해야 함
- 셀렉터: 접근성/`data-testid` 일관 사용, 비동기 대기는 `findBy*`/`wait` 최소화
- 네트워크 정책: 유니트는 Mock 격리, 스모크는 실제 호출(모킹 제거), 모듈은 Cypress intercept 기반

## 완료 조건

- 유니트/모듈 테스트 파일이 생성(또는 갱신)되고 모두 통과
- 시나리오 문서와 테스트 케이스의 정합성 확보(주요 플로우 누락 없음)
- 실행 스크립트로 로컬에서 즉시 재현 가능


