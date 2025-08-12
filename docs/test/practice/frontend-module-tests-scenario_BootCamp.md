### 프론트엔드 모듈 테스트 교육용 시나리오 (TC-MODULE-001)

- 목적: HackathonService 모듈 레벨(서비스-네트워크 경계) 동작을 Cypress Intercept로 검증
- 범위: Create/List/Get/Update/Delete 성공/실패 및 에러 처리 흐름
- 페이지 구성 특성: `App.tsx`가 모든 섹션을 동시에 렌더. 동일 텍스트 버튼 중복 가능 → 업데이트는 UI 클릭 대신 네트워크 호출 기반으로 검증

#### 선행조건
- 프론트 서버 실행: `cd bootcamp-sample/frontend && npm run dev`
- Cypress 설정: baseUrl `http://localhost:5173` (프로젝트에 이미 설정)

#### 공통
- 인터셉트 패턴: `**/api/hackathon/v1`
- 스펙 경로: `bootcamp-sample/frontend/cypress/e2e/module-tests.cy.ts`
- 목업 헬퍼: `buildApplication(overrides)`로 응답 데이터 생성
- 타임아웃: Cypress 기본(10s) 유지

#### 케이스 목록 (TC-MODULE-001)
- M1 Create 성공
  - 등록 폼 필수값 입력 → POST 인터셉트(201/200) → 완료 화면 문구 확인
- M2 Create 실패(500)
  - 등록 폼 입력 → POST 500 → 에러 스낵바 확인
- M3 List 성공(teamName)
  - 확인 섹션에서 팀명 입력 → GET 200(Mock list>0) → 성공 스낵바/결과 렌더 확인
- M4 List 실패(404/400)
  - 확인 섹션에서 존재하지 않는 팀명 → GET 404/400 → 에러 스낵바 확인
- M5 Get by ID 성공
  - `/registration?edit=true&id=1` 방문 시 GET 200 → 폼 값 세팅/성공 스낵바 확인
- M6 Get by ID 실패(404)
  - GET 404 → 에러 스낵바 확인
- M7 Update 성공
  - 중요: UI 클릭 대신 브라우저 `fetch`로 PUT 호출 트리거 → 인터셉트 200 확인
- M8 Update 실패(500)
  - `fetch`로 PUT 호출 → 인터셉트 500 확인
- M9 Delete 성공
  - `fetch`로 DELETE 호출 → 인터셉트 200/204 확인
- M10 Delete 실패(500)
  - `fetch`로 DELETE 호출 → 인터셉트 500 확인

#### 목업 데이터(예)
```ts
const buildApplication = (overrides = {}) => ({
  id: 1,
  team: {
    id: 1,
    teamName: '테스트팀',
    teamSize: '1',
    teamDescription: '설명',
    members: [
      { id: 1, name: '홍길동', email: 'hong@test.com', department: '개발팀', role: '팀장', isLeader: true },
    ],
  },
  ideaTitle: 'AI 기반 해커톤 관리 시스템',
  ideaDescription: '설명',
  problemStatement: '문제',
  solutionApproach: '접근',
  techStack: 'React, TS, Spring',
  status: 'PENDING',
  firstCreateDatetime: '2024-01-01T00:00:00Z',
  lastUpdateDatetime: '2024-01-01T00:00:00Z',
  ...overrides,
});
```

#### 실행 절차
- 서버 실행: `cd bootcamp-sample/frontend && npm run dev`
- 모듈 테스트: 새 터미널에서 `cd bootcamp-sample/frontend && npm run test:module`

#### 완료 기준
- 10개 케이스 모두 Pass
- 네트워크 경계의 성공/실패 및 에러 처리가 인터셉트로 검증됨


